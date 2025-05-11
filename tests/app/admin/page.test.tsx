import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPage from '@/app/admin/page';

describe('AdminPage', () => {
    it('タイトルが正しく表示される', () => {
        render(<AdminPage />);
        expect(screen.getByText('管理者ダッシュボード')).toBeInTheDocument();
    });

    it('統計カードが表示される', () => {
        render(<AdminPage />);
        expect(screen.getByText('総施設数')).toBeInTheDocument();
        expect(screen.getByText('今月の新規登録')).toBeInTheDocument();
        expect(screen.getByText('未対応の問い合わせ')).toBeInTheDocument();
        expect(screen.getByText('承認待ち登録')).toBeInTheDocument();
    });

    it('タブが表示される', () => {
        render(<AdminPage />);
        expect(screen.getByText('問い合わせ管理')).toBeInTheDocument();
        expect(screen.getByText('登録申請管理')).toBeInTheDocument();
    });

    it('検索機能が動作する', async () => {
        render(<AdminPage />);
        const searchInput = screen.getByPlaceholderText('施設名・担当者名で検索');
        await userEvent.type(searchInput, 'ひまわり');
        expect(searchInput).toHaveValue('ひまわり');
    });

    it('ステータスフィルターのラベルが表示される', () => {
        render(<AdminPage />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('問い合わせ一覧が表示される', () => {
        render(<AdminPage />);
        expect(screen.getByText('ひまわり保育園')).toBeInTheDocument();
        expect(screen.getByText('さくら幼稚園')).toBeInTheDocument();
    });

    it('登録申請一覧が表示される', async () => {
        render(<AdminPage />);
        await userEvent.click(screen.getByText('登録申請管理'));
        expect(screen.getByText('ひまわり保育園')).toBeInTheDocument();
        expect(screen.getByText('さくら幼稚園')).toBeInTheDocument();
    });

    it('CSVエクスポートボタンが表示される', () => {
        render(<AdminPage />);
        expect(screen.getByText('CSVエクスポート')).toBeInTheDocument();
    });
}); 