import React from 'react';
import { PageType } from '../types';
import { NAV_ITEMS } from './Header';
import { Mail, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
  lang: 'ko' | 'en';
}

export default function Footer({ setCurrentPage, lang }: FooterProps) {
  const footerLogoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoWsh3_N_zUSpDToXD1NkA0VV0Uu7Hg1Dvhwk_b6E9IvGV5aYXXIcbY5NXD_U1NF6HwKMEPukjkjAg-mlLII4PY5iUF5zYf3YcOMrF7JiQprxuFyg8lizYC2Y6RzMzUTWAPDzAweIuwwzEOdBV1YIzXcHlGUL6sR11YULH1JScJU1mJM4959XOV-kQ7SuthpQPEnD2M4b7FC88sjsHSsddGLHJLzc1I_J97KZdozIG37XkKMcgRVQobtM2qEhH-kG-YsKIFao5RtU';

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img 
                src={footerLogoUrl} 
                alt="KBlueBio Logo" 
                className="h-10 w-auto brightness-200 contrast-150"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {lang === 'ko' 
                ? '미토콘드리아 유전체 분석 및 AI 알고리즘을 활용한 혁신적 정밀진단 및 맞춤형 신약 개발을 주도하는 글로벌 바이오 기업입니다.'
                : 'A global bio-enterprise leading innovative precision diagnostics and personalized drug development utilizing mitochondrial genome analysis and AI.'}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-slate-200 text-sm font-bold tracking-wider uppercase mb-4">
              {lang === 'ko' ? '주요 메뉴' : 'Sitemap'}
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentPage(item.id);
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-sky-400 transition-colors text-left"
                  >
                    {lang === 'ko' ? item.label : item.enLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="col-span-1 md:col-span-4 flex flex-col space-y-3 text-sm">
            <h3 className="text-slate-200 text-sm font-bold tracking-wider uppercase mb-4">
              {lang === 'ko' ? '고객 및 사업 제휴 문의' : 'Contact Us'}
            </h3>
            
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
              <span className="leading-normal">
                {lang === 'ko'
                  ? '전남 화순군 화순읍 서양로 322, 화순전남대학교병원 미래의료혁신센터 313호'
                  : 'Room 313, Future Medical Innovation Center, Chonnam National University Hwasun Hospital, 322 Seoyang-ro, Hwasun-eup, Hwasun-gun, Jeollanam-do, Korea'}
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span>061-379-8958</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <a href="mailto:kbluebio@kbluebio.com" className="hover:text-sky-400 transition-colors">
                kbluebio@kbluebio.com
              </a>
            </div>

            <div className="flex items-center space-x-2.5">
              <Building className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span>{lang === 'ko' ? '사업자등록번호: 458-81-01721' : 'Business Reg No: 458-81-01721'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <div className="flex items-center space-x-4">
            <span>&copy; {new Date().getFullYear()} KBlueBio. All rights reserved.</span>
            <span className="text-slate-700">|</span>
            <a href="#privacy" className="hover:text-sky-400 transition-colors">
              {lang === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
            </a>
            <span className="text-slate-700">|</span>
            <a href="#terms" className="hover:text-sky-400 transition-colors">
              {lang === 'ko' ? '이용약관' : 'Terms of Use'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
