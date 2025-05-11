import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import React from 'react';
import QrCodeScanner from '@/components/QrCodeScanner';
import jsQR from 'jsqr';

// jsQRのモック
vi.mock('jsqr', () => ({
  default: vi.fn(),
}));

// MediaDevicesのモック
const mockStream = {
  getTracks: () => [{
    stop: vi.fn(),
  }],
  active: true,
  id: 'mock-stream-id',
  onaddtrack: null,
  onremovetrack: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  addTrack: vi.fn(),
  removeTrack: vi.fn(),
  getVideoTracks: vi.fn(),
  getAudioTracks: vi.fn(),
  clone: vi.fn(),
} as unknown as MediaStream;

const mockGetUserMedia = vi.fn().mockResolvedValue(mockStream);
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: mockGetUserMedia,
  },
  writable: true,
});

// console.errorのモック
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

// HTMLCanvasElementのモック
const mockContext = {
  drawImage: vi.fn(),
  getImageData: vi.fn().mockReturnValue({
    data: new Uint8ClampedArray(4),
    width: 2,
    height: 2,
  }),
};

// HTMLCanvasElementのモック
const mockCanvas = {
  getContext: vi.fn().mockImplementation((contextType: string) => {
    console.log('contextType', contextType);
    if (contextType === '2d') {
      return mockContext;
    }
    return null;
  }),
  width: 640,
  height: 480,
  style: {},
  toDataURL: vi.fn(),
  toBlob: vi.fn(),
  getBoundingClientRect: vi.fn().mockReturnValue({
    width: 640,
    height: 480,
    top: 0,
    left: 0,
    right: 640,
    bottom: 480,
  }),
};

// HTMLVideoElementのモック
const mockVideo = {
  play: vi.fn(),
  srcObject: null as MediaStream | null,
  videoWidth: 640,
  videoHeight: 480,
  style: {},
  getBoundingClientRect: vi.fn().mockReturnValue({
    width: 640,
    height: 480,
    top: 0,
    left: 0,
    right: 640,
    bottom: 480,
  }),
};

// HTMLCanvasElementとHTMLVideoElementのモック
vi.stubGlobal('HTMLCanvasElement', {
  prototype: {
    getContext: mockCanvas.getContext,
    width: mockCanvas.width,
    height: mockCanvas.height,
    style: mockCanvas.style,
    toDataURL: mockCanvas.toDataURL,
    toBlob: mockCanvas.toBlob,
    getBoundingClientRect: mockCanvas.getBoundingClientRect,
  },
});

vi.stubGlobal('HTMLVideoElement', {
  prototype: {
    play: mockVideo.play,
    videoWidth: mockVideo.videoWidth,
    videoHeight: mockVideo.videoHeight,
    style: mockVideo.style,
    getBoundingClientRect: mockVideo.getBoundingClientRect,
  },
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('QrCodeScanner', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<QrCodeScanner />);
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });
  
  it('カメラアクセスが要求される', async () => {
    render(<QrCodeScanner />);
    expect(mockGetUserMedia).toHaveBeenCalledWith({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 },
        aspectRatio: { ideal: 16/9 }
      },
    });
  });

  it('カメラアクセスエラー時にエラーメッセージが表示される', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('Camera access denied'));
    await act(async () => {
      render(<QrCodeScanner />);
      await vi.runAllTimersAsync();
    });
    expect(mockConsoleError).toHaveBeenCalledWith('Error accessing media devices:', expect.any(Error));
  });

  it('QRコードがスキャンされたときに結果が表示される', async () => {
    const mockQrData = {
      data: 'http://localhost:3000/result',
      binaryData: [] as number[],
      chunks: [],
      version: 1,
      location: {
        topRightCorner: { x: 0, y: 0 },
        topLeftCorner: { x: 0, y: 0 },
        bottomRightCorner: { x: 0, y: 0 },
        bottomLeftCorner: { x: 0, y: 0 },
        topRightFinderPattern: { x: 0, y: 0 },
        topLeftFinderPattern: { x: 0, y: 0 },
        bottomLeftFinderPattern: { x: 0, y: 0 },
      },
    };
    vi.mocked(jsQR).mockReturnValue(mockQrData);
    await act(async () => {
      render(<QrCodeScanner />);
      await vi.runAllTimersAsync();
    });
    await waitFor(() => {
      const resultElement = screen.getByText(/入場を受け付けました/);
      expect(resultElement).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('無効なQRコードがスキャンされたときにスキャンを継続する', async () => {
    const mockInvalidQrData = {
      data: 'invalid-url',
      binaryData: [] as number[],
      chunks: [],
      version: 1,
      location: {
        topRightCorner: { x: 0, y: 0 },
        topLeftCorner: { x: 0, y: 0 },
        bottomRightCorner: { x: 0, y: 0 },
        bottomLeftCorner: { x: 0, y: 0 },
        topRightFinderPattern: { x: 0, y: 0 },
        topLeftFinderPattern: { x: 0, y: 0 },
        bottomLeftFinderPattern: { x: 0, y: 0 },
      },
    };
    vi.mocked(jsQR).mockReturnValueOnce(mockInvalidQrData);
    await act(async () => {
      render(<QrCodeScanner />);
      await vi.runAllTimersAsync();
    });
    expect(screen.queryByText(/入場を受け付けました/)).not.toBeInTheDocument();
  });

  it('コンポーネントのアンマウント時にカメラストリームが停止される', async () => {
    const { unmount } = render(<QrCodeScanner />);
    mockVideo.srcObject = mockStream;
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    await act(async () => {
      unmount();
      await vi.runAllTimersAsync();
    });
    await waitFor(() => {
      expect(mockStream.getTracks()[0].stop).toHaveBeenCalled();
    }, { timeout: 2000 });
  });
}); 