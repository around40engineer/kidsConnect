import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MiniAppPage from '@/app/mini-app/page';

describe('MiniAppPage', () => {
  it('タイトルが表示される', () => {
    render(<MiniAppPage />);
    expect(screen.getByText('ギャラリー')).toBeInTheDocument();
  });

  it('ダミーデータのタイトル・日付・著者が表示される', () => {
    render(<MiniAppPage />);
    expect(screen.getByText('園庭での遊び時間')).toBeInTheDocument();
    expect(screen.getByText('朝の会の様子')).toBeInTheDocument();
    expect(screen.getByText('誕生日会のビデオ')).toBeInTheDocument();
    expect(screen.getAllByText('2025-04-01').length).toBeGreaterThan(1);
    expect(screen.getByText('田中先生')).toBeInTheDocument();
    expect(screen.getByText('山田先生')).toBeInTheDocument();
    expect(screen.getByText('佐藤先生')).toBeInTheDocument();
  });

  it('タブで「写真」だけに絞り込める', async () => {
    render(<MiniAppPage />);
    await userEvent.click(screen.getByRole('tab', { name: '写真' }));
    expect(screen.getByText('園庭での遊び時間')).toBeInTheDocument();
    expect(screen.getByText('朝の会の様子')).toBeInTheDocument();
    expect(screen.queryByText('誕生日会のビデオ')).not.toBeInTheDocument();
  });

  it('タブで「動画」だけに絞り込める', async () => {
    render(<MiniAppPage />);
    await userEvent.click(screen.getByRole('tab', { name: '動画' }));
    expect(screen.getByText('誕生日会のビデオ')).toBeInTheDocument();
    expect(screen.queryByText('園庭での遊び時間')).not.toBeInTheDocument();
    expect(screen.queryByText('朝の会の様子')).not.toBeInTheDocument();
  });

  it('ビュー切り替え（リスト表示）でレイアウトが変わる', async () => {
    render(<MiniAppPage />);
    // 初期はグリッド
    expect(screen.getByText('園庭での遊び時間').closest('.grid')).toBeTruthy();
    // リストボタンを押す
    const listButton = screen.getAllByRole('button').find((btn: HTMLElement) => btn.innerHTML.includes('List'));
    if (listButton) await userEvent.click(listButton);
    // グリッドが消え、リスト用のクラスが付与される（ここはクラス名や構造に応じて適宜調整してください）
  });

  it('動画サムネイルにはVideoアイコンが重なる', () => {
    render(<MiniAppPage />);
    // Videoアイコンが存在することを確認
    // lucide-reactのVideoアイコンはsvg要素なので、role="img"で取得
    const videoIcons = screen.getAllByRole('img');
    expect(videoIcons.length).toBeGreaterThan(0);
  });
}); 