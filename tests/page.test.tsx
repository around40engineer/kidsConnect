import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('HomePage', () => {
  it('タイトルが表示される', () => {
    render(<HomePage />);
    const titles = screen.getAllByText('KidConnect');
    expect(titles.length).toBeGreaterThan(0);
  });

  it('Headerコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('Heroコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('Featuresコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: '施設運営をもっとシンプルに、もっと安全に' })).toBeInTheDocument();
  });

  it('Benefitsコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'なぜ KidConnect なのか' })).toBeInTheDocument();
  });

  it('HowItWorksコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: '導入から活用までの流れ' })).toBeInTheDocument();
  });

  it('Testimonialsコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: '導入施設からの声' })).toBeInTheDocument();
  });

  it('Pricingコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'シンプルな料金プラン' })).toBeInTheDocument();
  });

  it('FAQコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: 'よくあるご質問' })).toBeInTheDocument();
  });

  it('CTAコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: '無料で始める' })).toBeInTheDocument();
  });

  it('Footerコンポーネントがレンダリングされる', () => {
    render(<HomePage />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
}); 