import { beforeAll, beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '@/app/register/page';

// useRouterのモック
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// useToastのモック
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

// ResizeObserverのモック
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('RegisterPage', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('タイトルと説明文が表示される', () => {
    render(<RegisterPage />);
    expect(screen.getByText('施設登録')).toBeInTheDocument();
    expect(screen.getByText('KidConnectをご利用いただく施設の情報を入力してください')).toBeInTheDocument();
  });

  it('全ての必須入力欄が表示される', () => {
    render(<RegisterPage />);
    expect(screen.getByLabelText('施設名 *')).toBeInTheDocument();
    expect(screen.getByLabelText('保育園')).toBeInTheDocument();
    expect(screen.getByLabelText('幼稚園')).toBeInTheDocument();
    expect(screen.getByLabelText('学童保育')).toBeInTheDocument();
    expect(screen.getByLabelText('その他')).toBeInTheDocument();
    expect(screen.getByLabelText('定員 *')).toBeInTheDocument();
    expect(screen.getByLabelText('代表者名 *')).toBeInTheDocument();
    expect(screen.getByLabelText('メールアドレス *')).toBeInTheDocument();
    expect(screen.getByLabelText('電話番号 *')).toBeInTheDocument();
    expect(screen.getByLabelText('郵便番号 *')).toBeInTheDocument();
    expect(screen.getByLabelText('住所 *')).toBeInTheDocument();
  });

  it('バリデーションエラーが表示される', async () => {
    render(<RegisterPage />);
    const submit = screen.getByRole('button', { name: '登録する' });
    await userEvent.click(submit);
    await waitFor(() => {
      expect(screen.getByText('施設名を入力してください')).toBeInTheDocument();
      expect(screen.getByText('定員を入力してください')).toBeInTheDocument();
      expect(screen.getByText('代表者名を入力してください')).toBeInTheDocument();
      expect(screen.getByText('有効なメールアドレスを入力してください')).toBeInTheDocument();
      expect(screen.getByText('電話番号を入力してください')).toBeInTheDocument();
      expect(screen.getByText('郵便番号を入力してください')).toBeInTheDocument();
      expect(screen.getByText('住所を入力してください')).toBeInTheDocument();
    });
  });

  it('正しい値を入力して送信するとダッシュボードに遷移する', async () => {
    render(<RegisterPage />);
    await userEvent.type(screen.getByLabelText('施設名 *'), 'テスト保育園');
    await userEvent.click(screen.getByLabelText('保育園'));
    await userEvent.type(screen.getByLabelText('定員 *'), '50');
    await userEvent.type(screen.getByLabelText('代表者名 *'), '山田太郎');
    await userEvent.type(screen.getByLabelText('メールアドレス *'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('電話番号 *'), '03-1234-5678');
    await userEvent.type(screen.getByLabelText('郵便番号 *'), '123-4567');
    await userEvent.type(screen.getByLabelText('住所 *'), '東京都千代田区1-1-1');
    const submit = screen.getByRole('button', { name: '登録する' });
    await userEvent.click(submit);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    }, { timeout: 20000 });
  });
}); 