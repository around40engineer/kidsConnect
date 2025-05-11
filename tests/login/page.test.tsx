import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../../app/login/page';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginPage', () => {
  it('タイトルが正しく表示される', () => {
    render(<LoginPage />);
    expect(screen.getByText('施設管理者ログイン')).toBeInTheDocument();
  });

  it('説明文が表示される', () => {
    render(<LoginPage />);
    expect(screen.getByText('施設管理用Webアプリにログインします')).toBeInTheDocument();
  });

  it('ログインボタンが表示される', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });

  it('ログインボタンをクリックするとダッシュボードに遷移する', async () => {
    render(<LoginPage />);
    const button = screen.getByRole('button', { name: 'ログイン' });
    await userEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
}); 