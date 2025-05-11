import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterChildrenPage from '@/app/register-children/page';

describe('RegisterChildrenPage', () => {
  it('タイトルが表示される', () => {
    render(<RegisterChildrenPage />);
    expect(screen.getByText('児童登録')).toBeInTheDocument();
  });

  it('学年とクラス名の入力欄が表示される', () => {
    render(<RegisterChildrenPage />);
    expect(screen.getByLabelText('学年')).toBeInTheDocument();
    expect(screen.getByLabelText('クラス名')).toBeInTheDocument();
  });

  it('児童名一括入力欄が表示される', () => {
    render(<RegisterChildrenPage />);
    expect(screen.getByLabelText(/児童名一括入力/)).toBeInTheDocument();
  });

  it('一括登録ボタンが表示される', () => {
    render(<RegisterChildrenPage />);
    expect(screen.getByRole('button', { name: '一括登録' })).toBeInTheDocument();
  });

  it('児童を一括登録できる', async () => {
    render(<RegisterChildrenPage />);
    
    // 学年とクラス名を入力
    await userEvent.type(screen.getByLabelText('学年'), '年少');
    await userEvent.type(screen.getByLabelText('クラス名'), 'ひまわり組');
    
    // 児童名を入力
    const bulkInput = screen.getByLabelText(/児童名一括入力/);
    await userEvent.type(bulkInput, '山田太郎\n佐藤花子\n鈴木一郎');
    
    // 一括登録ボタンをクリック
    await userEvent.click(screen.getByRole('button', { name: '一括登録' }));
    
    // 児童一覧に追加されたことを確認
    expect(screen.getByText('山田太郎')).toBeInTheDocument();
    expect(screen.getByText('佐藤花子')).toBeInTheDocument();
    expect(screen.getByText('鈴木一郎')).toBeInTheDocument();
    
    // 学年とクラス名が正しく表示されていることを確認
    const rows = screen.getAllByRole('row');
    rows.slice(1).forEach(row => {
      expect(row).toHaveTextContent('年少');
      expect(row).toHaveTextContent('ひまわり組');
    });
  });

  it('児童を削除できる', async () => {
    render(<RegisterChildrenPage />);
    
    // 児童を登録
    await userEvent.type(screen.getByLabelText('学年'), '年少');
    await userEvent.type(screen.getByLabelText('クラス名'), 'ひまわり組');
    await userEvent.type(screen.getByLabelText(/児童名一括入力/), '山田太郎\n佐藤花子');
    await userEvent.click(screen.getByRole('button', { name: '一括登録' }));
    
    // 削除ボタンをクリック
    const deleteButtons = screen.getAllByRole('button', { name: '' });
    await userEvent.click(deleteButtons[0]);
    
    // 児童が削除されたことを確認
    expect(screen.queryByText('山田太郎')).not.toBeInTheDocument();
    expect(screen.getByText('佐藤花子')).toBeInTheDocument();
  });

  it('保存ボタンが表示される', async () => {
    render(<RegisterChildrenPage />);
    
    // 児童を登録
    await userEvent.type(screen.getByLabelText('学年'), '年少');
    await userEvent.type(screen.getByLabelText('クラス名'), 'ひまわり組');
    await userEvent.type(screen.getByLabelText(/児童名一括入力/), '山田太郎');
    await userEvent.click(screen.getByRole('button', { name: '一括登録' }));
    
    // 保存ボタンが表示されることを確認
    expect(screen.getByRole('button', { name: '保存する' })).toBeInTheDocument();
  });

  it('児童が登録されていない場合は一覧が空のメッセージを表示する', () => {
    render(<RegisterChildrenPage />);
    expect(screen.getByText('児童が登録されていません')).toBeInTheDocument();
  });
}); 