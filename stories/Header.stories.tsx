import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';
import { ThemeProvider } from 'next-themes';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'ヘッダーコンポーネント。ナビゲーションリンク、ログインボタン、登録ボタンを含み、スクロール時の背景変更やモバイルメニューの表示/非表示を制御します。',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-background">
          <Story />
          <div className="h-[200vh] p-4">
            <p className="text-center text-muted-foreground">スクロールして背景の変化を確認してください</p>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'デフォルトのヘッダー。デスクトップ表示では横並びのナビゲーション、モバイル表示ではハンバーガーメニューを表示します。',
      },
    },
  },
};

export const Scrolled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'スクロール時のヘッダー。背景が半透明になり、シャドウが追加されます。',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // スクロールをシミュレート
    window.scrollTo(0, 100);
  },
};

export const MobileMenuOpen: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'モバイルメニューが開いた状態。ハンバーガーメニューをクリックすると表示されます。',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const menuButton = canvasElement.querySelector('button[aria-label="Menu"]');
    if (menuButton) {
      (menuButton as HTMLButtonElement).click();
    }
  },
}; 