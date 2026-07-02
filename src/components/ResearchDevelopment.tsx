import React from 'react';
import { 
  Dna, 
  Sparkles, 
  FlaskConical, 
  Binary, 
  Layers, 
  Activity, 
  ChevronRight, 
  CheckCircle2, 
  Pill, 
  ShieldAlert,
  Database
} from 'lucide-react';

interface ResearchDevelopmentProps {
  lang: 'ko' | 'en';
}

// Translations Object for Multilingual Fidelity
const t = {
  ko: {
    title: '연구개발',
    subtitle: 'KBlueBio는 정밀 진단, 표적 치료, 그리고 뉴트라슈티컬을 잇는 독자적인 3-Track 기술 생태계를 통해 인류의 건강한 미래를 설계합니다.',
    roadmapTitle: 'R&D Roadmap & Technology Cluster',
    comprehensiveTitle: 'Comprehensive R&D Pipeline',
    comprehensiveSub: '정밀의료 진단부터 혁신 치료제까지, KBlueBio의 기술 로드맵을 소개합니다.',
    track1Title: 'Track 1: 정밀 진단',
    track1Desc1: 'NGS Blood Cancer Panel',
    track1Sub1: '혈액암 정밀의료 솔루션',
    track1Desc2: 'Creatinine POCT',
    track1Sub2: '신속/저비용 현장진단 크레아티닌 정량 페이퍼칩기반 효소 센서 이용',
    
    track2Title: 'Track 2: 표적 치료',
    track2Desc1: 'KBB-N1/N2',
    track2Sub1: '암세포 특이적 사멸 유도 작용을 극대화한 신규 크로마논 유도체 화합물',
    track2Desc2: 'KBB-CC',
    track2Sub2: '미토콘드리아 PHB 타깃 혁신신약',
    track2Desc3: 'Next-gen ADC',
    track2Sub3: '항체-약물 접합체(ADC)기술을 통한 정밀 항암 치료',
    
    track3Title: 'Track 3: 뉴트라슈티컬',
    track3Desc1: 'Bio-conversion Tech',
    track3Sub1: '생물전환 기술 기반의 초저분화 유효성분 추출 및 정제',
    track3Desc2: 'Ultra-low Molecular',
    track3Sub2: '체내 흡수율을 극대화한 초저분자 원료 대량 생산 시스템',
    
    detailsView: 'Details View',
    pipelineRoadmap: 'Pipeline Roadmap',
    techDetails: 'Technology Details',
    
    diagTitle: '1. Precision Medicine Diagnostics (정밀의료 진단)',
    aiTitle: '2. AI Medical Solution (AI 의료 솔루션)',
    nutraTitle: '3. Nutraceuticals (건강기능식품)',
    theraTitle: '4. Precision Medicine Therapeutics (정밀의료 치료제)',
    
    project: 'PROJECT',
    candidate: 'CANDIDATE',
    status: 'STATUS',
    synergy: 'SYNERGY',
    sales: 'SALES',
    inUseHospital: '대학병원 사용중',
    revenueGenerated: '매출발생',
    salesActive: '매출 발생',
    inProgress: 'In Progress',
    rdStage: 'R&D Stage',
    clinicalTrialOverlay: '인허가 임상시험',
    dataSynergy: 'Data Synergy',
  },
  en: {
    title: 'Research & Development',
    subtitle: 'KBlueBio designs a healthy future for humanity through a proprietary 3-Track technology ecosystem linking precision diagnostics, targeted therapeutics, and nutraceuticals.',
    roadmapTitle: 'R&D Roadmap & Technology Cluster',
    comprehensiveTitle: 'Comprehensive R&D Pipeline',
    comprehensiveSub: 'Introducing KBlueBio\'s technology roadmaps from precision diagnostics to breakthrough therapeutics.',
    track1Title: 'Track 1: Precision Diagnostics',
    track1Desc1: 'NGS Blood Cancer Panel',
    track1Sub1: 'Precision medicine solution for blood cancer',
    track1Desc2: 'Creatinine POCT',
    track1Sub2: 'Rapid/low-cost point-of-care quantitative creatinine paper-chip-based enzyme sensor',
    
    track2Title: 'Track 2: Targeted Therapeutics',
    track2Desc1: 'KBB-N1/N2',
    track2Sub1: 'Novel chromanone derivative compounds maximizing cancer-cell-specific apoptosis',
    track2Desc2: 'KBB-CC',
    track2Sub2: 'First-in-class drug targeting mitochondrial PHB',
    track2Desc3: 'Next-gen ADC',
    track2Sub3: 'Precision cancer therapeutics utilizing next-generation antibody-drug conjugate (ADC) technology',
    
    track3Title: 'Track 3: Nutraceuticals',
    track3Desc1: 'Bio-conversion Tech',
    track3Sub1: 'Extraction & purification of ultra-low-molecular active ingredients via bioconversion',
    track3Desc2: 'Ultra-low Molecular',
    track3Sub2: 'Mass production system of ultra-low-molecular weight raw materials maximizing absorption',
    
    detailsView: 'Details View',
    pipelineRoadmap: 'Pipeline Roadmap',
    techDetails: 'Technology Details',
    
    diagTitle: '1. Precision Medicine Diagnostics',
    aiTitle: '2. AI Medical Solution',
    nutraTitle: '3. Nutraceuticals',
    theraTitle: '4. Precision Medicine Therapeutics',
    
    project: 'PROJECT',
    candidate: 'CANDIDATE',
    status: 'STATUS',
    synergy: 'SYNERGY',
    sales: 'SALES',
    inUseHospital: 'In Use at Hospitals',
    revenueGenerated: 'Revenue Generated',
    salesActive: 'Sales Active',
    inProgress: 'In Progress',
    rdStage: 'R&D Stage',
    clinicalTrialOverlay: 'KFDA Clinical Trial',
    dataSynergy: 'Data Synergy',
  }
};

const arrowStartStyle = { clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' };
const arrowStyle = { clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)' };

const ArrowStart = ({ active, colorClass = 'bg-sky-900' }: { active: boolean; colorClass?: string; key?: React.Key }) => (
  <div 
    style={arrowStartStyle} 
    className={`h-8 w-full ${active ? colorClass : 'bg-slate-100'}`}
  />
);

const Arrow = ({ active, colorClass = 'bg-sky-900', children }: { active: boolean; colorClass?: string; children?: React.ReactNode; key?: React.Key }) => (
  <div 
    style={arrowStyle} 
    className={`h-8 w-full flex items-center justify-center relative ${active ? colorClass : 'bg-slate-100'}`}
  >
    {children}
  </div>
);

const PipelineSteps = ({ 
  steps, 
  colorClass = 'bg-sky-900',
  specialNode
}: { 
  steps: (boolean | 'partial')[]; 
  colorClass?: string;
  specialNode?: { index: number; element: React.ReactNode };
}) => {
  return (
    <div className="grid gap-1 h-8" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((st, sIdx) => {
        const active = st === true || st === 'partial';
        const isPartial = st === 'partial';
        const finalColor = isPartial ? `${colorClass}/60` : colorClass;
        
        const hasSpecial = specialNode && specialNode.index === sIdx;
        
        if (sIdx === 0) {
          return <ArrowStart key={sIdx} active={active} colorClass={finalColor} />;
        }
        return (
          <Arrow key={sIdx} active={active} colorClass={finalColor}>
            {hasSpecial ? specialNode.element : null}
          </Arrow>
        );
      })}
    </div>
  );
};

export default function ResearchDevelopment({ lang }: ResearchDevelopmentProps) {
  const current = t[lang];

  const labImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWdT6XZ9kRCcxZouRqvHDwn90JP9asS00gqxFcN5JshzO6NuKDJdybYpiXxiTJlxz6GPeW5aBmcJSGsKAJfpeLDpJsTMERZYvNsCzFTQtKgsL1PirwPg375bXXU3U9Km3wZyeTdXm89D7kPyZMOUONRwd2ia3JxtpSenfcqex4ehcsLHhd_7w47Skal9L_pu_v-G9gyn5XzBxvNn2ebH8Z2pTHa3Ef7ql2Hag7iVIe_GibbVmrIiQog6PkluE3u_5WfUhEFTBwyLs';
  const moleculeImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaqDOwAL4pdeRaxeTWVmUclwKQyvv1xezEKVlyG4Ka8MbmCNiWDkrZTqXdJVKXigOd2EYMaMYRS9P8qgW1gxRbYsCnKANnmd-S4WwOw7giDuKkFKXTAgzp4XCeluhrraKi7oOuNts3P4H-XakinuMMkf6_tj4HH9CXWMHaL6Hr1pwECZmWej7ahyHuI5_Ck12qXIRioPCV5qZ4WRovXFMlH3UTQaXV3XuT1edusEu7_Xd5LCGzvTqVpafS67YpMhAvzkxSfd4mICo';
  const lab2Img = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7ekVgkB9ZBKHdGtmkwVzfMdVrXkRQb2got6o0qEO7CPnHHWeZCggeHVLsUqgPTsFkroPqBCXiJkN9Jn4kc8Bz8VqdsHN-PAdtrid9ieeqYd1ZwJiAQ_9EDmTnibA-HXYSVnpxhpLymgJLACSesBy_YfSJXmj3dvo1wqQ3pbUA4krx75TJjmh5hkCQNQ0iKR0Tg7Wb0Fkr-_sWu6P1gCD80DBtooo3HHpNFILa4nCcph0RrrQ0_u8U9XpffErgiDIK4jDTxPCze74';

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Visual Header */}
      <div className="bg-slate-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-blue-950/45 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-wide uppercase mb-4">
            Innovation Track
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Precision Medicine<br />Ecosystem for Tomorrow
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* 1. Track Descriptions Bento Grid */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold text-sky-900 mb-4 tracking-tight uppercase">
              {current.roadmapTitle}
            </h2>
            <div className="w-16 h-1 bg-sky-700 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Track 1: Precision Diagnosis */}
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl relative shadow-xs hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-700 rounded-t-2xl"></div>
                <div className="flex items-center mb-6">
                  <span className="p-2.5 bg-sky-50 text-sky-700 rounded-lg mr-4">
                    <Binary className="w-6 h-6" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{current.track1Title}</h3>
                </div>
                <img 
                  alt="Track 1" 
                  className="w-full h-44 object-cover mb-6 rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500" 
                  src={labImg}
                  referrerPolicy="no-referrer"
                />
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-sky-700 font-extrabold mr-2">01</span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{current.track1Desc1}</p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{current.track1Sub1}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-700 font-extrabold mr-2">02</span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{current.track1Desc2}</p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{current.track1Sub2}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <button className="w-full mt-8 py-2.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-bold uppercase hover:bg-slate-50 transition-colors">
                {current.detailsView}
              </button>
            </div>

            {/* Track 2: Targeted Therapy (Centerpiece Highlight) */}
            <div className="bg-slate-900 text-white border border-slate-850 p-8 rounded-2xl relative shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-400 rounded-t-2xl"></div>
                <div className="flex items-center mb-6">
                  <span className="p-2.5 bg-slate-800 text-sky-400 rounded-lg mr-4">
                    <Dna className="w-6 h-6 animate-pulse" />
                  </span>
                  <h3 className="text-lg font-bold text-white">{current.track2Title}</h3>
                </div>
                <img 
                  alt="Track 2" 
                  className="w-full h-44 object-cover mb-6 rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-500" 
                  src={moleculeImg}
                  referrerPolicy="no-referrer"
                />
                 <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-sky-400 font-extrabold mr-2">01</span>
                    <div>
                      <p className="font-bold text-white text-sm">{current.track2Desc1}</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{current.track2Sub1}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-400 font-extrabold mr-2">02</span>
                    <div>
                      <p className="font-bold text-white text-sm">{current.track2Desc2}</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{current.track2Sub2}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-400 font-extrabold mr-2">03</span>
                    <div>
                      <p className="font-bold text-white text-sm">{current.track2Desc3}</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{current.track2Sub3}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <button className="w-full mt-8 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase rounded-lg transition-colors border-none shadow-xs">
                {current.pipelineRoadmap}
              </button>
            </div>

            {/* Track 3: Nutraceuticals */}
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl relative shadow-xs hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-700 rounded-t-2xl"></div>
                <div className="flex items-center mb-6">
                  <span className="p-2.5 bg-sky-50 text-sky-700 rounded-lg mr-4">
                    <FlaskConical className="w-6 h-6" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{current.track3Title}</h3>
                </div>
                <img 
                  alt="Track 3" 
                  className="w-full h-44 object-cover mb-6 rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500" 
                  src={lab2Img}
                  referrerPolicy="no-referrer"
                />
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-sky-700 font-extrabold mr-2">01</span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{current.track3Desc1}</p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{current.track3Sub1}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-700 font-extrabold mr-2">02</span>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{current.track3Desc2}</p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{current.track3Sub2}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <button className="w-full mt-8 py-2.5 border border-slate-200 rounded-lg text-slate-600 text-xs font-bold uppercase hover:bg-slate-50 transition-colors">
                {current.techDetails}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Comprehensive R&D Pipeline Section */}
      <section 
        className="py-24 border-y border-slate-200/60"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)', 
          backgroundSize: '24px 24px' 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-900 tracking-tight">
              {current.comprehensiveTitle}
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
              {current.comprehensiveSub}
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Group 1: Precision Medicine Diagnostics */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h3 className="text-base sm:text-lg font-bold text-sky-900 mb-6 flex items-center">
                <Binary className="w-5 h-5 mr-2.5 text-sky-600" />
                <span>{current.diagTitle}</span>
              </h3>
              
              <div className="overflow-x-auto">
                <div className="min-w-[840px] space-y-4">
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center pb-2 border-b border-slate-100">
                    <div className="text-left pl-2">{current.project}</div>
                    <div className="grid grid-cols-4 gap-1">
                      <div>R&D</div>
                      <div>{lang === 'ko' ? 'Prototype (시작품)' : 'Prototype'}</div>
                      <div>{lang === 'ko' ? 'Trial (시제품)' : 'Trial'}</div>
                      <div>{lang === 'ko' ? 'Product (제품화)' : 'Product'}</div>
                    </div>
                    <div>{current.status}</div>
                  </div>

                  {/* Row 1: KBB™-RNAseqNGS-Leukemia-PHB */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div className="font-bold text-slate-800 text-sm">KBB™-RNAseqNGS-Leukemia-PHB</div>
                    <PipelineSteps steps={[true, true, true, true]} colorClass="bg-sky-900" />
                    <div className="flex flex-wrap gap-1 justify-center">
                      <span className="bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-sky-100/50">
                        {current.inUseHospital}
                      </span>
                      <span className="bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-teal-100/50">
                        {current.revenueGenerated}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: KBB™-DNAseqNGS-Leukemia-PHB */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div className="font-bold text-slate-800 text-sm">KBB™-DNAseqNGS-Leukemia-PHB</div>
                    <PipelineSteps steps={[true, true, true, true]} colorClass="bg-sky-900" />
                    <div className="flex flex-wrap gap-1 justify-center">
                      <span className="bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-sky-100/50">
                        {current.inUseHospital}
                      </span>
                      <span className="bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-teal-100/50">
                        {current.revenueGenerated}
                      </span>
                    </div>
                  </div>

                  {/* Row 3: Creatinine POCT */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div className="font-bold text-slate-800 text-sm">Creatinine POCT</div>
                    <PipelineSteps 
                      steps={[true, true, true, false]} 
                      colorClass="bg-sky-900" 
                      specialNode={{
                        index: 2,
                        element: (
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[9px] px-2 py-0.5 rounded shadow-md whitespace-nowrap z-10 font-bold">
                            {current.clinicalTrialOverlay}
                          </span>
                        )
                      }}
                    />
                    <div className="text-center italic text-slate-400 text-xs font-medium">
                      {current.inProgress}
                    </div>
                  </div>

                  {/* Row 4: KBB™-Exo-Pancreatic Cancer */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div className="font-bold text-slate-800 text-sm">KBB™-Exo-Pancreatic Cancer</div>
                    <PipelineSteps steps={[true, true, false, false]} colorClass="bg-sky-900" />
                    <div className="text-center italic text-slate-400 text-xs font-medium">
                      {current.rdStage}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Group 2: AI Medical Solution */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h3 className="text-base sm:text-lg font-bold text-sky-900 mb-6 flex items-center">
                <Database className="w-5 h-5 mr-2.5 text-teal-600" />
                <span>{current.aiTitle}</span>
              </h3>

              <div className="overflow-x-auto">
                <div className="min-w-[840px] space-y-4">
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center pb-2 border-b border-slate-100">
                    <div className="text-left pl-2">{current.project}</div>
                    <div className="grid grid-cols-4 gap-1">
                      <div>R&D</div>
                      <div>Prototype</div>
                      <div>Trial</div>
                      <div>Product</div>
                    </div>
                    <div>{current.synergy}</div>
                  </div>

                  {/* Row 1: KBB-NARES (NGS AI Reporting System) */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">KBB-NARES (NGS AI Reporting System)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {lang === 'ko' ? '혈액암 NGS RNA/DNA seq AI 자동 분석 보고 시스템, 순환 종양 DNA NGS AI 자동 분석 보고 시스템' : 'Leukemia NGS RNA/DNA seq AI automated reporting system, circulating tumor DNA NGS AI automated reporting system'}
                      </div>
                    </div>
                    <PipelineSteps steps={[true, true, true, false]} colorClass="bg-teal-700" />
                    <div className="text-center text-teal-600 font-extrabold text-xs">
                      {current.dataSynergy}
                    </div>
                  </div>

                  {/* Row 2: KBB-ATLAS (AI-guided Targeting & Lead Analysis System) */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">KBB-ATLAS (AI-guided Targeting & Lead Analysis System)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {lang === 'ko' ? 'AI 기반 신약 표적 발굴 및 선도물질 분석 시스템' : 'AI-guided drug target discovery & lead optimization system'}
                      </div>
                    </div>
                    <PipelineSteps steps={[true, true, true, false]} colorClass="bg-teal-700" />
                    <div className="text-center text-teal-600 font-extrabold text-xs">
                      {current.dataSynergy}
                    </div>
                  </div>

                  {/* Row 4: KBB-Nutraceuticals */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">KBB-Nutraceuticals</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {lang === 'ko' ? 'AI 기반 천연물 기능성 소재 발굴 시스템' : 'AI-driven functional nutraceutical active compound search system'}
                      </div>
                    </div>
                    <PipelineSteps steps={[true, true, true, false]} colorClass="bg-teal-700" />
                    <div className="text-center text-teal-600 font-extrabold text-xs">
                      {current.dataSynergy}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Group 3: Nutraceuticals */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h3 className="text-base sm:text-lg font-bold text-sky-900 mb-6 flex items-center">
                <Pill className="w-5 h-5 mr-2.5 text-sky-600" />
                <span>{current.nutraTitle}</span>
              </h3>

              <div className="overflow-x-auto">
                <div className="min-w-[840px] space-y-4">
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center pb-2 border-b border-slate-100">
                    <div className="text-left pl-2">{current.project}</div>
                    <div className="grid grid-cols-4 gap-1">
                      <div>R&D</div>
                      <div>Prototype</div>
                      <div>Upcoming</div>
                      <div>Product</div>
                    </div>
                    <div>{current.sales}</div>
                  </div>

                  {/* Row 1: KBB-N1/N2 소재물질 */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">
                        {lang === 'ko' ? 'KBB-N1/N2 소재물질' : 'KBB-N1/N2 Active Compounds'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {lang === 'ko' ? '초저분자 진세노사이드 계열' : 'Ultra-low molecular weight ginsenoside family'}
                      </div>
                    </div>
                    <PipelineSteps steps={[true, true, true, true]} colorClass="bg-sky-900" />
                    <div className="flex justify-center">
                      <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-[9px] font-bold shadow-xs">
                        {current.salesActive}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: 프로바이오틱스 소재물질 */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">
                        {lang === 'ko' ? '프로바이오틱스 소재물질' : 'Probiotics Active Compounds'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {lang === 'ko' ? '프리미엄 낙산균 울트라 K-프리바이오틱스' : 'Premium Butyrate-producing bacteria Ultra K-Prebiotics'}
                      </div>
                    </div>
                    <PipelineSteps steps={[true, true, true, true]} colorClass="bg-sky-900" />
                    <div className="flex justify-center">
                      <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-[9px] font-bold shadow-xs">
                        {current.salesActive}
                      </span>
                    </div>
                  </div>

                  {/* Row 3: KBB-BA */}
                  <div className="grid grid-cols-[1.8fr_4fr_1.2fr] gap-4 items-center py-2 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">KBB-BA</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {lang === 'ko' ? '낙산균에서 생성된 butyric acid 기능성 원료 등록' : 'Registration of functional raw material of butyric acid generated from butyrate-producing bacteria'}
                      </div>
                    </div>
                    <PipelineSteps steps={[true, false, false, false]} colorClass="bg-sky-900" />
                    <div className="text-center italic text-slate-400 text-xs font-medium">
                      {current.rdStage}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Group 4: Precision Medicine Therapeutics */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h3 className="text-base sm:text-lg font-bold text-sky-900 mb-6 flex items-center">
                <FlaskConical className="w-5 h-5 mr-2.5 text-sky-600" />
                <span>{current.theraTitle}</span>
              </h3>

              <div className="overflow-x-auto">
                <div className="min-w-[840px] space-y-4">
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-[1.8fr_5.2fr] gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center pb-2 border-b border-slate-100">
                    <div className="text-left pl-2">{current.candidate}</div>
                    <div className="grid grid-cols-6 gap-1">
                      <div>Discovery</div>
                      <div>Pre-clinical</div>
                      <div>Phase 1</div>
                      <div>Phase 2</div>
                      <div>Phase 3</div>
                      <div>NDA/BLA</div>
                    </div>
                  </div>

                  {/* Row 1: KBB-N1 */}
                  <div className="grid grid-cols-[1.8fr_5.2fr] gap-4 items-center py-3 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div className="font-bold text-slate-800 text-sm pl-2">KBB-N1</div>
                    <PipelineSteps steps={[true, true, false, false, false, false]} colorClass="bg-sky-900" />
                  </div>

                  {/* Row 2: KBB-N2 */}
                  <div className="grid grid-cols-[1.8fr_5.2fr] gap-4 items-center py-3 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div className="font-bold text-slate-800 text-sm pl-2">KBB-N2</div>
                    <PipelineSteps steps={[true, true, false, false, false, false]} colorClass="bg-sky-900" />
                  </div>

                  {/* Row 3: KBB-CC/ADC */}
                  <div className="grid grid-cols-[1.8fr_5.2fr] gap-4 items-center py-3 hover:bg-slate-50/60 transition-colors rounded-lg px-2">
                    <div className="font-bold text-slate-800 text-sm pl-2">KBB-CC/ADC</div>
                    <PipelineSteps steps={[true, 'partial', false, false, false, false]} colorClass="bg-sky-900" />
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Global Partners / Collaborative Research Network */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">
            Collaborative Research Network
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-40 grayscale hover:opacity-80 transition-all duration-300">
            <span className="font-extrabold text-lg sm:text-2xl text-slate-700 tracking-wider">BIO LABS</span>
            <span className="font-extrabold text-lg sm:text-2xl text-slate-700 tracking-wider">GENE CORE</span>
            <span className="font-extrabold text-lg sm:text-2xl text-slate-700 tracking-wider">GLOBAL MED</span>
          </div>
        </div>
      </section>
    </div>
  );
}
