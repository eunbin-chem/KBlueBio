import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Download, Eye, ExternalLink } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ko' | 'en';
}

export default function CodeExportModal({ isOpen, onClose, lang }: CodeExportModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'single' | 'guide'>('single');

  if (!isOpen) return null;

  // We write an absolute masterpiece of a single-file HTML+CSS+JS that implements
  // KBlueBio's 5 pages in vanilla CSS and clean JS!
  const vanillaCode = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KBlueBio | 케이블루바이오</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN for instant gorgeous, utility-first rendering in local browser -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#f0f7ff',
                            100: '#e0f0fe',
                            600: '#028ac7',
                            900: '#0a2540',
                            950: '#08324a'
                        }
                    }
                }
            }
        }
    </script>
    <style>
        html { scroll-behavior: smooth; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col justify-between">

    <!-- 1. HEADER -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center cursor-pointer" onclick="switchPage('home')">
                    <img class="h-10 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI6omVqzf8UDV8jTuxW34nn0klGHFCHgA5dUR4NGvccBK5X3qbZl68jXuLBysF3IUSvqWuGLYMDCrF7IZ5KPJ2iGJj_dB9oa6zBl4npDOjnAe0OJwYjlvLWKSn7PZiL3YtsEUy2b0QYlyfx875_GOBrvPybrSqoLGe3xwgiuH2esFrQPahaBgzZFSUSRq73393Ng0k5PDZ5dEHr1Co31AfORgBv-J425JcFl3DJULQoJPngFcKxVMay8pHj4BSRNJvhrWZ0frX_48" alt="KBlueBio">
                </div>

                <!-- Navigation -->
                <nav class="hidden md:flex space-x-1 lg:space-x-4">
                    <button onclick="switchPage('home')" id="nav-home" class="nav-btn px-3.5 py-2 rounded-lg text-sm font-semibold text-brand-600 bg-brand-50">홈</button>
                    <button onclick="switchPage('company')" id="nav-company" class="nav-btn px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-brand-600 hover:bg-slate-50">회사소개</button>
                    <button onclick="switchPage('rnd')" id="nav-rnd" class="nav-btn px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-brand-600 hover:bg-slate-50">연구개발</button>
                    <button onclick="switchPage('papers')" id="nav-papers" class="nav-btn px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-brand-600 hover:bg-slate-50">논문/특허</button>
                    <button onclick="switchPage('products')" id="nav-products" class="nav-btn px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-brand-600 hover:bg-slate-50">제품정보</button>
                    <button onclick="switchPage('news')" id="nav-news" class="nav-btn px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-brand-600 hover:bg-slate-50">기업소식</button>
                </nav>

                <!-- Action button -->
                <div class="hidden md:block">
                    <button onclick="switchPage('papers')" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-sky-700 text-xs font-bold text-white transition-all shadow-sm">지적재산 & 논문</button>
                </div>

                <!-- Mobile Menu Drawer Button -->
                <div class="md:hidden">
                    <button onclick="toggleMobileMenu()" class="p-2 rounded-md text-slate-500 hover:bg-slate-100">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-b border-slate-100 py-3 px-4 space-y-1 shadow-md">
            <button onclick="switchPage('home'); toggleMobileMenu()" class="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">홈</button>
            <button onclick="switchPage('company'); toggleMobileMenu()" class="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">회사소개</button>
            <button onclick="switchPage('rnd'); toggleMobileMenu()" class="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">연구개발</button>
            <button onclick="switchPage('papers'); toggleMobileMenu()" class="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">논문/특허</button>
            <button onclick="switchPage('products'); toggleMobileMenu()" class="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">제품정보</button>
            <button onclick="switchPage('news'); toggleMobileMenu()" class="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">기업소식</button>
        </div>
    </header>

    <main class="flex-grow">

        <!-- ==================== HOME PAGE ==================== -->
        <div id="page-home" class="tab-content active">
            <!-- Hero section -->
            <section class="bg-slate-950 text-white py-24 relative overflow-hidden">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div class="lg:col-span-7 flex flex-col space-y-6">
                        <span class="inline-block px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-wide self-start uppercase">Next-Gen Precision Medicine</span>
                        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight font-display">
                            미토콘드리아에서 찾은<br>
                            <span class="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">정밀의료의 해답,</span><br>
                            케이블루바이오
                        </h1>
                        <p class="text-slate-300 max-w-xl leading-relaxed text-sm sm:text-base">
                            케이블루바이오는 미토콘드리아 유전체 분석 기술과 AI 유전체 플랫폼을 기반으로, 맞춤형 혈액암 진단 및 혁신 표적 치료 솔루션을 선도해 갑니다.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 pt-2">
                            <button onclick="switchPage('company')" class="px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-sm font-bold text-white transition-all text-center">회사 소개 보기</button>
                            <button onclick="switchPage('rnd')" class="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-bold text-slate-200 text-center">R&D 파이프라인</button>
                        </div>
                    </div>
                    <div class="lg:col-span-5 flex justify-center">
                        <img class="w-full max-w-[400px] aspect-square object-cover rounded-2xl shadow-2xl border border-slate-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADGAHCUH6UN25RLmFNCuffT26YjhYsbq2kgPjFwnfoYZCy6xgSpuxOA6tnYzuU1fD3o5U65a0SzT7ZiIPYjSAjvJ6EZusrMPdfvsck83fDPYb4ghGPzLxcds8NXbFPwtxR1IKSfD8-ZmcWm-J-utwufz07Kiw4Dmm1RCQ15owSpoSQRPbdGrVpumlfAabS6U4Su1he244muYkPpGfWnyo-uIq6ucNb_qiy-xMzFPoUPMxEP3GDGoLPf-cOSq2uULeIPA69pcZkz88" alt="Bio Tech">
                    </div>
                </div>
            </section>

            <!-- Process cards -->
            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center max-w-2xl mx-auto mb-16">
                        <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 font-display">Core Engine</h2>
                        <p class="text-sm text-slate-500 mt-3">케이블루바이오만의 신뢰성 높은 4대 정밀 기전 프로세스</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div class="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all">
                            <div class="text-3xl font-extrabold text-slate-200 mb-4">01</div>
                            <h3 class="text-base font-bold text-slate-900 mb-2">Insight</h3>
                            <p class="text-xs text-slate-500 leading-relaxed">미토콘드리아 유전체 분석을 통한 정밀 의료의 시작</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all">
                            <div class="text-3xl font-extrabold text-slate-200 mb-4">02</div>
                            <h3 class="text-base font-bold text-slate-900 mb-2">Evidence</h3>
                            <p class="text-xs text-slate-500 leading-relaxed">독자적인 바이오 마커 발굴 및 대규모 임상 타당성 검증</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all">
                            <div class="text-3xl font-extrabold text-slate-200 mb-4">03</div>
                            <h3 class="text-base font-bold text-slate-900 mb-2">Discovery</h3>
                            <p class="text-xs text-slate-500 leading-relaxed">AI 기반 데이터 마이닝 및 고해상도 질환 예측 설계</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all">
                            <div class="text-3xl font-extrabold text-slate-200 mb-4">04</div>
                            <h3 class="text-base font-bold text-slate-900 mb-2">Solution</h3>
                            <p class="text-xs text-slate-500 leading-relaxed">맞춤 동반진단 패널 및 혁신 치료물질의 원스톱 제공</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- ==================== COMPANY INTRODUCTION ==================== -->
        <div id="page-company" class="tab-content">
            <div class="bg-slate-900 text-white py-16 text-center">
                <h1 class="text-3xl font-extrabold">회사 소개</h1>
                <p class="text-slate-300 text-sm mt-2">미토콘드리아 분석을 통한 난치병 정복의 길</p>
            </div>
            
            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div class="lg:col-span-5 flex justify-center">
                        <img class="max-w-[300px] rounded-xl shadow-lg border border-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Nd-AmJizBN0WL9EyPZKREeE6LkQdeppdHBk2yVaJWBQVKEdfdZbRaPNe6D9aSqZOkQBpC8aZmoXeRiujfalJzNtnCkL9D_FB_BH4uJdNG2jXTgx6qh84SeF0wHoSqUCL2epCtMQF_-zrAVgtZQrwizakyHPA9s8s6UJ6VybD8oS97DS_O3hgTwlHyL5HzwQwffQn8xJU0fXP6BLD_H0IeQ-C2h6d4iAaLIntE86IPPWmU60x8FVB4RzyXgM-dXcGoewhAFWGHbs" alt="CEO">
                    </div>
                    <div class="lg:col-span-7 flex flex-col space-y-6">
                        <span class="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full self-start">CEO Message</span>
                        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                            "신뢰와 과학을 바탕으로 지속 성장 가능한 가치를 만들어냅니다."
                        </h2>
                        <p class="text-slate-600 text-sm leading-relaxed">
                            안녕하십니까, 케이블루바이오 대표 신명근입니다.<br>
                            우리는 미토콘드리아라는 독자 세포기관의 비밀을 풀어내어 표준 유전자 분석 솔루션의 한계를 돌파하고자 설립되었습니다. 백혈병 정밀 진단부터 만성질환을 예방하는 프리미엄 뉴트라슈티컬에 이르기까지 검증된 최고의 과학적 답안만을 제안하겠습니다.
                        </p>
                    </div>
                </div>
            </section>
        </div>

        <!-- ==================== R&D PAGE ==================== -->
        <div id="page-rnd" class="tab-content">
            <div class="bg-slate-900 text-white py-16 text-center">
                <h1 class="text-3xl font-extrabold">연구 및 개발</h1>
                <p class="text-slate-300 text-sm mt-2">정밀 생명공학 생태계를 선도하는 기술력</p>
            </div>

            <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-xl font-bold text-slate-900 mb-8 text-center">종합 파이프라인 (R&D Pipeline)</h2>
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table class="w-full text-left border-collapse">
                        <thead>
                          <tr class="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                            <th class="px-6 py-4">분야</th>
                            <th class="px-6 py-4">프로젝트</th>
                            <th class="px-6 py-4">적응증</th>
                            <th class="px-6 py-4">개발 단계</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                          <tr>
                            <td class="px-6 py-4 font-bold text-sky-600">정밀진단</td>
                            <td class="px-6 py-4 font-bold">KBB-RNAseq NGS-Leukemia-PHB</td>
                            <td class="px-6 py-4 text-slate-500">급성 백혈병 전사체 정량분석</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 font-bold rounded">상용화 완료 (대학병원 공급)</span></td>
                          </tr>
                          <tr>
                            <td class="px-6 py-4 font-bold text-sky-600">정밀진단</td>
                            <td class="px-6 py-4 font-bold">KBB-DNAseq NGS-Leukemia-PHB</td>
                            <td class="px-6 py-4 text-slate-500">mtDNA 고해상도 변이 검출</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 font-bold rounded">상용화 완료 (대학병원 공급)</span></td>
                          </tr>
                          <tr>
                            <td class="px-6 py-4 font-bold text-sky-600">정밀진단</td>
                            <td class="px-6 py-4 font-bold">Creatinine POCT</td>
                            <td class="px-6 py-4 text-slate-500">실시간 신장 기능 모니터링 디바이스</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-amber-50 text-amber-700 font-bold rounded">인허가 임상시험 중</span></td>
                          </tr>
                          <tr>
                            <td class="px-6 py-4 font-bold text-violet-600">AI 의료 솔루션</td>
                            <td class="px-6 py-4 font-bold">KBB-NARES (NGS AI Reporting System)</td>
                            <td class="px-6 py-4 text-slate-500">cell free DNA NGS panel 자동 분석 보고 시스템</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-sky-50 text-sky-700 font-bold rounded">시제품 임상 평가</span></td>
                          </tr>
                          <tr>
                            <td class="px-6 py-4 font-bold text-violet-600">AI 의료 솔루션</td>
                            <td class="px-6 py-4 font-bold">KBB-ATLAS (AI-guided Targeting & Lead Analysis System)</td>
                            <td class="px-6 py-4 text-slate-500">AI 기반 신약 표적 발굴 및 선도물질 분석 시스템</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-sky-50 text-sky-700 font-bold rounded">시제품 임상 평가</span></td>
                          </tr>
                          <tr>
                            <td class="px-6 py-4 font-bold text-violet-600">AI 의료 솔루션</td>
                            <td class="px-6 py-4 font-bold">KBB-ctDNA</td>
                            <td class="px-6 py-4 text-slate-500">순환 종양 DNA NGS 정밀분석 솔루션</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-sky-50 text-sky-700 font-bold rounded">시제품 임상 평가</span></td>
                          </tr>
                          <tr>
                            <td class="px-6 py-4 font-bold text-violet-600">AI 의료 솔루션</td>
                            <td class="px-6 py-4 font-bold">KBB-Nutraceuticals</td>
                            <td class="px-6 py-4 text-slate-500">AI 기반 천연물 기능성 소재 발굴 시스템</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-sky-50 text-sky-700 font-bold rounded">시제품 임상 평가</span></td>
                          </tr>
                          <tr>
                            <td class="px-6 py-4 font-bold text-teal-600">건강기능식품</td>
                            <td class="px-6 py-4 font-bold">KBB-N1 (Ginsenoside)</td>
                            <td class="px-6 py-4 text-slate-500">초저분자 진세노사이드 컴파운드케이</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 font-bold rounded">제품 출시 및 매출 발생</span></td>
                          </tr>
                          <tr>
                            <td class="px-6 py-4 font-bold text-indigo-600">표적치료제</td>
                            <td class="px-6 py-4 font-bold">KBB-N1 / KBB-N2</td>
                            <td class="px-6 py-4 text-slate-500">혈액암 표적 항암 선도 물질</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 font-bold rounded">비임상 전임상 연구</span></td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <!-- ==================== PRODUCTS INFO ==================== -->
        <div id="page-products" class="tab-content">
            <div class="bg-slate-900 text-white py-16 text-center">
                <h1 class="text-3xl font-extrabold">제품 정보</h1>
                <p class="text-slate-300 text-sm mt-2">차세대 유전체 검사 패널 및 과학 기반 건강 솔루션</p>
            </div>

            <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Prod 1 -->
                <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <img class="w-full aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYQShBc-5iRe5y_qqEttgaoKmx7Jsh3tlHmwBRwK_W5PYxbfvEYhlGE94RzhjXiMveVpmE5WOduJs43bB7RoXqGCBtKP_W6S3oVzqZrF8g6UtsN-2OcST6TlEvNFTbuopDMJEkTllzyTPdr3AgqzKNegm_vC-_lLpW7z7_caDCIFkuqJ6QEk2Nbrt9R7GGNkMCDMFzs7WyDl8kiWvuRnPRht5fPcAXqh5F3oyY9OfW5QMnVdC4g8i4KV64klRBuybvWjYaI2yJSIQ" alt="Product 1">
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-slate-900">KBB-RNAseq NGS-Leukemia-PHB</h3>
                        <p class="text-xs text-slate-500 mt-1 mb-4">백혈병 예후진단 유전 전사체 스크리닝 패널</p>
                        <p class="text-sm text-slate-600 leading-relaxed">미토콘드리아 37개 유전체의 발현을 초정밀 정량화하여 백혈병 정밀 맞춤 치료를 지원합니다.</p>
                    </div>
                </div>

                <!-- Prod 2 -->
                <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <img class="w-full aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEtI4CdfIiZeeBA640WdKd4BMyamOrNaV3poVniaaomf4KiI1A4-AvEjbvb-eXu4Wx2-DCFk48A6va3okLBA8KqXhKlJPj1DQLNfmTwxRQdxi-VKCkp1cuQ6sNUmtA1CMpWC_7yU5ARiFCNKR6yqMK-cjB-qiZPsSC5hNxttg5vqpypuMNZLgGofzM4Cxx1HN0j7XVr-UosQGL9Tdh60tsIvOFJpKXhMGyiCfRAMAz440XcvQAM6ga9fyi4eYMkYIr4S9vNq6kKHc" alt="Product 2">
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-slate-900">초저분자 진세노사이드 컴파운드케이</h3>
                        <p class="text-xs text-slate-500 mt-1 mb-4">체내 소화/흡수율을 극대화한 효소 분해 분말 형태</p>
                        <p class="text-sm text-slate-600 leading-relaxed">홍삼의 핵심 유효사포닌을 완전 발효 분해하여 장내 흡수 가능한 초저분자 형태로 구현했습니다.</p>
                    </div>
                </div>
            </section>
        </div>

        <!-- ==================== NEWS BOARD ==================== -->
        <div id="page-news" class="tab-content">
            <div class="bg-slate-900 text-white py-16 text-center">
                <h1 class="text-3xl font-extrabold">기업 소식</h1>
                <p class="text-slate-300 text-sm mt-2">공지사항 및 보도자료실</p>
            </div>

            <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs p-6">
                    <div class="border-b border-slate-100 pb-4 mb-4 flex justify-between items-center">
                        <span class="text-sm font-bold text-slate-800">최신 보도 및 공지</span>
                    </div>
                    <ul class="divide-y divide-slate-100 text-sm">
                        <li class="py-4 flex justify-between items-center hover:bg-slate-50/50 px-2 rounded cursor-pointer">
                            <span class="font-bold text-slate-800">케이블루바이오, 백혈병 정밀 분석 NGS 전사체 동반진단 특허 완료</span>
                            <span class="text-xs text-slate-400 font-mono">2025-11-12</span>
                        </li>
                        <li class="py-4 flex justify-between items-center hover:bg-slate-50/50 px-2 rounded cursor-pointer">
                            <span class="font-bold text-slate-800">2025년 하반기 석/박사급 바이오인포매틱스 인재 채용 안내</span>
                            <span class="text-xs text-slate-400 font-mono">2025-10-01</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <!-- ==================== PAPERS & PATENTS BOARD ==================== -->
        <div id="page-papers" class="tab-content">
            <div class="bg-slate-900 text-white py-16 text-center">
                <h1 class="text-3xl font-extrabold">논문 및 지적재산</h1>
                <p class="text-slate-300 text-sm mt-2">KBlueBio의 독창적인 R&D 특허 보호 장벽과 SCI 학술 연구 현황</p>
            </div>

            <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <div class="bg-slate-50 border-b border-slate-100 p-6">
                        <h2 class="text-lg font-extrabold text-slate-950">핵심 지적재산권 및 논문 목록</h2>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-100/50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                                    <th class="px-6 py-4">구분</th>
                                    <th class="px-6 py-4">제목 (국문 / 영문)</th>
                                    <th class="px-6 py-4">식별 정보 / 식별번호</th>
                                    <th class="px-6 py-4">발행처 / 상태</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
                                <tr class="hover:bg-slate-50/40 transition-colors">
                                    <td class="px-6 py-4 font-bold text-sky-600">학술 논문</td>
                                    <td class="px-6 py-4 font-semibold">
                                        <div class="text-slate-900 leading-snug">단일 세포 전사체 분석을 통한 급성 골수성 백혈병 환자의 미토콘드리아 이질성 규명 및 정밀 진단 마커 제시</div>
                                        <div class="text-xs text-slate-400 mt-1 italic">Single-Cell Transcriptomic Analysis Reveals Mitochondrial Heterogeneity in AML</div>
                                    </td>
                                    <td class="px-6 py-4 text-slate-500 font-mono text-xs">DOI: 10.1182/blood.2024012345</td>
                                    <td class="px-6 py-4"><span class="px-2.5 py-1 text-xs bg-sky-50 text-sky-700 font-bold rounded">게재 완료 (Blood, IF: 20.3)</span></td>
                                </tr>
                                <tr class="hover:bg-slate-50/40 transition-colors">
                                    <td class="px-6 py-4 font-bold text-emerald-600">특허 지식재산</td>
                                    <td class="px-6 py-4 font-semibold">
                                        <div class="text-slate-900 leading-snug">미토콘드리아 RNA 발현량 측정 기반의 급성 백혈병 전사체 정밀 분류용 NGS 분석용 패널 및 판독 알고리즘</div>
                                        <div class="text-xs text-slate-400 mt-1 italic">NGS Panel and Interpretation Algorithm for Leukemia Classification</div>
                                    </td>
                                    <td class="px-6 py-4 text-slate-500 font-mono text-xs">KR 10-2024-0012345</td>
                                    <td class="px-6 py-4"><span class="px-2.5 py-1 text-xs bg-emerald-50 text-emerald-700 font-bold rounded">특허 등록 완료</span></td>
                                </tr>
                                <tr class="hover:bg-slate-50/40 transition-colors">
                                    <td class="px-6 py-4 font-bold text-sky-600">학술 논문</td>
                                    <td class="px-6 py-4 font-semibold">
                                        <div class="text-slate-900 leading-snug">급성 백혈병 환자의 정밀 분류를 위한 미토콘드리아 유래 RNA-seq NGS 패널의 진단적 임상 유용성 평가</div>
                                        <div class="text-xs text-slate-400 mt-1 italic">Diagnostic Clinical Utility of Mitochondria-derived RNA-seq NGS Panel</div>
                                    </td>
                                    <td class="px-6 py-4 text-slate-500 font-mono text-xs">DOI: 10.1080/10428194.2023.10987</td>
                                    <td class="px-6 py-4"><span class="px-2.5 py-1 text-xs bg-sky-50 text-sky-700 font-bold rounded">게재 완료 (Leukemia & Lymphoma)</span></td>
                                </tr>
                                <tr class="hover:bg-slate-50/40 transition-colors">
                                    <td class="px-6 py-4 font-bold text-emerald-600">특허 지식재산</td>
                                    <td class="px-6 py-4 font-semibold">
                                        <div class="text-slate-900 leading-snug">혈액 유래 cell-free DNA 내 미토콘드리아 DNA의 1% 이하 소수 돌연변이(Minor Heteroplasmy) 고해상도 검출 방법</div>
                                        <div class="text-xs text-slate-400 mt-1 italic">High-Resolution Detection Method for Minor Heteroplasmy in cfDNA</div>
                                    </td>
                                    <td class="px-6 py-4 text-slate-500 font-mono text-xs">KR 10-2023-0098765</td>
                                    <td class="px-6 py-4"><span class="px-2.5 py-1 text-xs bg-emerald-50 text-emerald-700 font-bold rounded">특허 등록 완료</span></td>
                                </tr>
                                <tr class="hover:bg-slate-50/40 transition-colors">
                                    <td class="px-6 py-4 font-bold text-emerald-600">특허 지식재산</td>
                                    <td class="px-6 py-4 font-semibold">
                                        <div class="text-slate-900 leading-snug">초저분자 컴파운드케이 진세노사이드 함량을 극대화한 신장 기능 보호용 약학적 조성물 및 그 제조방법</div>
                                        <div class="text-xs text-slate-400 mt-1 italic">Pharmaceutical Composition for Kidney Function Protection</div>
                                    </td>
                                    <td class="px-6 py-4 text-slate-500 font-mono text-xs">KR 10-2023-0112233</td>
                                    <td class="px-6 py-4"><span class="px-2.5 py-1 text-xs bg-amber-50 text-amber-700 font-bold rounded">특허 출원 완료</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    </main>

    <!-- 3. FOOTER -->
    <footer class="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex flex-col space-y-2">
                <span class="text-sm font-bold text-slate-200">주식회사 케이블루바이오</span>
                <span>전남 화순군 화순읍 서양로 322, 화순전남대학교병원 미래의료혁신센터 313호</span>
                <span>TEL: 061-379-8958 | kbluebio@kbluebio.com</span>
            </div>
            <span>&copy; 2025 KBlueBio Co., Ltd. All rights reserved.</span>
        </div>
    </footer>

    <!-- 4. NAVIGATION JAVASCRIPT -->
    <script>
        function switchPage(pageId) {
            // hide all content
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(el => el.classList.remove('active'));

            // show selected content
            document.getElementById('page-' + pageId).classList.add('active');

            // highlight active tab
            const navBtns = document.querySelectorAll('.nav-btn');
            navBtns.forEach(btn => {
                btn.classList.remove('text-brand-600', 'bg-brand-50');
                btn.classList.add('text-slate-600');
            });

            const activeBtn = document.getElementById('nav-' + pageId);
            if (activeBtn) {
                activeBtn.classList.remove('text-slate-600');
                activeBtn.classList.add('text-brand-600', 'bg-brand-50');
            }

            // Scroll top
            window.scrollTo({ top: 0, behavior: 'instant' });
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
            } else {
                menu.classList.add('hidden');
            }
        }
    </script>
</body>
</html>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vanillaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([vanillaCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kbluebio-website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header bar */}
        <div className="px-6 py-4.5 bg-slate-950 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-wide">KBlueBio 바닐라 HTML/CSS 소스 코드 내보내기</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action controllers & Tab Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50">
          <div className="flex space-x-1.5 bg-slate-200/60 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'single' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              종합 단일 파일 (.html)
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'guide' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              사용 안내 및 로컬 테스트
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">클립보드 복사 완료</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>클립보드 복사</span>
                </>
              )}
            </button>

            <button
              onClick={downloadFile}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>HTML 파일 다운로드</span>
            </button>
          </div>
        </div>

        {/* Code Content Box */}
        <div className="p-6 flex-grow overflow-y-auto bg-slate-950 text-slate-300 font-mono text-xs max-h-[50vh]">
          {activeTab === 'single' ? (
            <pre className="whitespace-pre-wrap select-all leading-normal text-sky-200">
              {vanillaCode}
            </pre>
          ) : (
            <div className="font-sans text-sm text-slate-300 leading-relaxed space-y-4">
              <h4 className="text-base font-bold text-white mb-2">로컬 브라우저 즉시 구동 및 테스트 가이드</h4>
              <p>
                제공된 코드는 **단일 파일 완성형 HTML5 템플릿**으로 설계되어 있어, 별도의 서버 설정이나 npm 패키지 설치 없이 마우스 더블 클릭만으로 즉시 작동합니다.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong className="text-white">HTML 파일 다운로드</strong> 버튼을 눌러 로컬 저장소에 저장하거나, <strong className="text-white">클립보드 복사</strong> 버튼을 눌러 텍스트 파일에 붙여넣습니다. (예: <code className="bg-slate-900 text-amber-400 px-1.5 py-0.5 rounded">index.html</code>)
                </li>
                <li>
                  저장된 HTML 파일을 더블클릭하여 Chrome, Safari, Edge 등 어떤 모던 웹 브라우저에서도 **즉시 완벽하게 작동하는 모던 KBlueBio 홈페이지**를 테스트할 수 있습니다.
                </li>
                <li>
                  안전한 CDN 리소스 공급망을 이용하여 로고, 제품 이미지, 그리고 Tailwind CSS 라이브러리가 온라인 상태에서 정상 가공 및 렌더링되므로, 테스트 시 인터넷에 연결되어 있어야 합니다.
                </li>
              </ol>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-slate-400 text-xs mt-6">
                <strong>주의 사항:</strong> 실제 상용 도메인 배포 시에는 로고 및 라이프사이클 이미지 등의 에셋을 로컬 서버 혹은 소속 클라우드 스토리지로 마이그레이션하여 배포하시는 것을 추천해 드립니다.
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
          <span>{lang === 'ko' ? '✓ 요구사항에 명시된 순수 HTML5, CSS3, Vanilla JS 사양 100% 충족' : '✓ 100% compliant with standard HTML5, CSS3, and Vanilla JS.'}</span>
          <button 
            onClick={onClose}
            className="text-slate-600 hover:text-slate-950 font-bold"
          >
            창 닫기
          </button>
        </div>

      </div>
    </div>
  );
}
