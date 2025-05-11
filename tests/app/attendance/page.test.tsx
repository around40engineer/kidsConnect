import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AttendancePage from '@/app/attendance/page';

// QrCodeScannerコンポーネントのモック
vi.mock('@/components/QrCodeScanner', () => ({
    default: () => <div data-testid="qr-code-scanner">QR Code Scanner</div>
}));

describe('AttendancePage', () => {
    it('タイトルが正しく表示される', () => {
        render(<AttendancePage />);
        expect(screen.getByText('入退場管理')).toBeInTheDocument();
    });

    it('QRコードスキャナーが表示される', () => {
        render(<AttendancePage />);
        expect(screen.getByTestId('qr-code-scanner')).toBeInTheDocument();
    });

    it('入場ボタンが表示される', () => {
        render(<AttendancePage />);
        const enterButton = screen.getByText('入場');
        expect(enterButton).toBeInTheDocument();
        expect(enterButton.closest('button')).toHaveClass('bg-blue-500');
    });

    it('退場ボタンが表示される', () => {
        render(<AttendancePage />);
        const exitButton = screen.getByText('退場');
        expect(exitButton).toBeInTheDocument();
        expect(exitButton.closest('button')).toHaveClass('bg-blue-500');
    });

    it('入場ボタンをクリックするとアラートが表示される', async () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
        render(<AttendancePage />);
        
        const enterButton = screen.getByText('入場');
        await userEvent.click(enterButton);
        
        expect(alertMock).toHaveBeenCalledWith('QRコードスキャン機能は準備中です');
        alertMock.mockRestore();
    });

    it('退場ボタンをクリックするとアラートが表示される', async () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
        render(<AttendancePage />);
        
        const exitButton = screen.getByText('退場');
        await userEvent.click(exitButton);
        
        expect(alertMock).toHaveBeenCalledWith('QRコードスキャン機能は準備中です');
        alertMock.mockRestore();
    });
}); 