import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import QrCodeScanner from '../../components/QrCodeScanner';

// jsQRのモックをグローバルに定義
vi.mock('jsqr', () => ({
  default: vi.fn().mockReturnValue({ data: 'test-data' })
}));

describe('QrCodeScanner', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    const { container } = render(React.createElement(QrCodeScanner));
    expect(container.querySelector('[data-testid="video"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="canvas"]')).toBeInTheDocument();
  });

  it('カメラアクセスが要求される', async () => {
    // MediaStreamのモック
    const mockStream = {
      getTracks: () => [{
        stop: vi.fn(),
      }],
    };

    const getUserMediaMock = vi.fn().mockResolvedValue(mockStream);
    
    // navigator.mediaDevicesをモック
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: { getUserMedia: getUserMediaMock },
      configurable: true,
    });

    await act(async () => {
      render(React.createElement(QrCodeScanner));
    });

    expect(getUserMediaMock).toHaveBeenCalledWith({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 },
        aspectRatio: { ideal: 16 / 9 },
      },
    });
  });

  it('カメラアクセスエラー時にconsole.errorが呼ばれる', async () => {
    const getUserMediaMock = vi.fn().mockRejectedValue(new Error('Camera access denied'));
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: { getUserMedia: getUserMediaMock },
      configurable: true,
    });

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      render(React.createElement(QrCodeScanner));
    });

    expect(errorSpy).toHaveBeenCalledWith(
      'Error accessing media devices:',
      expect.any(Error)
    );
  });

  it.skip('QRコードが検出された時にメッセージが表示され、2秒後に消える', async () => {
    // MediaStreamのモック
    const mockStream = {
      getTracks: () => [{
        stop: vi.fn(),
      }],
    };

    const getUserMediaMock = vi.fn().mockResolvedValue(mockStream);
    
    // navigator.mediaDevicesをモック
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: { getUserMedia: getUserMediaMock },
      configurable: true,
    });

    // コンポーネントをレンダリング
    await act(async () => {
      render(React.createElement(QrCodeScanner));
    });

    // 最初はメッセージが表示されていないことを確認
    expect(screen.queryByText('入場を受け付けました')).not.toBeInTheDocument();

    // タイマーを進めてQRコード検出をシミュレート
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // QRコード検出時のメッセージが表示されることを確認
    expect(screen.getByText('入場を受け付けました')).toBeInTheDocument();

    // 2秒経過
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    // メッセージが消えることを確認
    expect(screen.queryByText('入場を受け付けました')).not.toBeInTheDocument();
  });
}); 