import React from 'react';
import { TimelineEvent, StatItem } from '../types';
import { ShieldCheck, Award, Users, TrendingUp, ChevronRight, Briefcase, Award as AwardIcon, GraduationCap, Microscope, Dna } from 'lucide-react';
const ceoImgUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Nd-AmJizBN0WL9EyPZKREeE6LkQdeppdHBk2yVaJWBQVKEdfdZbRaPNe6D9aSqZOkQBpC8aZmoXeRiujfalJzNtnCkL9D_FB_BH4uJdNG2jXTgx6qh84SeF0wHoSqUCL2epCtMQF_-zrAVgtZQrwizakyHPA9s8s6UJ6VybD8oS97DS_O3hgTwlHyL5HzwQwffQn8xJU0fXP6BLD_H0IeQ-C2h6d4iAaLIntE86IPPWmU60x8FVB4RzyXgM-dXcGoewhAFWGHbs';

interface CompanyIntroductionProps {
  lang: 'ko' | 'en';
}

export default function CompanyIntroduction({ lang }: CompanyIntroductionProps) {

  const stats: StatItem[] = [
    { 
      value: '12+', 
      label: '보유 특허 및 인증', 
      enLabel: 'Patents & Certificates',
      description: lang === 'ko' ? '국내외 미토콘드리아 분석 특허 보유' : 'Domestic and global patents.'
    },
    { 
      value: '10+', 
      label: '석/박사급 연구진', 
      enLabel: 'Ph.D & Master Researchers',
      description: lang === 'ko' ? '임상 의학 및 바이오 전문가 그룹' : 'Clinical medicine and bioinformatics specialists.'
    },
    { 
      value: '8', 
      label: '글로벌 파트너사', 
      enLabel: 'Global Partners',
      description: lang === 'ko' ? '해외 주요 연구소 및 유통 채널' : 'Major overseas research labs & distributors.'
    },
    { 
      value: '150%', 
      label: '연평균 평균 성장률', 
      enLabel: 'CAGR Growth Rate',
      description: lang === 'ko' ? '미래 바이오 산업 트렌드 주도' : 'Leading the future biotechnology trends.'
    },
  ];

  const timeline: TimelineEvent[] = [
    {
      year: '2025',
      milestones: lang === 'ko' ? [
        '전남테크노파크 지역수요맞춤형 연구개발지원사업 선정'
      ] : [
        'Selected for the Jeonnam Technopark Region-Customized R&D Support Project'
      ]
    },
    {
      year: '2024',
      milestones: lang === 'ko' ? [
        '산자부 기능성 바이오 소재 지원사업 선정',
        '중기부 디딤돌(도약 글로벌 R&D) 사업 선정'
      ] : [
        'Selected for the MOTIE Functional Bio-material Support Project',
        'Selected for the MSS Stepping Stone (Leap-forward Global R&D) Project'
      ]
    },
    {
      year: '2023',
      milestones: lang === 'ko' ? [
        '벤처기업 재인증 획득',
        'KBB 프리미엄 진세노사이드 출시',
        '대구경북첨단의료산업진흥재단 사업 선정',
        '전남테크노파크 사업 선정'
      ] : [
        'Re-certified as a Venture Company',
        'Launched KBB Premium Ginsenocides',
        'Selected for the Daegu-Gyeongbuk Medical Innovation Foundation Project',
        'Selected for the Jeonnam Technopark Project'
      ]
    },
    {
      year: '2022',
      milestones: lang === 'ko' ? [
        '전라남도 웰에이징 사업 선정',
        'NGS DNAseq 패널 출시',
        '중기부 디딤돌 사업 & 전남테크노파크 사업 선정',
        '후속 투자 유치 (11억여 원)',
        '전남 스타트업 기술사업화 지원사업 선정'
      ] : [
        'Selected for the Jeollanam-do Well-Aging Support Project',
        'Launched NGS DNAseq panel',
        'Selected for the MSS Stepping Stone Project & Jeonnam Technopark Project',
        'Secured follow-on investment (~1.1 billion KRW)',
        'Selected for the Jeollanam-do Startup Technology Commercialization Support Project'
      ]
    },
    {
      year: '2021',
      milestones: lang === 'ko' ? [
        'TECH밸리 기업 선정 & 벤처기업인증 획득',
        '엔젤투자 유치 (5억여 원)',
        'NGS RNAseq 패널 최초 출시',
        '기업부설 연구전담부서 설립',
        '전남 스타트업 기술사업화 지원사업 선정'
      ] : [
        'Selected as a TECH Valley Company & Acquired Venture Company Certification',
        'Secured angel investment (~500 million KRW)',
        'Launched the first NGS RNAseq panel',
        'Established Corporate Research & Development Department',
        'Selected for the Jeollanam-do Startup Technology Commercialization Support Project'
      ]
    },
    {
      year: '2020',
      milestones: lang === 'ko' ? [
        '케이블루바이오(주) 설립',
        '전라남도 스타트업 기술사업화 지원사업 선정'
      ] : [
        'Established KBlueBio Co., Ltd.',
        'Selected for the Jeollanam-do Startup Technology Commercialization Support Project'
      ]
    }
  ];

  const advisors = [
    {
      nameKo: '박광수 M.D., Ph.D.',
      nameEn: 'Kwang-Soo Park M.D., Ph.D.',
      titleKo: '진단검사의학 전문의',
      titleEn: 'Specialist in Laboratory Medicine',
      specialtyKo: 'AI 기반 정밀의료 플랫폼 개발',
      specialtyEn: 'AI-based Precision Medicine Platform Development',
      initials: '박',
      engInitials: 'KP'
    },
    {
      nameKo: '이제중 M.D., Ph.D.',
      nameEn: 'Je-Jung Lee M.D., Ph.D.',
      titleKo: '화순전남대학교병원 혈액종양내과 교수',
      titleEn: 'Professor of Hematology-Oncology, Chonnam National University Hwasun Hospital',
      specialtyKo: '난치 혈액암 임상시험',
      specialtyEn: 'Clinical Trials for Refractory Hematologic Malignancies',
      initials: '이',
      engInitials: 'JL'
    },
    {
      nameKo: '김형준 M.D., Ph.D.',
      nameEn: 'Hyoung-June Kim M.D., Ph.D.',
      titleKo: '화순전남대학교병원 혈액종양내과 교수',
      titleEn: 'Professor of Hematology-Oncology, Chonnam National University Hwasun Hospital',
      specialtyKo: '난치 혈액암 임상시험',
      specialtyEn: 'Clinical Trials for Refractory Hematologic Malignancies',
      initials: '김',
      engInitials: 'HK'
    },
    {
      nameKo: '최종락 M.D., Ph.D.',
      nameEn: 'Jong-Rak Choi M.D., Ph.D.',
      titleKo: '연세의대 세브란스 교수',
      titleEn: 'Professor, Yonsei University College of Medicine & Severance Hospital',
      specialtyKo: '정밀의료 분자진단 개발',
      specialtyEn: 'Precision Medicine & Molecular Diagnostics Development',
      initials: '최',
      engInitials: 'JC'
    },
    {
      nameKo: '최석용 M.D., Ph.D.',
      nameEn: 'Seok-Yong Choi M.D., Ph.D.',
      titleKo: '전남대학교 의과대학 의생명과학 교수',
      titleEn: 'Professor of Biomedical Sciences, Chonnam National University Medical School',
      specialtyKo: '항암 유효물질 독성평가',
      specialtyEn: 'Toxicity Evaluation of Anticancer Active Substances',
      initials: '최',
      engInitials: 'SC'
    },
    {
      nameKo: '안진희 Ph.D.',
      nameEn: 'Jin-Hee Ahn Ph.D.',
      titleKo: '광주과학기술원 의학화학 교수',
      titleEn: 'Professor of Medicinal Chemistry, Gwangju Institute of Science and Technology (GIST)',
      specialtyKo: '항암 유효물질 합성 및 발굴',
      specialtyEn: 'Synthesis & Discovery of Anticancer Lead Compounds',
      initials: '안',
      engInitials: 'JA'
    },
    {
      nameKo: '박춘구 Ph.D.',
      nameEn: 'Choon-Koo Park Ph.D.',
      titleKo: '전남대학교 생명과학기술학부 교수',
      titleEn: 'Professor, School of Biological Sciences & Technology, Chonnam National University',
      specialtyKo: 'In Silico 기반 유효물질 발굴',
      specialtyEn: 'In Silico-based Active Substance Discovery',
      initials: '박',
      engInitials: 'CP'
    },
    {
      nameKo: '김기택 Ph.D.',
      nameEn: 'Ki-Tack Kim Ph.D.',
      titleKo: '목포대학교 약학대학 약학과 교수',
      titleEn: 'Professor, College of Pharmacy, Mokpo National University',
      specialtyKo: '약물최적화 제형개발 및 임상약동학',
      specialtyEn: 'Drug Optimization Formulation Development & Clinical Pharmacokinetics',
      initials: '김',
      engInitials: 'KK'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Visual Header */}
      <div className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-blue-950/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {lang === 'ko' ? '회사 소개' : 'About Us'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-medium">
            {lang === 'ko' 
              ? '생명의 근원인 미토콘드리아에서 난치성 질환의 새로운 돌파구를 찾습니다.' 
              : 'Finding a breakthrough in intractable diseases through mitochondrial genome secrets.'}
          </p>
        </div>
      </div>

      {/* 1. CEO Message Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-6">
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase bg-sky-50 px-3 py-1.5 rounded-full self-start">
              CEO Message
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2d5a] tracking-tight leading-tight whitespace-pre-line">
              {lang === 'ko' ? (
                `신뢰를 바탕으로 한
                지속 가능한 성장`
              ) : (
                `Sustainable Growth
                Based on Trust`
              )}
            </h2>
            
            <div className="text-sm sm:text-[15px] text-slate-600 space-y-4 leading-relaxed font-normal">
              {lang === 'ko' ? (
                <>
                  <p>
                    안녕하십니까, KBlueBio를 아끼주시는 모든 분들께 깊은 감사를 드립니다.
                  </p>
                  <p>
                    저희 KBlueBio는 바이오 테크놀로지의 무한한 가능성을 현실로 바꾸기 위해 설립되었습니다. 단순한 기술 개발을 넘어, 인간의 생명 연장과 질병 극복이라는 숭고한 가치를 실현하기 위해 매 순간 연구에 매진하고 있습니다.
                  </p>
                  <p>
                    30년 임상 현장에서 얻은 통찰을 바탕으로, 치료가 오히려 환자를 위협하는 고령 난치암 치료의 딜레마를 극복하고자 합니다. 독창적인 R&D 프로세스를 통해 전 세계 의료시장에서 인정받는 혁신적인 바이오 솔루션을 선보이겠습니다.
                  </p>
                  <p>
                    앞으로도 KBlueBio는 투명한 경영과 끊임없는 도전을 통해 의료·바이오 산업의 새로운 이정표를 세울 것을 약속드립니다. 여러분의 변함없는 성원과 관심을 부탁드립니다.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Dear Valued Partners and Friends, I would like to express my deepest gratitude to all of you who support KBlueBio.
                  </p>
                  <p>
                    KBlueBio was established to transform the infinite possibilities of biotechnology into reality. Going beyond simple technology development, we are dedicated to research at every moment to realize the noble value of extending human life and overcoming disease.
                  </p>
                  <p>
                    Based on 30 years of clinical insight, we aim to overcome the clinical dilemma in geriatric refractory cancer care, where treatment can sometimes threaten the patient’s well-being. Through our unique R&D process, we strive to deliver innovative bio-solutions recognized in the global medical market.
                  </p>
                  <p>
                    We promise that KBlueBio will establish a new milestone in the medical and biotechnology industries through transparent management and continuous challenges. We ask for your unchanging support and interest.
                  </p>
                </>
              )}
            </div>

            {/* CEO Signature */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <div className="text-right">
                <div className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">KBlueBio CEO</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-0.5">{lang === 'ko' ? '신명근 올림' : 'Shin Myung-geun'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Section */}
      <section className="py-20 bg-slate-100 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-xs text-center flex flex-col justify-center">
                <span className="text-4xl font-extrabold text-sky-600 block mb-2 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-bold text-slate-800 block mb-1">
                  {lang === 'ko' ? stat.label : stat.enLabel}
                </span>
                <span className="text-xs text-slate-400 block leading-normal">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. History Timeline Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-sky-600 uppercase mb-3">Our Journey</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'ko' ? 'KBlueBio 연혁' : 'Company History'}
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32">
            {timeline.map((event, idx) => (
              <div key={idx} className="mb-12 relative pl-6">
                {/* Year Badge absolute position */}
                <div className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-sky-50 border-2 border-sky-600 flex items-center justify-center z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                </div>
                
                <div className="md:absolute md:-left-32 md:top-1.5 md:w-24 text-left md:text-right font-extrabold text-xl text-sky-600 font-display">
                  {event.year}
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-2xs">
                  <ul className="space-y-2.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {event.milestones.map((milestone, mIdx) => (
                      <li key={mIdx} className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Organization Chart Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-[#002b66] uppercase mb-3">Structure</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'ko' ? '조직 구성도' : 'Organization Chart'}
            </p>
          </div>

          {/* Horizontal scroll support on mobile to preserve layout integrity */}
          <div className="w-full overflow-x-auto pb-12 pt-6 scrollbar-thin scrollbar-thumb-slate-300">
            <div className="min-w-[1000px] px-8 flex flex-col items-center">
              
              {/* 1. Representative Director (대표이사) */}
              <div className="relative flex justify-center w-full">
                <div className="bg-[#0a2d74] text-white px-24 py-5 rounded-2xl font-extrabold text-center border border-[#09245c] shadow-md text-base tracking-widest z-10 min-w-[300px] hover:shadow-lg transition-all duration-300">
                  <div className="text-[10px] text-sky-300 uppercase tracking-widest mb-1 font-medium">{lang === 'ko' ? '최고 경영진' : 'Executive Leadership'}</div>
                  <div className="text-base sm:text-lg">{lang === 'ko' ? '대표이사' : 'Representative Director / CEO'}</div>
                </div>
              </div>

              {/* 2. Middle connectors & Floating Offices (경영지원실 & 기업부설연구소) */}
              <div className="relative w-full h-36 flex justify-center">
                {/* Central Vertical Connector Line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-slate-300" />

                {/* Right Branch - Corporate Research Institute (기업부설연구소) */}
                <div className="absolute left-[50%] right-[calc(50%-180px)] top-[90px] h-[1px] bg-slate-300" />
                <div className="absolute left-[calc(50%+180px)] top-[67px] z-10">
                  <div className="px-8 py-4.5 bg-white hover:bg-slate-50 transition-colors duration-200 rounded-xl border border-slate-200 text-slate-900 font-extrabold text-sm shadow-xs text-center min-w-[200px]">
                    <div>{lang === 'ko' ? '기업부설연구소' : 'Corporate Research Institute'}</div>
                  </div>
                </div>

                {/* Left Branch - Management Support Office (경영지원실) */}
                <div className="absolute right-[50%] left-[calc(50%-180px)] top-[45px] h-[1px] bg-slate-300" />
                <div className="absolute right-[calc(50%+180px)] top-[22px] z-10">
                  <div className="px-8 py-4.5 bg-white hover:bg-slate-50 transition-colors duration-200 rounded-xl border border-slate-200 text-slate-900 font-extrabold text-sm shadow-xs text-center min-w-[200px]">
                    <div>{lang === 'ko' ? '경영지원실' : 'Management Support Office'}</div>
                  </div>
                </div>
              </div>

              {/* 3. Vertical Connector to Bottom Split Line */}
              <div className="w-[1px] h-10 bg-slate-300 relative" />

              {/* 4. Bottom Grid & Horizontal Split Connector Lines */}
              <div className="relative w-full pt-8">
                {/* Horizontal Connector Line */}
                <div className="absolute left-[12.5%] right-[12.5%] top-0 h-[1px] bg-slate-300" />

                {/* Vertical Drop Lines */}
                <div className="absolute left-[12.5%] top-0 w-[1px] h-8 bg-slate-300" />
                <div className="absolute left-[37.5%] top-0 w-[1px] h-8 bg-slate-300" />
                <div className="absolute left-[62.5%] top-0 w-[1px] h-8 bg-slate-300" />
                <div className="absolute left-[87.5%] top-0 w-[1px] h-8 bg-slate-300" />

                {/* 4 Columns for Teams */}
                <div className="grid grid-cols-4 gap-6 w-full">
                  
                  {/* Column 1: AI 의료연구개발팀 */}
                  <div className="flex flex-col items-center">
                    <div className="bg-[#0a2d74] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-center border border-[#08255e] shadow-xs tracking-tight w-[92%] z-10 min-h-[48px] flex items-center justify-center">
                      {lang === 'ko' ? 'AI 의료연구개발팀' : 'AI Medical Solutions R&D'}
                    </div>
                    <div className="w-[1px] h-5 bg-slate-300" />
                    <div className="bg-white hover:border-sky-300 border border-slate-200 rounded-2xl p-6 w-[92%] min-h-[220px] shadow-xs hover:shadow-md transition-all duration-300">
                      <ul className="space-y-3.5 text-xs text-slate-600 font-semibold leading-relaxed text-left pl-1">
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                          <span>AI-CRO (Contract Research Organization)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                          <span>KBB-ATLAS (AI-guided Targeting and Lead Analysis System)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                          <span>KBB-NARES (NGS AI Reporting System)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Column 2: 혁신신약 연구개발팀 */}
                  <div className="flex flex-col items-center">
                    <div className="bg-[#0a2d74] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-center border border-[#08255e] shadow-xs tracking-tight w-[92%] z-10 min-h-[48px] flex items-center justify-center">
                      {lang === 'ko' ? '혁신신약 연구개발팀' : 'Innovative Drug R&D'}
                    </div>
                    <div className="w-[1px] h-5 bg-slate-300" />
                    <div className="bg-white hover:border-sky-300 border border-slate-200 rounded-2xl p-6 w-[92%] min-h-[220px] shadow-xs hover:shadow-md transition-all duration-300">
                      <ul className="space-y-3.5 text-xs text-slate-600 font-semibold leading-relaxed text-left pl-1">
                        {lang === 'ko' ? (
                          <>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>동반진단표지자 발굴</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>유효·선도물질 발굴·합성</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>뉴트라슈티컬 기획·연구개발</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>개별인정형소재 발굴·연구</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>Companion Biomarker Discovery</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>Lead Compound Synthesis</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>Nutraceutical Planning & R&D</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>Functional Material Discovery</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Column 3: 정밀진단연구개발팀 */}
                  <div className="flex flex-col items-center">
                    <div className="bg-[#0a2d74] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-center border border-[#08255e] shadow-xs tracking-tight w-[92%] z-10 min-h-[48px] flex items-center justify-center">
                      {lang === 'ko' ? '정밀진단연구개발팀' : 'Precision Diagnostics R&D'}
                    </div>
                    <div className="w-[1px] h-5 bg-slate-300" />
                    <div className="bg-white hover:border-sky-300 border border-slate-200 rounded-2xl p-6 w-[92%] min-h-[220px] shadow-xs hover:shadow-md transition-all duration-300">
                      <ul className="space-y-3.5 text-xs text-slate-600 font-semibold leading-relaxed text-left pl-1">
                        {lang === 'ko' ? (
                          <>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>신속진단 플랫폼</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>차세대유전체분석패널</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>Rapid Diagnostic Platform</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>Next-Gen Genomic Panel</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Column 4: 비임상/임상시험팀 */}
                  <div className="flex flex-col items-center">
                    <div className="bg-[#0a2d74] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-center border border-[#08255e] shadow-xs tracking-tight w-[92%] z-10 min-h-[48px] flex items-center justify-center">
                      {lang === 'ko' ? '비임상/임상시험팀' : 'Non-clinical/Clinical Trials'}
                    </div>
                    <div className="w-[1px] h-5 bg-slate-300" />
                    <div className="bg-white hover:border-sky-300 border border-slate-200 rounded-2xl p-6 w-[92%] min-h-[220px] shadow-xs hover:shadow-md transition-all duration-300">
                      <ul className="space-y-3.5 text-xs text-slate-600 font-semibold leading-relaxed text-left pl-1">
                        {lang === 'ko' ? (
                          <>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>비임상시험</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>임상시험</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>Non-clinical Trial</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 mr-2.5 shrink-0" />
                              <span>Clinical Trial</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. Scientific Advisory Board Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-[#0a2d74] uppercase mb-3">Advisors</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'ko' ? '과학기술 자문위원' : 'Scientific Advisory Board'}
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              {lang === 'ko' 
                ? '미토콘드리아 및 정밀의료 혁신을 위해 각 분야 최고의 임상 의학 및 바이오 전문가 그룹이 함께합니다.'
                : 'A group of leading clinical medicine and biotechnology experts collaborates to drive mitochondrial and precision medicine innovation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {advisors.map((advisor, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-3xs hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Monogram & Profile info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-11 h-11 rounded-full bg-slate-50 text-[#0a2d74] border border-slate-100 flex items-center justify-center shrink-0 font-extrabold text-xs sm:text-sm group-hover:bg-sky-50 group-hover:border-sky-100 transition-colors duration-300">
                      {lang === 'ko' ? advisor.initials : advisor.engInitials}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                        {lang === 'ko' ? advisor.nameKo : advisor.nameEn}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-snug mt-1">
                        {lang === 'ko' ? advisor.titleKo : advisor.titleEn}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-slate-100 my-4" />
                </div>

                {/* Bottom: Specialty block */}
                <div className="bg-sky-50/40 rounded-xl p-3.5 border border-sky-100/20 group-hover:bg-sky-50/60 transition-colors duration-300">
                  <div className="text-[10px] text-sky-600 uppercase tracking-widest font-bold mb-1.5 flex items-center">
                    <Microscope className="w-3.5 h-3.5 mr-1.5 text-sky-500 shrink-0" />
                    <span>{lang === 'ko' ? '주요 자문 분야' : 'Advisory Focus'}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                    {lang === 'ko' ? advisor.specialtyKo : advisor.specialtyEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
