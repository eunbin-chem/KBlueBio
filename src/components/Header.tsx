import React, { useState } from 'react';
import { Menu, X, Code, Globe } from 'lucide-react';
import { PageType, NavItem } from '../types';

interface HeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  onOpenCodeModal: () => void;
  lang: 'ko' | 'en';
  setLang: (lang: 'ko' | 'en') => void;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '홈', enLabel: 'Home' },
  { id: 'company', label: '회사소개', enLabel: 'Company' },
  { id: 'rnd', label: '연구개발', enLabel: 'R&D' },
  { id: 'papers', label: '논문/특허', enLabel: 'IP & Publications' },
  { id: 'products', label: '제품정보', enLabel: 'Products' },
  { id: 'news', label: '기업소식', enLabel: 'News' },
];

export default function Header({
  currentPage,
  setCurrentPage,
  onOpenCodeModal,
  lang,
  setLang,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI6omVqzf8UDV8jTuxW34nn0klGHFCHgA5dUR4NGvccBK5X3qbZl68jXuLBysF3IUSvqWuGLYMDCrF7IZ5KPJ2iGJj_dB9oa6zBl4npDOjnAe0OJwYjlvLWKSn7PZiL3YtsEUy2b0QYlyfx875_GOBrvPybrSqoLGe3xwgiuH2esFrQPahaBgzZFSUSRq73393Ng0k5PDZ5dEHr1Co31AfORgBv-J425JcFl3DJULQoJPngFcKxVMay8pHj4BSRNJvhrWZ0frX_48';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => { setCurrentPage('home'); setIsOpen(false); }}
          >
            <img 
              className="h-10 w-auto" 
              src={logoUrl} 
              alt="KBlueBio"
              referrerPolicy="no-referrer"
            />
            <span className="sr-only">KBlueBio</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-sky-600 bg-sky-50/50 shadow-xs'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                {lang === 'ko' ? item.label : item.enLabel}
              </button>
            ))}
          </nav>

          {/* Header Action Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Lang Button */}
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'ko' ? 'ENG' : 'KOR'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
              title={lang === 'ko' ? 'English' : 'Korean'}
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                  currentPage === item.id
                    ? 'text-sky-600 bg-sky-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-sky-600'
                }`}
              >
                {lang === 'ko' ? item.label : item.enLabel}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
