import React, { useState } from 'react';
import { ProductItem } from '../types';
import { Layers, ShieldCheck, Microscope, Flame, ShoppingBag, ArrowUpRight, HelpCircle, FileSpreadsheet, Hourglass, BookOpen } from 'lucide-react';
// @ts-ignore
import kbluebioImage from '../assets/images/kbluebio_poct_device_1782784235821.jpg';

interface ProductInformationProps {
  lang: 'ko' | 'en';
}

export default function ProductInformation({ lang }: ProductInformationProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'diagnostics' | 'nutraceuticals' | 'pipeline'>('all');

  const products: ProductItem[] = [
    {
      id: 'kbb-rnaseq',
      category: 'diagnostics',
      title: 'KBB-RNAseq NGS-Leukemia-PHB',
      subTitle: lang === 'ko' ? '백혈병 환자 미토콘드리아 RNA 발현량 스크리닝 패널' : 'Mitochondrial RNA profiling kit for acute leukemia',
      description: lang === 'ko' 
        ? '급성 골수성 백혈병(AML)을 포함한 혈액종양 환자의 미토콘드리아 전사체(Transcriptome)를 정량화 분석하여, 정밀 의학적 예후와 맞춤 치료 기회를 예측하는 NGS 동반진단 패널입니다.'
        : 'An NGS panel designed to quantify mitochondrial transcriptome changes in hematologic leukemia patients to estimate precision prognostic options.',
      features: lang === 'ko' ? [
        '미토콘드리아 유래 주요 RNA 발현량 정밀 정량화 분석',
        '의료 전문가를 위한 임상 유전학 판독 소프트웨어 기본 연동',
        '유전체 미소 결실 및 스플라이싱 패턴의 탁월한 변이 검출 능력',
        '엄격한 글로벌 의료기기 제조 품질 기준에 의거한 우수한 생산 공정'
      ] : [
        'Accurate quantification of mitochondrial-derived transcripts.',
        'Integrated clinical bioinformatics interpretation software.',
        'Superb sensitivity to small microdeletions & splice variations.',
        'Produced strictly under global medical device QA manufacturing standards.'
      ],
      specs: lang === 'ko' ? {
        '플랫폼': 'Illumina NextSeq / NovaSeq NGS 플랫폼 호환',
        '타겟 유전자': 'Mitochondrial Genome (MT-RNR, MT-CO1~3, MT-ATP6/8 등 37개 전체)',
        '필요 검체': '말초혈액(Whole Blood) 2mL 또는 골수액(Bone Marrow) 1mL',
        '분석 소요 시간': '라이브러리 제작부터 최종 리포트 출력까지 약 48시간'
      } : {
        'Platform': 'Compatible with Illumina NextSeq / NovaSeq Systems',
        'Target': '37 Genes across the entire mitochondrial genome',
        'Specimen': 'Whole Blood 2mL or Bone Marrow Aspirate 1mL',
        'Turnaround Time': 'approx. 48 hours from prep to report'
      },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYQShBc-5iRe5y_qqEttgaoKmx7Jsh3tlHmwBRwK_W5PYxbfvEYhlGE94RzhjXiMveVpmE5WOduJs43bB7RoXqGCBtKP_W6S3oVzqZrF8g6UtsN-2OcST6TlEvNFTbuopDMJEkTllzyTPdr3AgqzKNegm_vC-_lLpW7z7_caDCIFkuqJ6QEk2Nbrt9R7GGNkMCDMFzs7WyDl8kiWvuRnPRht5fPcAXqh5F3oyY9OfW5QMnVdC4g8i4KV64klRBuybvWjYaI2yJSIQ'
    },
    {
      id: 'kbb-dnaseq',
      category: 'diagnostics',
      title: 'KBB-DNAseq NGS-Leukemia-PHB',
      subTitle: lang === 'ko' ? '백혈병 미토콘드리아 DNA 점돌연변이 및 고유 헤테로플라스미 분석 패널' : 'Mitochondrial DNA variant & heteroplasmy analysis panel',
      description: lang === 'ko' 
        ? '미토콘드리아 고유 유전체(mtDNA)의 점돌연변이, 삽입/결실 및 미세 이종혼재성(Heteroplasmy) 비율을 정밀 해독하여 백혈병 발병 조기 진단 및 치료 저항성 인자를 검출하는 NGS 패널입니다.'
        : 'Pioneering NGS diagnostics evaluating point mutations, micro-insertions, deletions, and low-level heteroplasmy to detect leukemia resilience markers.',
      features: lang === 'ko' ? [
        '초고심도 시퀀싱(Deep Sequencing, >5000x)을 통한 1% 미만 저빈도 헤테로플라스미 완벽 해독',
        '고유의 인공지능 백동 판독 엔진을 통한 핵내 유사 위유전자(NUMTs) 간섭 배제',
        '유전 변이 데이터 자동 맵핑 및 가시화 임상 분석 레포트 자동 생성',
        '국내 주요 대학종양병원 다기관 임상 검증 통과 완료'
      ] : [
        'Super high-depth sequencing (>5000x) to accurately trace low-level (<1%) heteroplasmies.',
        'Filtered nuclear pseudogene (NUMTs) artifacts via proprietary AI mapping.',
        'Fully automated visualization and clinical decision support logs.',
        'Completed multicenter verification at major university clinics.'
      ],
      specs: lang === 'ko' ? {
        '시퀀싱 기법': 'Amplicon-based Ultra-Deep Target NGS Sequencing',
        '검출 범위': '16,569bp Mitochondrial Circular DNA Full Region Coverage',
        '분석 감도': '1% 소수 돌연변이 비율(Minor Heteroplasmy Ratio) 검출 한계 달성',
        '제조 품질': '우수 의약품/의료기기 제조 및 품질관리 기준 GMP 시설 생산'
      } : {
        'Technique': 'Amplicon-based Ultra-Deep Target NGS Sequencing',
        'Coverage': '100% of 16,569bp mitochondrial circular DNA',
        'Sensitivity': 'Detects down to 1.0% minor allele fraction',
        'Standards': 'GMP certified medical device manufacturing processes'
      },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAX6ieyTRs0UyOErmCF_fijS-_l7lwk_sz0zfa0uVZCW8foWc6dkYUVvUs5nInTSoSxeGzEj7iMa11uVX_v5j0K08WORc5NuClYBdXdywUaqD8KdjjYup2B6FHNX12JPrnhDAKegu9vl7zPZVamt7RuJv51aIg_I4W8gny1POBQFndCcVEtq37sjczrWncmO5Y4cx91xV1mxy3dAMIZCPPYWet8rtC3Vpzl5zqgtZeaJ434KXvdlFrpzw5ehN92uwiwj77w5MVaIg'
    },
    {
      id: 'compound-k',
      category: 'nutraceuticals',
      title: '초저분자 진세노사이드 컴파운드케이 (Compound K)',
      subTitle: lang === 'ko' ? '효소 분해 특허 기술로 체내 흡수율을 극대화한 프리미엄 컴파운드K' : 'Ultra-high absorption enzymatically bioconverted Ginsenoside',
      description: lang === 'ko' 
        ? '인삼 사포닌(진세노사이드)은 분자 크기가 커서 장내 유익균의 분해 효소가 부족한 한국인의 상당수가 제대로 흡수하지 못합니다. 케이블루바이오만의 완전 효소 생전환 공법으로 사포닌을 체내 흡수가 즉각 가능한 최종 대사산물인 "컴파운드케이" 형태로 가공하여, 일반 홍삼 대비 최대 15배 이상의 탁월한 속효성 면역 흡수율을 선사합니다.'
        : 'Ginsenoside saponins are naturally too bulky to be digested efficiently. We break down molecules into Compound K - the ultimate bioactive metabolite, generating up to 15x higher absorption.',
      features: lang === 'ko' ? [
        '케이블루바이오 독자 특허 생전환 분리 효소 특허 기술 적용',
        '잔류 용매나 보존료 없이 100% 국산 프리미엄 인삼 유래 활성 성분',
        '사포닌 유효 고형분 중 고순도 컴파운드K 대량 정제 기술 장착',
        '휴대가 간편하고 가볍게 섭취 가능한 스틱 젤리 및 액상 제형'
      ] : [
        'Proprietary patented microbial enzyme bioconversion technology.',
        '100% premium Korean ginseng extract; free from chemical preservatives.',
        'Industrial mass purification yielding highly pure bioactive saponins.',
        'Convenient portable pocket packaging.'
      ],
      specs: lang === 'ko' ? {
        '컴파운드K 함량': '1포(Stick)당 초저분자 활성 컴파운드K 고농축 배합',
        '추출 원료': '충청남도 금산 청정 지역 100% 6년근 수삼 추출물 활용',
        '인증 사항': '식약처 우수 건강기능식품 제조 기준(GMP) 지정 공장 제조',
        '추천 대상': '체력 저하가 극심한 수험생, 환후 회복기 면역 케어가 필요한 시니어층'
      } : {
        'Compound K Concentration': 'Highly enriched bio-active CK per single serve',
        'Raw Materials': '100% premium 6-year Korean Ginseng',
        'Certification': 'Manufactured in Ministry of Food and Drug Safety GMP Certified facilities',
        'Best For': 'Seniors, patients in recovery, and intensive fatigue relief'
      },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEtI4CdfIiZeeBA640WdKd4BMyamOrNaV3poVniaaomf4KiI1A4-AvEjbvb-eXu4Wx2-DCFk48A6va3okLBA8KqXhKlJPj1DQLNfmTwxRQdxi-VKCkp1cuQ6sNUmtA1CMpWC_7yU5ARiFCNKR6yqMK-cjB-qiZPsSC5hNxttg5vqpypuMNZLgGofzM4Cxx1HN0j7XVr-UosQGL9Tdh60tsIvOFJpKXhMGyiCfRAMAz440XcvQAM6ga9fyi4eYMkYIr4S9vNq6kKHc',
      purchaseLink: 'https://smartstore.naver.com/kbluebio/products/11521067442?nl-query=%EC%BC%80%EC%9D%B4%EB%B8%94%EB%A3%A8%EB%B0%94%EC%9D%B4%EC%98%A4&nl-ts-pid=jCTBNlqosZyzhLZHdsl-042803&NaPm=ct%3Dmr2pn3u8%7Cci%3Dbf62e237768f434fe1b3d65f36bf5600998d130d%7Ctr%3Dsls%7Csn%3D12043838%7Chk%3D83582889f8182a3b43638a03a1859616b0fba605',
      purchaseLinks: [
        {
          platform: 'naver',
          url: 'https://smartstore.naver.com/kbluebio/products/11521067442?nl-query=%EC%BC%80%EC%9D%B4%EB%B8%94%EB%A3%A8%EB%B0%94%EC%9D%B4%EC%98%A4&nl-ts-pid=jCTBNlqosZyzhLZHdsl-042803&NaPm=ct%3Dmr2pn3u8%7Cci%3Dbf62e237768f434fe1b3d65f36bf5600998d130d%7Ctr%3Dsls%7Csn%3D12043838%7Chk%3D83582889f8182a3b43638a03a1859616b0fba605'
        }
      ]
    },
    {
      id: 'prebiotics',
      category: 'nutraceuticals',
      title: '울트라 K-프리바이오틱스 (Ultra K-Prebiotics)',
      subTitle: lang === 'ko' ? '대사 대사체 환경을 활성화하는 유산균 프리미엄 포뮬러' : 'Advanced gut flora bio-activator formula',
      description: lang === 'ko' 
        ? '장내 대사 산물은 뇌 건강 및 전신 만성 염증 억제와 강력히 연계되어 있습니다. 기능성 프락토올리고당에 고에너지 유기대사 활성 아미노산을 복합 배합하여 유익균 증식 및 유해균 억제 작용을 동시에 유도합니다.'
        : 'Formulated with advanced fructooligosaccharides and essential organic metabolic boosters to expand beneficial microflora.',
      features: lang === 'ko' ? [
        '유익균의 영양 공급원인 고순도 프락토올리고당 및 식이섬유 충전',
        '미토콘드리아 에너지 증진을 지원하는 복합 미네랄 블렌드',
        '설탕, 합성 감미료, 인공 색소 무첨가 원칙 준수',
        '장 도달률을 높인 특수 코팅 마이크로 캡슐 유통 기술'
      ] : [
        'Premium Fructooligosaccharides supporting optimal probiotic proliferation.',
        'Mineral blend backing energetic bio-activity.',
        'Zero added sugar, synthetic sweeteners, or chemical additives.',
        'Acid-resistant micro-capsule delivery technology.'
      ],
      specs: lang === 'ko' ? {
        '주요 기능성 원료': '프락토올리고당, 셀레늄, 아연, 비타민 D',
        '섭취량': '1일 1회, 1회 1포(4g)를 충분한 물과 함께 섭취',
        '제조 규격': '식품의약품안전처 기능성 신고 완료 건강기능식품',
        '포장 규격': '4g x 30포 (1개월분 포장)'
      } : {
        'Active Ingredients': 'Fructooligosaccharides, Zinc, Selenium, Vitamin D',
        'Dosage': 'Take 1 sachet (4g) daily with water',
        'Standards': 'KFDA Functional Food notification completed',
        'Packaging': '4g x 30 sachets (1-month supply)'
      },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs1ydYddfWiXgd7TBA5_mT2GQ_c-tjwkfkp0uC1iF9vBV97NIdgzMVADB2vuIIXbo4TNF4PpIiblHwruGZqyBIuqL7hMU3gt29oZIN0BjOxwb2-oX6DtDcB1aH_9OmJIAOyp_d6SG3OryKp1eEP-8tOklZf4kFvqyGI-0W-9NjZThDFRsL98LOn34ayvzxSJRw2dokIoyWifCm5EiT9QtKb_ppH19OtFKZ6FxokdJ-qA2hToXLVeZI-x64FWQqDpUYXozri40lLmk',
      purchaseLink: 'https://smartstore.naver.com/kbluebio/products/11359794376?nl-query=%EC%BC%80%EC%9D%B4%EB%B8%94%EB%A3%A8%EB%B0%94%EC%9D%B4%EC%98%A4&nl-ts-pid=jCTBNlqosZyzhLZHdsl-042803&NaPm=ct%3Dmr2pn1iw%7Cci%3Dbf282a054c99a40a7e938cb7164390e58079a5de%7Ctr%3Dsls%7Csn%3D12043838%7Chk%3D8b7d77c56395c29226dd1e368d8af8b24a49b329',
      purchaseLinks: [
        {
          platform: 'naver',
          url: 'https://smartstore.naver.com/kbluebio/products/11359794376?nl-query=%EC%BC%80%EC%9D%B4%EB%B8%94%EB%A3%A8%EB%B0%94%EC%9D%B4%EC%98%A4&nl-ts-pid=jCTBNlqosZyzhLZHdsl-042803&NaPm=ct%3Dmr2pn1iw%7Cci%3Dbf282a054c99a40a7e938cb7164390e58079a5de%7Ctr%3Dsls%7Csn%3D12043838%7Chk%3D8b7d77c56395c29226dd1e368d8af8b24a49b329'
        },
        {
          platform: 'coupang',
          url: 'https://www.coupang.com/vp/products/8596994295?itemId=24927446830&vendorItemId=91894348931&src=1032001&spec=10305199&addtag=400&ctag=8596994295&lptag=I24927446830&itime=20260702140155&pageType=PRODUCT&pageValue=8596994295&wPcid=17606822289577551491847&wRef=cr.shopping.naver.com&wTime=20260702140155&redirect=landing&mcid=01f3043d5a8f40869822dee35d537fc4&n_keyword=&n_ad_group=&n_ad=&n_rank=&n_keyword_id=&n_media=&n_campaign_type=&n_query='
        }
      ]
    },
    {
      id: 'creacare-poct',
      category: 'pipeline',
      title: lang === 'ko' ? 'KBB-Diagnostics : 혈중 Creatinine POCT' : 'KBB-Diagnostics : Blood Creatinine POCT',
      subTitle: lang === 'ko' 
        ? '조영제 전신독성 예방 및 신속한 신장 기능 평가를 위한 현장진단 시스템' 
        : 'Point-of-Care Testing (POCT) System for Rapid Kidney Function Assessment',
      description: lang === 'ko'
        ? '조영제 사용 CT 촬영 환자, 항암치료 암환자, 응급실 방문 환자, 신장질환 환자 등 신속한 신장 기능 평가가 절실한 의료 환경을 타깃으로 하는 혁신적인 혈중 크레아티닌(Creatinine) 현장 검사(POCT) 시스템입니다. 독자적인 이중 패드 정량법(Dual-Pad Subtraction Method)을 통해 간섭 물질을 원천 배제하고, 차별화된 플라즈몬 산란(Plasmonic Scattering) 기술을 결합하여 중앙검사실 수준의 압도적인 정확도를 구현합니다. 현재 시제품 개발이 완료되었으며 본격적인 임상시험을 준비하고 있습니다.'
        : 'An innovative blood creatinine point-of-care testing (POCT) system designed for clinical environments requiring rapid renal assessment (CT scan users, chemotherapy oncology patients, ER visitors, and kidney disease patients). It eliminates blood interfering substances through a unique Dual-Pad Subtraction Method and integrates plasmonic scattering to secure central-laboratory-grade precision. Prototype development is completed, with clinical trials currently in preparation.',
      features: lang === 'ko' ? [
        '독자적 이중 패드 정량법: 제1반응패드(Creatinine+Creatine)와 제2반응패드(Creatine) 차등 연산으로 혈액 내 간섭물질 배제',
        '독보적인 정밀도 구현: 혁신적인 플라즈몬 산란(Plasmonic scattering) 나노 센싱 메커니즘 접목',
        '획기적인 시간 단축: 기존 병원 중앙검사실 확인 시간(1시간 30분 이상 소요)을 단 몇 분 내외로 단축',
        '전략적 사업화 가치: 항암 치료 및 조영제 전신독성 모니터링 시장 선점 및 신약 개발 장기 레이스를 지탱할 조기 캐시플로우 확보 가능'
      ] : [
        'Dual-Pad Subtraction Method: Fully resolves chemical interference by subtracting creatine-only pad signals from the dual-reaction pad.',
        'Plasmonic Scattering Technology: Harnesses advanced plasmonic nanostructure scattering for high-accuracy optical detection.',
        'Rapid Turnaround Time: Slashes traditional 1.5-hour central laboratory waiting delays down to minutes at the patient\'s side.',
        'High Commercial Valuation: Addresses clear clinical bottlenecks in oncology and CT suites, paving a reliable revenue stream during oncology drug pipelines.'
      ],
      specs: lang === 'ko' ? {
        '분석 시스템': 'KBlueBio Detector (현장 신속 정량 분석기, 충전식 리튬이온 배터리 탑재)',
        '전용 스트립': 'KBlueBio Strip (미세유체 채널 및 고정밀 광다이오드 센서 결합 일회용 스트립)',
        '검출 대상': '혈중 크레아티닌 (Blood Creatinine) 수치 정량 분석',
        '현재 개발단계': '시제품 개발 완료 (Prototype Completed) 및 임상시험 계획 승인 대기 단계'
      } : {
        'Device System': 'KBlueBio Detector (Portable quantitative analyzer with built-in rechargeable battery)',
        'Disposable Strip': 'KBlueBio Strip (Single-use strip with microfluidic channels & photodiode interface)',
        'Target Analyte': 'Quantitative measurement of blood creatinine concentration',
        'Development Status': 'Prototype development completed & preparing clinical trials'
      },
      image: kbluebioImage,
      relatedPaper: {
        titleKo: '신속 및 저비용 현장진단 크레아티닌 정량을 위한 종이 기반 이중 패드 효소 센서 개발',
        titleEn: 'A paper-based dual-pad enzymatic sensor for rapid and low-cost point-of-care creatinine quantification',
        link: 'https://doi.org/10.1016/j.snb.2026.140336'
      }
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Visual Header */}
      <div className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-blue-950/45 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {lang === 'ko' ? '제품 정보' : 'Product Information'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
            {lang === 'ko' 
              ? '혁신 신약 개발의 핵심 소재가 되는 뉴트라슈티컬과 고정밀 현장진단 및 정밀의료 솔루션' 
              : 'Nutraceuticals as core candidate materials for innovative drug discovery, alongside high-precision POCT and precision medicine solutions.'}
          </p>
        </div>
      </div>

      {/* 1. Category Switch Tabs */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 border border-slate-200/50 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'bg-white text-[#0a2d74] shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {lang === 'ko' ? '전체 보기' : 'Show All'}
            </button>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'diagnostics' 
                  ? 'bg-white text-sky-600 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {lang === 'ko' ? '정밀 진단 제품' : 'Clinical Diagnostics'}
            </button>
            <button
              onClick={() => setActiveTab('nutraceuticals')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'nutraceuticals' 
                  ? 'bg-white text-teal-600 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {lang === 'ko' ? '뉴트라슈티컬' : 'Nutraceuticals'}
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'pipeline' 
                  ? 'bg-white text-amber-600 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {lang === 'ko' ? '개발 진행 중' : 'Under Development'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Detailed Product Cards Block */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredProducts.map((prod, idx) => (
            <div 
              key={prod.id} 
              id={prod.id}
              className="bg-white rounded-2xl border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              
              {/* Product Visual Container (Top, horizontally long, uncropped) */}
              <div className="relative w-full aspect-16/9 md:aspect-21/9 bg-slate-100 flex items-center justify-center p-6 sm:p-10 md:p-12 border-b border-slate-100 overflow-hidden">
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  className="max-w-full max-h-[320px] sm:max-h-[400px] md:max-h-[450px] w-auto h-auto object-contain transform hover:scale-[1.015] transition-transform duration-500 rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <span className={`absolute top-6 left-6 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white shadow-sm ${
                  prod.category === 'diagnostics' 
                    ? 'bg-sky-600' 
                    : prod.category === 'pipeline'
                    ? 'bg-amber-600 animate-pulse'
                    : 'bg-teal-600'
                }`}>
                  {prod.category === 'diagnostics' 
                    ? (lang === 'ko' ? '정밀 진단 키트' : 'Clinical NGS') 
                    : prod.category === 'pipeline'
                    ? (lang === 'ko' ? '개발 진행 중' : 'Under Development')
                    : (lang === 'ko' ? '뉴트라슈티컬' : 'Nutraceuticals')}
                </span>
              </div>

              {/* Product Specs & Narrative (Bottom, text below the photo) */}
              <div className="p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                    {prod.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-sky-600 mb-6 leading-relaxed">
                    {prod.subTitle}
                  </p>
                  
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8 border-l-4 border-slate-200 pl-4">
                    {prod.description}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                    {/* Key Features Bullet list */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase mb-4 flex items-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5 flex-shrink-0" />
                        <span>{lang === 'ko' ? '핵심 기술 특장점' : 'Key Technology Benefits'}</span>
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600 leading-relaxed font-normal">
                        {prod.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-2.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Specifications Grid */}
                    <div className="border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
                      <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase mb-4 flex items-center">
                        <FileSpreadsheet className="w-4 h-4 text-slate-400 mr-1.5 flex-shrink-0" />
                        <span>{lang === 'ko' ? '제품 상세 규격' : 'Specifications'}</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                        {Object.entries(prod.specs).map(([key, value]) => (
                          <div key={key} className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-100">
                            <span className="block font-bold text-slate-400 mb-1">{key}</span>
                            <span className="block font-semibold text-slate-800 leading-normal">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {((prod.purchaseLinks && prod.purchaseLinks.length > 0) || prod.purchaseLink) && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <div className="bg-teal-50/40 border border-teal-100/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3.5">
                          <div className="p-2.5 bg-teal-500 text-white rounded-lg shadow-xs">
                            <ShoppingBag className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight">
                              {lang === 'ko' ? '공식 판매처 안내' : 'Official Purchase Channel'}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 font-medium">
                              {lang === 'ko' 
                                ? '공식 스마트스토어 및 제휴 온라인몰에서 편리하게 구매하실 수 있습니다.' 
                                : 'Available for purchase on our official Naver Smartstore or partner online malls.'}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                          {prod.purchaseLinks && prod.purchaseLinks.length > 0 ? (
                            prod.purchaseLinks.map((link) => {
                              const isNaver = link.platform === 'naver';
                              const btnColor = isNaver 
                                ? 'bg-[#03C75A] hover:bg-[#02b351] active:bg-[#029e47] text-white' 
                                : 'bg-[#E52521] hover:bg-[#cb1f1b] active:bg-[#b01613] text-white';
                              const label = isNaver 
                                ? (lang === 'ko' ? '네이버 스마트스토어' : 'Naver Smartstore')
                                : (lang === 'ko' ? '쿠팡 구매하기' : 'Buy on Coupang');
                              
                              return (
                                <a
                                  key={link.platform}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all w-full sm:w-auto text-center cursor-pointer ${btnColor}`}
                                >
                                  <span>{label}</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </a>
                              );
                            })
                          ) : (
                            <a
                              href={prod.purchaseLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#03C75A] hover:bg-[#02b351] active:bg-[#029e47] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all w-full sm:w-auto text-center cursor-pointer"
                            >
                              <span>{lang === 'ko' ? '네이버 스마트스토어' : 'Buy Now'}</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {prod.relatedPaper && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 text-sky-500 mr-1.5 flex-shrink-0" />
                        <span>{lang === 'ko' ? '관련 논문' : 'Related Publication'}</span>
                      </h3>
                      <div className="bg-sky-50/35 border border-sky-100/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-extrabold text-slate-800 tracking-tight leading-snug">
                            {lang === 'ko' ? prod.relatedPaper.titleKo : prod.relatedPaper.titleEn}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 font-semibold">
                            Sensors and Actuators B: Chemical (Elsevier, Q1 / IF: 8.4)
                          </p>
                        </div>
                        <a
                          href={prod.relatedPaper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-xs font-extrabold border border-sky-100 transition-colors w-full sm:w-auto text-center"
                        >
                          <span>{lang === 'ko' ? '논문 바로가기' : 'View Publication'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
