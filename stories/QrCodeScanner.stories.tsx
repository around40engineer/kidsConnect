import type { Meta, StoryObj } from '@storybook/react';
import QrCodeScanner from '@/components/QrCodeScanner';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

const meta: Meta<typeof QrCodeScanner> = {
  title: 'Components/QrCodeScanner',
  component: QrCodeScanner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'QRコードスキャナーコンポーネント。カメラを使用してQRコードをスキャンし、特定のURL（http://localhost:3000/result）が検出された場合に入場を受け付けます。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QrCodeScanner>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'デフォルトのQRコードスキャナー。カメラアクセスを要求し、QRコードのスキャンを開始します。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // ビデオ要素が存在することを確認
    await expect(canvas.getByTestId('video')).toBeInTheDocument();
    await expect(canvas.getByTestId('canvas')).toBeInTheDocument();
  },
};

export const WithResult: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'QRコードがスキャンされ、正しいURLが検出された状態。入場受け付けメッセージが表示されます。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 入場受け付けメッセージが表示されることを確認
    await expect(canvas.getByText('入場を受け付けました')).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'カメラアクセスに失敗した状態。エラーメッセージが表示されます。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // エラーメッセージが表示されることを確認
    await expect(canvas.getByText('カメラへのアクセスに失敗しました')).toBeInTheDocument();
  },
}; 