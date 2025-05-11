import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardPage from '../../app/dashboard/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('DashboardPage', () => {
  it('タイトルが正しく表示される', () => {
    render(<DashboardPage />);
    expect(screen.getByText('施設管理ダッシュボード')).toBeInTheDocument();
  });

  it('各種ボタンが表示される', () => {
    render(<DashboardPage />);
    expect(screen.getByText('LINE連携設定')).toBeInTheDocument();
    expect(screen.getByText('勤務管理')).toBeInTheDocument();
    expect(screen.getByText('児童登録')).toBeInTheDocument();
    expect(screen.getByText('入退場管理')).toBeInTheDocument();
  });

  it('統計カードが表示される', () => {
    render(<DashboardPage />);
    expect(screen.getByText('現在の在園児')).toBeInTheDocument();
    expect(screen.getByText('本日の総入場数')).toBeInTheDocument();
    expect(screen.getByText('未到着')).toBeInTheDocument();
    expect(screen.getByText('遅刻')).toBeInTheDocument();
    expect(screen.getByText('15名')).toBeInTheDocument();
    expect(screen.getByText('20名')).toBeInTheDocument();
    expect(screen.getByText('5名')).toBeInTheDocument();
    expect(screen.getByText('2名')).toBeInTheDocument();
  });

  it('入退場記録テーブルが表示される', () => {
    render(<DashboardPage />);
    expect(screen.getByText('入退場記録')).toBeInTheDocument();
    expect(screen.getByText('時刻')).toBeInTheDocument();
    expect(screen.getByText('園児名')).toBeInTheDocument();
    expect(screen.getByText('保護者名')).toBeInTheDocument();
    expect(screen.getByText('種別')).toBeInTheDocument();
  });

  it('ダミーデータがテーブルに表示される', () => {
    render(<DashboardPage />);
    expect(screen.getByText('山田太郎')).toBeInTheDocument();
    expect(screen.getByText('山田花子')).toBeInTheDocument();
    const inEntries = screen.getAllByText('入場');
    expect(inEntries.length).toBeGreaterThan(0);
    expect(screen.getByText('退場')).toBeInTheDocument();
  });

  it('検索ボックスで園児名・保護者名で絞り込みできる', async () => {
    render(<DashboardPage />);
    const input = screen.getByPlaceholderText('名前で検索...');
    await userEvent.type(input, '佐藤');
    expect(screen.getByText('佐藤めぐみ')).toBeInTheDocument();
    expect(screen.getByText('佐藤優子')).toBeInTheDocument();
    // 他の園児名は表示されない
    expect(screen.queryByText('山田太郎')).not.toBeInTheDocument();
    expect(screen.queryByText('田中さくら')).not.toBeInTheDocument();
  });
}); 