import React from 'react';
import { PageType } from '../types';
import { ArrowRight, Beaker, Database, Search, Sparkles, HeartPulse, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  setCurrentPage: (page: PageType) => void;
  lang: 'ko' | 'en';
}

export default function HomeView({ setCurrentPage, lang }: HomeViewProps) {
  const heroImgUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuADGAHCUH6UN25RLmFNCuffT26YjhYsbq2kgPjFwnfoYZCy6xgSpuxOA6tnYzuU1fD3o5U65a0SzT7ZiIPYjSAjvJ6EZusrMPdfvsck83fDPYb4ghGPzLxcds8NXbFPwtxR1IKSfD8-ZmcWm-J-utwufz07Kiw4Dmm1RCQ15owSpoSQRPbdGrVpumlfAabS6U4Su1he244muYkPpGfWnyo-uIq6ucNb_qiy-xMzFPoUPMxEP3GDGoLPf-cOSq2uULeIPA69pcZkz88';
  
  const productImages = {
    rnaseq: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS1hThOeU6oVhMz_zwbGQgiw811_ccFcsPGQdXtJQ7k2MHitmMz8lV7CRfSngqkOsZFmUfKooHPfXkSZV82ZAPvcdZ0k48aMwalmwQ4DAr1dkLkCZSCbh2aiopHH4YXvyljlwckoJKzpuuh4RgMZqryGSYy6od0cU7tfAlHlmrtmVXERZD1Eq5HPoTA4tyrLlgnyO5U414BBP15YRmJalaP5yoJjGQHo4JW_pxKwKtFEzRctCKOtmv3KiN4bymunzqcTiWhZc52G0',
    dnaseq: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYO4MWc206ywCCIK--7Wcks7HSaisK4w7D_0M6rKZTSEhV8H7WNj6EMNdf8CPXsXYENqnC4syejP8aXlnM3OeGaI1qlKFqaWsTF5Lc0o9tb3rUmy0tcFdNkI2cDfeRUQDWPdzF7kr8oTVqbuuAzbEGLl0fCUdVIdAXGyP7sLdbPXPtBGNw_grAjftag1WdnIwAVkEopM4LCiDY3WtxWjwFxrPJ-ntdB1OjBmWN_vcdjAEWtwfxPbqFQH_Mx-Ztvtg2jtjXXEkx_dQ',
    compk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGZAfjfo2d7YJKiTZe76CG0b2MAllDcPxu5Re2dqeMxeL-HwL3FztmAJ63vV-X20ckuwWgmNv4oIcobamnyBZlHGuK-fcAZdk1ffQ6F3vnhz9R47j1hGi8N8-2ooJbcMH0BvFmN4rujy_ebHXeonbY5taIwW3U3Rsms7WXlpkj9v-7E63zyeuA6zwvNooj7Q5XiqEHCamHOBQXOPJRSQp742SGONCwKTvV0SHkIyhcGt1hPVNvxIDzHZvJjoOU8VBCLCvMMHWr-9o',
    prebiotics: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUxDVA2Pd7vqwGt7ruA_mCcAbXVd3cblPiG57oVoSUOQCqVsji3GphspO1EOauvnnoFcNr_y9x_Dqn8hSn4EKszdLY-al99NNRLZSWJGkcTf17jIxoi1zZLNA1Kl78aebqiGPdvjXkjOKJpwu1CQ7pZe-0cY04X5wKfHOweFBZ8oFrnSPWkvEcg8seyLc_HAsFXxCGyd3V04QL4gB40lnA63GB5XfFWwmSUwUlpm6x18sqouMO03NXrCuqk1H162eWCL6isKtuWjc'
  };

  const steps = [
    {
      id: '01',
      title: lang === 'ko' ? 'Insight' : 'Insight',
      desc: lang === 'ko' ? '미토콘드리아 유전체 심층 분석을 통한 질환 발병 기전의 규명' : 'Elucidating disease pathogenesis through deep mitochondrial genomic analysis.',
      icon: Search,
      color: 'from-blue-500 to-sky-400'
    },
    {
      id: '02',
      title: lang === 'ko' ? 'Evidence' : 'Evidence',
      desc: lang === 'ko' ? '독자적인 NGS 바이오마커 발굴 및 대규모 임상적 타당성 검증' : 'Identifying proprietary NGS biomarkers and validating through large-scale clinical trials.',
      icon: Beaker,
      color: 'from-sky-500 to-teal-400'
    },
    {
      id: '03',
      title: lang === 'ko' ? 'Discovery' : 'Discovery',
      desc: lang === 'ko' ? 'AI 기반 바이오인포매틱스 분석 및 고정밀 질환 예측 알고리즘 설계' : 'Designing high-precision disease prediction algorithms based on AI bioinformatics.',
      icon: Database,
      color: 'from-indigo-500 to-blue-400'
    },
    {
      id: '04',
      title: lang === 'ko' ? 'Solution' : 'Solution',
      desc: lang === 'ko' ? '개인 맞춤형 동반진단 키트 및 미토콘드리아 타겟 치료 혁신신약 공급' : 'Providing personalized companion diagnostic kits and innovative targeted therapeutics.',
      icon: Sparkles,
      color: 'from-violet-500 to-indigo-400'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[640px] flex items-center py-20">
        <div className="absolute inset-0 bg-radial-[circle_at_30%_30%] from-blue-950/40 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url(${heroImgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/25 tracking-wide self-start uppercase">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Next-Gen Precision Medicine</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {lang === 'ko' ? (
                <>
                  세포의 에너지 발전소,<br />
                  미토콘드리아에서 찾은<br />
                  <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">정밀의료의 해답,</span><br />
                  케이블루바이오
                </>
              ) : (
                <>
                  The Answer to<br />
                  <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Precision Medicine,</span><br />
                  Found in Mitochondria
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              {lang === 'ko' 
                ? '케이블루바이오는 이행성 미토콘드리아 연구 결과를 바탕으로 2020년 화순전남대학교병원 원내 창업 기업으로 첫발을 내디뎠습니다. 미토콘드리아 및 관련 동반진단 표지자를 타깃으로 한 혁신신약 개발 및 정밀의료 관련 제품 R&D를 가속화하고 있습니다.'
                : 'Based on translational mitochondrial research, KBlueBio was founded in 2020 as an in-hospital startup at Chonnam National University Hwasun Hospital. We are accelerating the development of innovative therapeutics and precision medicine products targeting mitochondria and associated companion diagnostic biomarkers.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setCurrentPage('company')}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-sm font-bold rounded-lg bg-sky-600 hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/20 text-white transition-all cursor-pointer"
              >
                <span>{lang === 'ko' ? '회사 소개 보기' : 'About KBlueBio'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={() => setCurrentPage('rnd')}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-700 text-sm font-bold rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
              >
                <span>{lang === 'ko' ? 'R&D 파이프라인' : 'R&D Pipeline'}</span>
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-blue-500/10">
              <img 
                src={heroImgUrl} 
                alt="Precision Bio Science" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="flex items-center space-x-3 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-lg border border-slate-800">
                  <HeartPulse className="w-5 h-5 text-sky-400 animate-pulse" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">KBlueBio Tech</div>
                    <div className="text-[10px] text-slate-400">Precision Medicine Platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Process Section (Four Steps) */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-sky-600 uppercase mb-3">Core Engine</h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-snug">
              {lang === 'ko' ? '어떻게 정밀의료의 미래를 여는가' : 'How We Unlock Precision Medicine'}
            </p>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              {lang === 'ko'
                ? '케이블루바이오는 미토콘드리아 데이터 수집부터 최종 진단/치료 솔루션 공급에 이르는 과학적이고 독자적인 순환 고리를 보유하고 있습니다.'
                : 'KBlueBio possesses a proprietary scientific loop from mitochondrial data aggregation to customized clinical solutions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div 
                  key={idx}
                  className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs hover:shadow-md hover:bg-white hover:border-sky-100 transition-all group duration-300"
                >
                  <div className="absolute top-6 right-6 font-mono text-3xl font-extrabold text-slate-200 group-hover:text-sky-100 transition-colors">
                    {step.id}
                  </div>
                  <div className="p-3 bg-white shadow-xs rounded-xl self-start mb-6 border border-slate-100 group-hover:border-sky-200 transition-colors">
                    <IconComp className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Tech Track Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
                R&D Focus & Tracks
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {lang === 'ko' ? '정밀 의료 생태계를 선도하는 세 가지 핵심 트랙' : 'Three Core Tracks for Precision Ecosystem'}
              </h2>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                {lang === 'ko'
                  ? '우리는 유전자 수준의 심층 진단부터 약물 치료, 그리고 과학에 기반한 만성질환 예방 뉴트라슈티컬에 이르는 전방위 헬스케어 혁신 체계를 구축합니다.'
                  : 'We establish an all-encompassing healthcare ecosystem ranging from genomic diagnostics and targeted therapy to science-backed nutraceutical solutions.'}
              </p>
              <div>
                <button
                  onClick={() => setCurrentPage('rnd')}
                  className="inline-flex items-center px-4 py-2 border border-sky-600 rounded-lg text-sm font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-all cursor-pointer"
                >
                  <span>{lang === 'ko' ? 'R&D 영역 자세히 보기' : 'Explore R&D'}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Track 1 */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-lg transition-all">
                <span className="font-mono text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-1 rounded">Track 1</span>
                <h3 className="text-base font-bold text-slate-900 mt-4 mb-2">{lang === 'ko' ? '정밀 진단' : 'Diagnostics'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'ko' 
                    ? 'NGS 기술 기반 고신뢰도 혈액암 진단 패널 및 동반 진단 솔루션' 
                    : 'NGS-based highly reliable hematologic cancer diagnostic panels & companion diagnostics.'}
                </p>
              </div>

              {/* Track 2 */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-lg transition-all">
                <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Track 2</span>
                <h3 className="text-base font-bold text-slate-900 mt-4 mb-2">{lang === 'ko' ? '표적 치료' : 'Therapeutics'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'ko' 
                    ? '미토콘드리아 손상 및 기능 장애 타겟 차세대 First-in-class 표적 치료제' 
                    : 'First-in-class therapeutics targeting mitochondrial damage and dysfunction.'}
                </p>
              </div>

              {/* Track 3 */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-lg transition-all">
                <span className="font-mono text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-1 rounded">Track 3</span>
                <h3 className="text-base font-bold text-slate-900 mt-4 mb-2">{lang === 'ko' ? '뉴트라슈티컬' : 'Nutraceuticals'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'ko' 
                    ? '초저분자 진세노사이드 등 천연물 기반 대사 촉진 및 만성질환 억제 제품군' 
                    : 'Natural-derived bio-active formulas like low-molecular Ginsenosides.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Highlights Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-sky-600 uppercase mb-3">Market Offerings</h2>
              <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
                {lang === 'ko' ? '혁신 제품 라인업' : 'Innovative Products'}
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('products')}
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
            >
              <span>{lang === 'ko' ? '전체 제품 상세 보기' : 'View All Products'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Prod 1 */}
            <div className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:bg-white hover:shadow-xl hover:border-sky-100 transition-all duration-300 flex flex-col h-full">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img 
                  src={productImages.rnaseq} 
                  alt="KBB-RNAseq" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider bg-sky-600 text-white px-2 py-1 rounded">NGS Panel</span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                    KBB-RNAseq NGS-Leukemia-PHB
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {lang === 'ko' 
                      ? '백혈병 환자의 미토콘드리아 RNA 발현량 정량분석 패널' 
                      : 'Mitochondrial RNA profiling panel for leukemia patient stratification.'}
                  </p>
                </div>
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="w-full text-center py-2 bg-white group-hover:bg-sky-50 border border-slate-200 group-hover:border-sky-200 text-xs font-bold text-slate-700 group-hover:text-sky-700 rounded-lg transition-all cursor-pointer"
                >
                  {lang === 'ko' ? '상세 스펙 보기' : 'View Specifications'}
                </button>
              </div>
            </div>

            {/* Prod 2 */}
            <div className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:bg-white hover:shadow-xl hover:border-sky-100 transition-all duration-300 flex flex-col h-full">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img 
                  src={productImages.dnaseq} 
                  alt="KBB-DNAseq" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider bg-sky-600 text-white px-2 py-1 rounded">NGS Panel</span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                    KBB-DNAseq NGS-Leukemia-PHB
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {lang === 'ko' 
                      ? '미토콘드리아 DNA 점돌연변이 및 대량 결실 스크리닝 패널' 
                      : 'Mitochondrial DNA point mutation & large-deletion screening panel.'}
                  </p>
                </div>
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="w-full text-center py-2 bg-white group-hover:bg-sky-50 border border-slate-200 group-hover:border-sky-200 text-xs font-bold text-slate-700 group-hover:text-sky-700 rounded-lg transition-all cursor-pointer"
                >
                  {lang === 'ko' ? '상세 스펙 보기' : 'View Specifications'}
                </button>
              </div>
            </div>

            {/* Prod 3 */}
            <div className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:bg-white hover:shadow-xl hover:border-sky-100 transition-all duration-300 flex flex-col h-full">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img 
                  src={productImages.compk} 
                  alt="Compound K" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider bg-teal-600 text-white px-2 py-1 rounded">Nutraceutical</span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                    초저분자 진세노사이드 컴파운드케이
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {lang === 'ko' 
                      ? '체내 흡수율을 15배 이상 향상시킨 발효 가공 인삼 분말' 
                      : 'Fermented premium Ginsenoside powder with 15x higher absorption rate.'}
                  </p>
                </div>
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="w-full text-center py-2 bg-white group-hover:bg-teal-50 border border-slate-200 group-hover:border-teal-200 text-xs font-bold text-slate-700 group-hover:text-teal-700 rounded-lg transition-all cursor-pointer"
                >
                  {lang === 'ko' ? '상세 스펙 보기' : 'View Specifications'}
                </button>
              </div>
            </div>

            {/* Prod 4 */}
            <div className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:bg-white hover:shadow-xl hover:border-sky-100 transition-all duration-300 flex flex-col h-full">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
                <img 
                  src={productImages.prebiotics} 
                  alt="Prebiotics" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider bg-teal-600 text-white px-2 py-1 rounded">Nutraceutical</span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                    울트라 K-프리바이오틱스
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {lang === 'ko' 
                      ? '장내 대사 환경 개선을 돕는 기능성 프락토올리고당 혼합 제제' 
                      : 'Functional fructooligosaccharide blend for optimized gut health.'}
                  </p>
                </div>
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="w-full text-center py-2 bg-white group-hover:bg-teal-50 border border-slate-200 group-hover:border-teal-200 text-xs font-bold text-slate-700 group-hover:text-teal-700 rounded-lg transition-all cursor-pointer"
                >
                  {lang === 'ko' ? '상세 스펙 보기' : 'View Specifications'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Corporate Slogan Band */}
      <section className="bg-sky-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.15)_0%,transparent_100%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {lang === 'ko' ? '글로벌 의료 및 헬스케어 생태계를 함께 바꾸어갑니다.' : 'Shaping the Future of Global Healthcare Together'}
            </h3>
            <p className="text-sky-100 text-xs sm:text-sm">
              {lang === 'ko' 
                ? '연구 협력, 제품 공급 및 라이선스 아웃에 관한 최적의 파트너십을 제안해 주세요.' 
                : 'Suggest the optimal partnership regarding collaborative R&D, product supply, or licensing.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('papers')}
            className="px-6 py-3 bg-white text-sky-900 font-bold rounded-lg text-sm hover:bg-sky-50 shadow-md transition-all cursor-pointer"
          >
            {lang === 'ko' ? '지적재산 & 연구논문 보기' : 'View IP & Papers'}
          </button>
        </div>
      </section>
    </div>
  );
}
