import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Home', () => {
  it('Headerコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('Heroコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('Featuresコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: '施設運営をもっとシンプルに、もっと安全に' })).toBeInTheDocument();
  });

  it('Benefitsコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'なぜ KidConnect なのか' })).toBeInTheDocument();
  });

  it('HowItWorksコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: '導入から活用までの流れ' })).toBeInTheDocument();
  });

  it('Testimonialsコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: '導入施設からの声' })).toBeInTheDocument();
  });

  it('Pricingコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'シンプルな料金プラン' })).toBeInTheDocument();
  });

  it('FAQコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'よくあるご質問' })).toBeInTheDocument();
  });

  it('CTAコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: '無料で始める' })).toBeInTheDocument();
  });

  it('Footerコンポーネントがレンダリングされる', () => {
    render(<Home />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
}); 