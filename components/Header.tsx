'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Menu, X, LogIn } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-mochiy text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">KidConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-foreground/80 hover:text-foreground font-medium transition">
            機能
          </Link>
          <Link href="#benefits" className="text-foreground/80 hover:text-foreground font-medium transition">
            メリット
          </Link>
          <Link href="#how-it-works" className="text-foreground/80 hover:text-foreground font-medium transition">
            使い方
          </Link>
          <Link href="#pricing" className="text-foreground/80 hover:text-foreground font-medium transition">
            料金
          </Link>
          <Link href="#faq" className="text-foreground/80 hover:text-foreground font-medium transition">
            FAQ
          </Link>
          <Link href="#contact" className="text-foreground/80 hover:text-foreground font-medium transition">
            お問い合わせ
          </Link>
          <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
            <Link href="/login">
              <LogIn className="h-4 w-4 mr-2" />
              ログイン
            </Link>
          </Button>
          <Button asChild variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="/register">無料で始める</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b" data-testid="mobile-menu">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="#features" 
              className="text-foreground py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              機能
            </Link>
            <Link 
              href="#benefits" 
              className="text-foreground py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              メリット
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-foreground py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              使い方
            </Link>
            <Link 
              href="#pricing" 
              className="text-foreground py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              料金
            </Link>
            <Link 
              href="#faq" 
              className="text-foreground py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="#contact" 
              className="text-foreground py-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </Link>
            <Button asChild variant="outline" className="border-blue-500 text-blue-500 w-full justify-center">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <LogIn className="h-4 w-4 mr-2" />
                ログイン
              </Link>
            </Button>
            <Button asChild variant="default" className="bg-blue-500 hover:bg-blue-600 text-white w-full">
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>無料で始める</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}