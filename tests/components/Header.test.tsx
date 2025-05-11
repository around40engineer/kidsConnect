import { render, screen, fireEvent, act } from '@testing-library/react';
import { Header } from '../../components/Header';
import { ThemeProvider } from 'next-themes';
import { describe, it, expect, vi } from 'vitest';

// スクロールイベントのモック
const mockScrollEvent = (scrollY: number) => {
  Object.defineProperty(window, 'scrollY', {
    value: scrollY,
    writable: true,
  });
  window.dispatchEvent(new Event('scroll'));
};

// コンポーネントのラッパー
const renderHeader = () => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header />
    </ThemeProvider>
  );
};

describe('Header', () => {
  it('renders without crashing', () => {
    renderHeader();
  });

  it('デフォルトのヘッダーが正しく表示される', () => {
    renderHeader();
    expect(screen.getByText('KidConnect')).toBeInTheDocument();
    expect(screen.getByText('ログイン')).toBeInTheDocument();
    expect(screen.getByText('無料で始める')).toBeInTheDocument();
  });

  it('スクロール時に背景が変更される', async () => {
    renderHeader();
    const header = screen.getByRole('banner');

    // スクロール前のヘッダーを確認
    expect(header).toHaveClass('bg-transparent');

    // スクロールイベントをシミュレート
    await act(async () => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    // スクロール後のヘッダーを確認
    expect(header).toHaveClass('bg-background/95');
    expect(header).toHaveClass('shadow-sm');
    expect(header).toHaveClass('backdrop-blur-sm');
  });

  it('モバイルメニューが正しく開閉される', () => {
    renderHeader();
    const menuButton = screen.getByLabelText('Menu');
    
    // メニューが閉じている状態を確認
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    
    // メニューを開く
    fireEvent.click(menuButton);
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
    
    // メニューを閉じる
    fireEvent.click(menuButton);
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('モバイルメニューのリンクをクリックするとメニューが閉じる', () => {
    renderHeader();
    const menuButton = screen.getByLabelText('Menu');
    
    // メニューを開く
    fireEvent.click(menuButton);
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
    
    // モバイルメニュー内のリンクをクリック
    const mobileFeaturesLink = screen.getByText('機能', { selector: '[data-testid="mobile-menu"] a' });
    fireEvent.click(mobileFeaturesLink);
    
    // メニューが閉じていることを確認
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('ダークモード/ライトモードの切り替えが正しく機能する', async () => {
    renderHeader();
    const header = screen.getByRole('banner');
    
    // ダークモードに切り替え
    await act(async () => {
      document.documentElement.classList.add('dark');
    });
    
    // スクロールイベントをシミュレート
    await act(async () => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(header).toHaveClass('bg-background/95');
    
    // ライトモードに切り替え
    await act(async () => {
      document.documentElement.classList.remove('dark');
    });
    
    expect(header).toHaveClass('bg-background/95');
  });
}); 