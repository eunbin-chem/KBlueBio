import React, { useEffect, useState } from 'react';
import { NewsPost } from '../types';
import { Search, Eye, Calendar, X, Plus, Trash2, Paperclip, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CompanyNewsProps {
  lang: 'ko' | 'en';
}

export default function CompanyNews({ lang }: CompanyNewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'notice' | 'press' | 'disclosure' | 'ir'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  // Persistence States
    const [customNews, setCustomNews] = useState<NewsPost[]>([]);
  const [deletedPostIds, setDeletedPostIds] = useState<number[]>([]);

  useEffect(() => {
    const loadSupabaseData = async () => {
      const { data: newsData, error: newsError } = await supabase
        .from('company_news')
        .select('*')
        .order('date', { ascending: false });

      if (newsError) {
        console.error('Failed to load company news:', newsError);
      } else {
        setCustomNews(
          (newsData || []).map((item) => ({
            id: Number(item.id),
            category: item.category,
            title: item.title,
            author: item.author,
            date: item.date,
            views: item.views,
            content: item.content,
            files: item.files || [],
            isCustom: item.is_custom,
          }))
        );
      }

      const { data: deletedData, error: deletedError } = await supabase
        .from('deleted_news_ids')
        .select('id');

      if (deletedError) {
        console.error('Failed to load deleted news ids:', deletedError);
      } else {
        setDeletedPostIds((deletedData || []).map((item) => Number(item.id)));
      }
    };

    loadSupabaseData();
  }, []);


  // Modal & Form States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const [newPostCategory, setNewPostCategory] = useState<'notice' | 'press' | 'disclosure' | 'ir'>('notice');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostDate, setNewPostDate] = useState('');
  const [newPostFiles, setNewPostFiles] = useState<{ name: string; size: number; url: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelection = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setNewPostFiles(prev => {
          if (prev.some(f => f.name === file.name && f.size === file.size)) return prev;
          return [...prev, { name: file.name, size: file.size, url: dataUrl }];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // Password Verification States
  const [createPassword, setCreatePassword] = useState('');
  const [createPasswordError, setCreatePasswordError] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [deletePasswordError, setDeletePasswordError] = useState('');

  const categories = [
    { id: 'all', label: lang === 'ko' ? '전체 보기' : 'Show All' },
    { id: 'notice', label: lang === 'ko' ? '공지사항' : 'Notice' },
    { id: 'press', label: lang === 'ko' ? '보도자료' : 'Press Releases' },
    { id: 'disclosure', label: lang === 'ko' ? '공시정보' : 'Disclosures' },
    { id: 'ir', label: lang === 'ko' ? 'IR 자료실' : 'IR Library' },
  ];

  const defaultNews: NewsPost[] = [
    {
      id: 6,
      category: 'press',
      title: lang === 'ko' ? '화순전남대병원, 미래의료혁신센터 입주기업 간담회 개최' : 'Hwasun CNUH Holds Colloquium with Resident Startups of Future Medical Innovation Center',
      date: '2026-06-01',
      author: lang === 'ko' ? '홍보팀' : 'PR Team',
      views: 142,
      content: lang === 'ko'
        ? `화순전남대학교병원은 최근 미래의료혁신센터 3층 하모니홀에서 병원과 기업 간 협력 체계를 공고히 하고 공동 연구개발 활성화 방안을 모색하기 위한 '상반기 미래의료혁신센터 입주기업 간담회'를 성황리에 개최했습니다.

이번 간담회에는 오인재 의생명연구원장을 비롯해 센터 입주 기업인 디알큐어, 디웍스, 메가브릿지, 씨앤큐어, 씨엔알리서치, 아이티아이즈, 에이씨알오, 에이아이에스디, 위치스, 제이에스링크, 케이블루바이오, 코스모써지 등 총 12개사 대표 및 주요 임직원들이 참석하였습니다.

참석자들은 의료 인공지능(AI), 신약 개발, 정밀의료, 임상시험 플랫폼 등 미래 바이오메디컬 분야의 핵심 기술 개발과 최신 연구 현황을 상호 공유했습니다. 또한, 대학병원의 우수한 인프라와 임상 노하우를 접목한 병원-기업 공동 연구개발(R&D) 과제 및 실질적인 사업화 협력 방안에 대해 심도 깊은 논의를 진행하였습니다.

오인재 의생명연구원장은 "이번 간담회가 병원과 기업이 실질적인 동반성장 협력 기반을 더욱 굳건히 다지는 계기가 되었다"며 "앞으로도 신속하고 유기적인 교류와 다각적인 임상 지원을 통해 지역 바이오 혁신 생태계 활성화에 앞장서겠다"고 전했습니다.`
        : `Hwasun Chonnam National University Hospital has successfully hosted its semi-annual colloquium with the resident startups of the Future Medical Innovation Center in the Harmony Hall on the 3rd floor, aimed at solidifying hospital-startup cooperation and exploring strategic joint R&D initiatives.

The meeting was presided over by Director In-jae Oh of the Biomedical Research Institute and was attended by CEOs and key executives from 12 resident bio-ventures, including DRCure, DWorks, MegaBridge, C&Cure, C&R Research, ITEyes, ACRO, AISD, Witches, JSLink, KBlueBio, and CosmoSurge.

Participants shared active R&D statuses and core achievements in next-generation biomedical areas such as medical Artificial Intelligence (AI), targeted drug discovery, precision medicine, and clinical trial platforms. They engaged in in-depth discussions on leveraging the hospital's clinical infrastructure and academic expertise to establish high-impact joint R&D programs and accelerate commercialization.

Director In-jae Oh stated, "This dialogue served as a vital cornerstone to reinforce practical win-win partnerships between clinicians and bio-entrepreneurs. We remain dedicated to fostering a vibrant regional biotechnology innovation ecosystem through seamless communication and tailored clinical translational support."`
    },
    {
      id: 5,
      category: 'press',
      title: lang === 'ko' ? '화순전남대병원 첨단정밀의료산업화지원센터, BIX 2025 공동관 운영' : 'Hwasun CNUH Precision Medicine Center Operates Joint Pavilion at BIX 2025',
      date: '2025-11-02',
      author: lang === 'ko' ? '홍보팀' : 'PR Team',
      views: 188,
      content: lang === 'ko'
        ? `화순전남대학교병원 첨단정밀의료산업화지원센터가 최근 서울 코엑스에서 열린 '바이오플러스-인터펙스 코리아 2025 (BIX 2025)'에서 공동관을 운영하며 바이오 기업들의 국내외 시장 개척과 비즈니스 네트워크 구축을 성공적으로 지원했습니다.

이번 공동관 참가를 통해 센터는 엔피케이(주), 케이블루바이오(주), 주식회사 포투가바이오 등 총 3개 유망 바이오 기업의 전시 및 비즈니스 파트너링 상담을 전폭 지원하였습니다.

참영 기업들은 자체 보유한 신약소재물질, 진세노사이드, 프로바이오틱스, 면역항암제 플랫폼 등 우수 기술과 고부가가치 제품들을 선보였습니다. 특히 케이블루바이오는 차별화된 정밀의료 및 뉴트라슈티컬 기술력을 적극 홍보하여 유통사, 투자기관 및 협력 관계사들과 100여 건 이상의 비즈니스 상담을 성사시키는 뚜렷한 유통·투자 활성화 성과를 거두었습니다.`
        : `The Advanced Precision Medicine Industrialization Support Center of Hwasun Chonnam National University Hospital has successfully supported promising biotech companies in expanding local/global markets and building business networks by operating a joint pavilion at the 'Bioplus-Interphex Korea 2025 (BIX 2025)' held at Seoul COEX.

At this prominent event, the center fully sponsored the exhibitions and bio-partnering consultations for three outstanding biotech companies: NGeneBio Co., Ltd., KBlueBio Co., Ltd., and Portuga Bio Co., Ltd.

The participating enterprises promoted their cutting-edge technologies and high-value products, including novel therapeutic substances, ginsenosides, probiotics, and immunotherapeutic platforms. KBlueBio, in particular, actively highlighted its precision medicine diagnostics and nutraceutical capabilities, successfully conducting over 100 business matchmaking sessions with distributors, investment institutions, and potential partners, securing solid momentum for future distribution and funding.`
    },
    {
      id: 4,
      category: 'press',
      title: lang === 'ko' ? '신명근 케이블루바이오 대표, 메디컬아시아 2024 대상 수상' : 'Myung-Geun Shin, CEO of KBlueBio, Receives Grand Prize at Medical Asia 2024',
      date: '2024-12-23',
      author: lang === 'ko' ? '홍보팀' : 'PR Team',
      views: 324,
      content: lang === 'ko'
        ? `지역 정밀의료 바이오테크 벤처기업인 케이블루바이오 주식회사(대표 신명근, 전 화순전남대병원장)가 '메디컬아시아 2024, 제14회 대한민국 글로벌 의료서비스대상'에서 대상 수상의 영예를 안았습니다.

지난 2020년 화순전남대병원에서 첫발을 내디딘 케이블루바이오는 혈액암을 비롯한 종양 분자 병태생리학 및 진단 전문가인 신명근 교수가 20여 년간의 임상중개연구 결과를 바탕으로 창업한 바이오 벤처기업입니다. 신 대표는 난치암 발병 예측 및 예후 판정을 위한 정밀의료 임상적 적용을 위해 ▲정밀 진단 제품 개발 ▲뉴트라슈티컬 제품 유통 ▲부작용 최소화 혁신 고령난치 항암제 연구 등을 목표로 하고 있습니다.

한 번의 검사로 수백 개의 암 관련 유전자 이상을 검출할 수 있는 차세대염기서열분석(NGS) 패널 제품을 개발하여 이미 국내 유수의 대학병원에서 사용 중입니다. 아울러 자체 발굴한 암 동반 진단 표지자를 타깃으로 한 항체-약물 접합체(ADC) 항암제를 연구 개발하고 있습니다. 또한 초저분자 진세노사이드 '컴파운드 케이'와 '프리미엄 낙산균 프로바이오틱스 2종'을 판매하고 있으며, 이 둘을 함께 섭취할 수 있는 건강기능식품 '울트라 K-프리바이오틱스'를 출시하며 뉴트라슈티컬 부문에서도 괄목할 성과를 내고 있습니다.

신명근 대표는 "고령 난치암 환자에게 발생하는 암 정밀의료 적용을 위한 정밀진단 제품과 치료제를 개발해 인류건강에 기여하는 글로벌 정밀의료기업으로 키워 가겠다"고 포부를 밝혔습니다.`
        : `KBlueBio Co., Ltd. (CEO Myung-Geun Shin, former Director of Hwasun Chonnam National University Hospital), a regional precision medicine biotechnology startup, has been honored with the Grand Prize at the 'Medical Asia 2024, the 14th Korea Global Medical Service Awards'.

Founded in 2020 as a spin-off from Hwasun CNUH, KBlueBio is a biotech venture established by Professor Myung-Geun Shin, a renowned specialist in molecular pathophysiology and diagnostics of hematological and solid malignancies, based on his 20+ years of translational clinical research. KBlueBio aims to achieve clinically applicable precision medicine for predicting refractory cancer risk and determining prognosis through: ▲developing precision diagnostic devices, ▲distributing nutraceutical products, and ▲discovering breakthrough geriatric refractory cancer therapies with minimized toxicities.

KBlueBio has developed next-generation sequencing (NGS) panels that can detect hundreds of cancer-associated genetic aberrations in a single test, which are already utilized in leading domestic university hospitals. The company is also researching antibody-drug conjugates (ADCs) targeting cancer companion diagnostic markers identified in-house. In addition, it distributes premium health functional foods including bioconverted low-molecular ginsenoside 'Compound K' and premium butyric acid bacteria probiotics, alongside the newly launched 'Ultra K-Prebiotics', demonstrating notable success in the nutraceutical market.

CEO Myung-Geun Shin stated, "We will cultivate KBlueBio into a global precision medicine company that contributes to human health by developing precision diagnostic panels and targeted therapeutics tailored for elderly patients suffering from refractory cancers."`
    },
    {
      id: 3,
      category: 'press',
      title: lang === 'ko' ? "의사가 창업하는 시대...명의 설립 벤처 3곳, '메디컬아시아 2024' 대상 영예" : "Leading Physicians as Entrepreneurs: 3 Medical-Schooled Startups Honored with Grand Prizes at Medical Asia 2024",
      date: '2024-12-10',
      author: lang === 'ko' ? '홍보팀' : 'PR Team',
      views: 295,
      content: lang === 'ko'
        ? `'메디컬아시아 2024, 제14회 대한민국 글로벌 의료서비스대상' 시상식이 지난 5일 한국프레스센터 국제회의장에서 개최되었습니다. 의료 패러다임이 질병 치료에서 예방으로 변화하고 디지털 기술이 의료 현장에 적극 접목되는 가운데, 국내 명의 의학자 3인이 설립한 바이오 벤처기업 3곳이 나란히 부문별 대상을 수상했습니다.

이번 시상식에서 케이블루바이오(대표 신명근 교수)는 'K-정밀의료 혈액암조기진단검사' 부문에서 대상의 영예를 안았습니다. 함께 대상을 수상한 기업은 암 조기진단검사 부문의 노동영 교수(베르티스), 메타버스 진료플랫폼 부문의 전상훈 교수(헬스온클라우드)입니다.

이들 기업은 풍부한 임상 경험을 갖춘 의학 석학들이 직접 미충족 의료 수요를 해결하기 위해 창업한 벤처로서, 글로벌 경쟁력을 갖춘 선도 기술력을 인정받고 있습니다.`
        : `The award ceremony for 'Medical Asia 2024, the 14th Korea Global Medical Service Awards' was held on December 5th at the Korea Press Center International Conference Hall. As the medical paradigm shifts from treatment to prevention and digital technologies are actively integrated into clinical workflows, three prominent biotech venture startups founded by Korea's leading medical experts were honored with grand prizes in their respective categories.

During this ceremony, KBlueBio (CEO Professor Myung-Geun Shin) won the Grand Prize in the 'K-Precision Medicine Hematological Cancer Early Diagnosis Test' category. Other co-recipients included Professor Dong-young Noh's Bertis (Cancer Early Diagnosis) and Professor Sang-hoon Jeon's HealthOnCloud (Metaverse Medical Platform).

These spin-offs, founded by distinguished medical scholars with extensive clinical experience, have been highly recognized for their globally competitive technologies addressing critical unmet medical needs.`
    },
    {
      id: 2,
      category: 'press',
      title: lang === 'ko' ? '화순전남대병원 창업기업 케이블루바이오, 전략투자 10억 유치' : 'Hwasun CNUH Spin-off KBlueBio Secures 1 Billion KRW in Strategic Investment',
      date: '2022-11-22',
      author: lang === 'ko' ? '홍보팀' : 'PR Team',
      views: 210,
      content: lang === 'ko'
        ? `화순전남대학교병원 창업 정밀의료 바이오기업인 케이블루바이오 주식회사(대표 신명근, 진단검사의학과 교수)가 국내 최대 제약·바이오 기업인 에스디바이오센서(이사회 의장 조영식)로부터 10억 원 규모의 전략적 투자를 유치하는 데 성공했습니다.

이번 투자 유치는 난치암 동반진단 및 정밀의료의 실용화 가능성을 높게 평가받은 결과입니다. 투자에는 에스디바이오센서 외에도 의약품 효능 시험 및 신약 개발 지원에 뛰어난 역량을 가진 (주)에스엘에스바이오(대표이사 이영태)의 자회사 (주)에스에스메디피아도 함께 참여하였습니다.

케이블루바이오는 이번 전략적 투자를 발판 삼아 난치성 혈액암 및 암 동반진단 패널의 상용화와 국내외 의료기관 공급망 확대를 본격적으로 추진할 계획입니다.`
        : `KBlueBio Co., Ltd. (CEO Myung-Geun Shin, Professor of Laboratory Medicine), a precision medicine biotech spin-off of Hwasun Chonnam National University Hospital, has successfully secured a strategic investment of 1 billion KRW from SD Biosensor (Chairman of the Board, Young-shik Cho), one of Korea's leading pharmaceutical and biotech corporations.

This investment is a strong testament to the high potential and clinical readiness of KBlueBio's companion diagnostic panels for refractory cancers. In addition to SD Biosensor, SS Medipia, a subsidiary of SLS Bio (CEO Young-tae Lee) renowned for pharmaceutical efficacy testing and drug discovery support, also participated in this funding round.

Leveraging this strategic investment, KBlueBio plans to accelerate the commercialization of its companion diagnostic panels for refractory hematologic malignancies and expand its supply distribution network to domestic and international medical institutions.`
    },
    {
      id: 1,
      category: 'press',
      title: lang === 'ko' ? '화순전남대병원, 정밀의료 산업화 본격화' : 'Hwasun Chonnam National University Hospital Accelerates Precision Medicine Commercialization',
      date: '2021-10-26',
      author: lang === 'ko' ? '홍보팀' : 'PR Team',
      views: 154,
      content: lang === 'ko'
        ? `화순전남대학교병원 첨단정밀의료산업화지원센터는 최근 광주 김대중컨벤션센터에서 열린 '2021 광주메디헬스산업전'에 참가하여, 정밀의료 신기술 및 신제품 개발에 대한 활발한 상담을 진행하는 등 정밀 의료 산업화에 본격 나섰습니다.

센터는 협력기관인 전남테크노파크와 바이오메디컬 기업인 라메디텍, 엔젠바이오, 케이블루바이오 등과 함께 '정밀의료 공동관'을 운영하며 정밀의료 신기술과 제품을 선보였습니다.

특히 케이블루바이오(주)는 고령·재발 난치 혈액암 대상 정밀의료 구현을 위한 진단기기 및 치료제를 개발하는 기업으로, 혈액암 정밀진단 패널(KBB™-RNAseq NGS-Leukemia-PHB)과 30여 건의 신약후보물질을 선보였습니다. 이를 통해 국내 병원 및 기업과의 바이오 상담을 거쳐 6천만 원의 계약과 6건의 기술상담 성과를 거두었습니다.`
        : `The Advanced Precision Medicine Industrialization Support Center at Hwasun Chonnam National University Hospital has officially accelerated the commercialization of precision medicine by participating in the '2021 Gwangju Medical & Health Industry Exhibition' held at the Gwangju Kimdaejung Convention Center.

The center operated a 'Precision Medicine Joint Pavilion' with its partner organizations and biomedical companies, including Jeonnam Technopark, Lameditech, NGeneBio, and KBlueBio, to showcase novel precision medicine technologies and products.

In particular, KBlueBio Co., Ltd., which develops diagnostic devices and therapies to achieve precision medicine for elderly and recurrent refractory hematologic malignancies, presented its leukemia precision diagnostic panel (KBB™-RNAseq NGS-Leukemia-PHB) along with over 30 candidate therapeutic compounds. Through bio-partnering consultations with domestic hospitals and corporations, the company secured a 60 million KRW supply contract and concluded 6 technical consulting agreements.`
    }
  ];

  // Combined and filtered data
  const newsData = [...customNews, ...defaultNews].filter(post => !deletedPostIds.includes(post.id));

  const filteredNews = newsData
    .filter(post => selectedCategory === 'all' ? true : post.category === selectedCategory)
    .filter(post => searchQuery === '' ? true : (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase())));

  const getCategoryLabel = (cat: string) => {
    const found = categories.find(c => c.id === cat);
    return found ? found.label : cat;
  };

  const openCreateModal = () => {
    const today = new Date().toISOString().split('T')[0];
    setNewPostCategory('notice');
    setNewPostTitle('');
    setNewPostAuthor(lang === 'ko' ? '홍보팀' : 'PR Team');
    setNewPostContent('');
    setNewPostDate(today);
    setNewPostFiles([]);
    setCreatePassword('');
    setCreatePasswordError('');
    setIsCreateModalOpen(true);
  };

  const openDeleteModal = (id: number) => {
    setDeletePassword('');
    setDeletePasswordError('');
    setPostToDelete(id);
  };


const incrementViews = async (postId: string) => {
  console.log('incrementViews called:', postId);

  const isCustom = customNews.some((p) => String(p.id) === String(postId));
  console.log('isCustom:', isCustom, 'customNews.length:', customNews.length);

  if (!isCustom) {
    console.warn('skip increment (not custom):', postId);
    return;
  }

  const target = customNews.find((p) => String(p.id) === String(postId));
  const currentViews = Number(target?.views ?? 0);
  const nextViews = currentViews + 1;

  const { data, error } = await supabase
    .from('company_news')
    .update({ views: nextViews })
    .eq('id', String(postId))
    .select('id, views')
    .single();

  console.log('update result:', { postId, currentViews, nextViews, data, error });

  if (error) {
    console.error('조회수 업데이트 실패:', error);
    return;
  }

  const appliedViews = Number(data?.views ?? nextViews);

  // 화면 즉시 반영
  setCustomNews((prev) =>
    prev.map((p) =>
      String(p.id) === String(postId) ? { ...p, views: appliedViews } : p
    )
  );

  // 이미 열려있는 상세글 숫자도 즉시 반영
  setSelectedPost((prev) =>
    prev && String(prev.id) === String(postId)
      ? { ...prev, views: appliedViews }
      : prev
  );
};



  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Visual Header */}
      <div className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-blue-950/45 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {lang === 'ko' ? '기업 소식' : 'Company News'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-medium">
            {lang === 'ko' 
              ? '케이블루바이오의 최신 소식 및 다양한 미디어 동향을 확인하실 수 있습니다.' 
              : 'Keep up with our latest announcements, press coverage, and financial disclosure.'}
          </p>
        </div>
      </div>

      {/* Main Board Grid (Sidebar on Left, Board table on Right) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sidebar Layout */}
          <div className="lg:col-span-3 flex flex-col space-y-6">
            {/* Category Navigation List */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">
                {lang === 'ko' ? '소식 분류' : 'Categories'}
              </h3>
              <nav className="flex flex-col space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id as any);
                      setSelectedPost(null);
                    }}
                    className={`text-left px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-sky-50 text-sky-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Main Board Area */}
          <div className="lg:col-span-9 flex flex-col space-y-6">
            
            {/* Search Header Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200/60 shadow-2xs gap-3">
              <span className="text-xs text-slate-500 font-semibold self-start sm:self-auto">
                {lang === 'ko' ? `총 ${filteredNews.length}건의 소식이 있습니다.` : `Total ${filteredNews.length} articles found.`}
              </span>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <div className="relative w-full sm:max-w-xs flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={lang === 'ko' ? '제목, 본문 키워드 검색...' : 'Search news titles...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white transition-all placeholder-slate-400"
                  />
                </div>
                <button
                  onClick={openCreateModal}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ko' ? '글쓰기' : 'Write'}</span>
                </button>
              </div>
            </div>

            {/* Post Viewer expanded block */}
            {selectedPost && (
              <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-top-3 duration-300 relative">
                <div className="absolute top-4 right-4 flex items-center space-x-1.5">
                  <button 
                    onClick={() => openDeleteModal(selectedPost.id)}
                    className="p-1.5 rounded-full hover:bg-rose-100 text-rose-500 transition-colors cursor-pointer"
                    title={lang === 'ko' ? '게시글 삭제' : 'Delete post'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="p-1.5 rounded-full hover:bg-slate-200/50 text-slate-500 transition-colors cursor-pointer"
                    title="Close viewer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-sky-600 mb-3">
                  <span className="uppercase bg-sky-100 px-2 py-0.5 rounded">{getCategoryLabel(selectedPost.category)}</span>
                  <span>|</span>
                  <span className="flex items-center text-slate-400"><Calendar className="w-3.5 h-3.5 mr-1" />{selectedPost.date}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 leading-tight mb-4 pr-16">
                  {selectedPost.title}
                </h3>
                <div className="text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-200/60 pt-4 space-y-2 whitespace-pre-line">
                  {selectedPost.content}
                </div>
                {selectedPost.files && selectedPost.files.length > 0 && (
                  <div className="border-t border-slate-150 mt-6 pt-4">
                    <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                      {lang === 'ko' ? '첨부 파일 목록' : 'Attached Files'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.files.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url}
                          download={file.name}
                          className="inline-flex items-center space-x-2 bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-sky-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors shadow-2xs"
                        >
                          <Paperclip className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{file.name}</span>
                          <span className="text-slate-400 text-[10px]">({(file.size / 1024).toFixed(1)} KB)</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Board table block */}
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4 text-center" style={{ width: '80px' }}>No.</th>
                      <th className="px-6 py-4" style={{ width: '120px' }}>{lang === 'ko' ? '카테고리' : 'Category'}</th>
                      <th className="px-6 py-4">{lang === 'ko' ? '소식 제목' : 'Article Title'}</th>
                      <th className="px-6 py-4" style={{ width: '120px' }}>{lang === 'ko' ? '작성일' : 'Date'}</th>
                      <th className="px-6 py-4 text-center" style={{ width: '100px' }}>{lang === 'ko' ? '조회수' : 'Views'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-normal">
                    {filteredNews.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-normal">
                          {lang === 'ko' ? '일치하는 소식이 검색되지 않았습니다.' : 'No announcements found matching search criteria.'}
                        </td>
                      </tr>
                    ) : (
                      filteredNews.map((post) => (
                        <tr 
                          key={post.id}
onClick={async () => {
  console.log('card clicked', post.id);
  await incrementViews(String(post.id));   // 먼저 조회수
  setSelectedPost(post);                    // 그 다음 열기
  window.scrollTo({ top: 320, behavior: 'smooth' });
}}

                          className={`hover:bg-slate-50/70 transition-colors cursor-pointer ${
                            selectedPost?.id === post.id ? 'bg-sky-50/30' : ''
                          }`}
                        >
                          <td className="px-6 py-4.5 text-center font-mono text-xs text-slate-400">
                            {post.id}
                          </td>
                          <td className="px-6 py-4.5">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                              post.category === 'notice'
                                ? 'bg-amber-50 text-amber-700'
                                : post.category === 'press'
                                ? 'bg-blue-50 text-blue-700'
                                : post.category === 'disclosure'
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-purple-50 text-purple-700'
                            }`}>
                              {getCategoryLabel(post.category)}
                            </span>
                          </td>
                          <td className="px-6 py-4.5 font-bold text-slate-800 hover:text-sky-600 transition-colors">
                            {post.title}
                          </td>
                          <td className="px-6 py-4.5 font-mono text-xs text-slate-500">
                            {post.date}
                          </td>
                          <td className="px-6 py-4.5 text-center font-mono text-xs text-slate-400">
                            <span className="flex items-center justify-center space-x-1">
                              <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{post.views}</span>
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {lang === 'ko' ? '새 게시글 작성' : 'Create New Post'}
              </h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!newPostTitle.trim() || !newPostContent.trim()) return;
              
              if (createPassword !== '2027') {
                setCreatePasswordError(lang === 'ko' ? '비밀번호가 올바르지 않습니다.' : 'Incorrect password.');
                return;
              }

              const nextId = [...customNews, ...defaultNews].length > 0 
                ? Math.max(...[...customNews, ...defaultNews].map(p => p.id)) + 1 
                : 1;

              const newPost: NewsPost = {
                id: nextId,
                category: newPostCategory,
                title: newPostTitle,
                date: newPostDate || new Date().toISOString().split('T')[0],
                author: newPostAuthor || (lang === 'ko' ? '홍보팀' : 'PR Team'),
                views: 0,
                content: newPostContent,
                files: newPostFiles
              };

                            const { error } = await supabase.from('company_news').insert({
                id: newPost.id,
                category: newPost.category,
                title: newPost.title,
                author: newPost.author,
                date: newPost.date,
                views: newPost.views,
                content: newPost.content,
                files: newPost.files || [],
                is_custom: true,
              });

              if (error) {
                console.error('Failed to save company news:', error);
                alert('Supabase 저장 중 오류가 발생했습니다.');
                return;
              }

              const updatedCustom = [newPost, ...customNews];
              setCustomNews(updatedCustom);

              setIsCreateModalOpen(false);
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">{lang === 'ko' ? '분류' : 'Category'}</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as any)}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="notice">{lang === 'ko' ? '공지사항' : 'Notice'}</option>
                    <option value="press">{lang === 'ko' ? '보도자료' : 'Press Release'}</option>
                    <option value="disclosure">{lang === 'ko' ? '공시정보' : 'Disclosure'}</option>
                    <option value="ir">{lang === 'ko' ? 'IR 자료실' : 'IR Library'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">{lang === 'ko' ? '작성일' : 'Date'}</label>
                  <input
                    type="date"
                    value={newPostDate}
                    onChange={(e) => setNewPostDate(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">{lang === 'ko' ? '작성자' : 'Author'}</label>
                  <input
                    type="text"
                    value={newPostAuthor}
                    onChange={(e) => setNewPostAuthor(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                    placeholder={lang === 'ko' ? '작성자 이름' : 'Author name'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">{lang === 'ko' ? '제목' : 'Title'}</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  placeholder={lang === 'ko' ? '게시글 제목을 입력하세요' : 'Enter post title'}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">{lang === 'ko' ? '본문 내용' : 'Content'}</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={6}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500 focus:bg-white transition-all resize-none"
                  placeholder={lang === 'ko' ? '게시글 내용을 작성하세요...' : 'Write post content here...'}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  {lang === 'ko' ? '첨부 파일' : 'Attachments'}
                </label>
                
                {/* Drag & Drop Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files) {
                      handleFileSelection(e.dataTransfer.files);
                    }
                  }}
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-sky-500 bg-sky-50/50' 
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100/40 hover:border-slate-300'
                  }`}
                >
                  <input
                    id="file-upload-input"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleFileSelection(e.target.files);
                      }
                    }}
                  />
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Upload className="w-6 h-6 text-slate-400" />
                    <p className="text-xs font-semibold text-slate-600">
                      {lang === 'ko' ? '파일을 드래그하여 놓거나 클릭하여 선택하세요' : 'Drag & drop files here, or click to select'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {lang === 'ko' ? '다중 파일 업로드 지원' : 'Supports multiple files'}
                    </p>
                  </div>
                </div>

                {/* Selected Files List */}
                {newPostFiles.length > 0 && (
                  <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto">
                    {newPostFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="flex items-center space-x-2 text-slate-600 min-w-0">
                          <Paperclip className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium truncate max-w-[200px]" title={file.name}>{file.name}</span>
                          <span className="text-slate-400 text-[10px] shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewPostFiles(prev => prev.filter((_, i) => i !== idx));
                          }}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded-full hover:bg-slate-200/40 transition-colors cursor-pointer shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  {lang === 'ko' ? '게시글 비밀번호' : 'Post Password'}
                </label>
                <input
                  type="password"
                  value={createPassword}
                  onChange={(e) => {
                    setCreatePassword(e.target.value);
                    setCreatePasswordError('');
                  }}
                  className={`w-full text-sm bg-slate-50 border ${createPasswordError ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-sky-500'} rounded-lg px-3 py-2 focus:outline-none focus:bg-white transition-all`}
                  placeholder={lang === 'ko' ? '권한 비밀번호를 입력하세요' : 'Enter authority password'}
                  required
                />
                {createPasswordError && (
                  <p className="text-xs text-rose-500 mt-1 font-semibold">{createPasswordError}</p>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '취소' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '등록하기' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {postToDelete !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <h4 className="text-base font-bold text-slate-900 mb-2">
              {lang === 'ko' ? '게시글 삭제' : 'Delete Post'}
            </h4>
            <p className="text-sm text-slate-500 mb-4">
              {lang === 'ko' ? '정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.' : 'Are you sure you want to delete this post? This action cannot be undone.'}
            </p>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                {lang === 'ko' ? '삭제 비밀번호' : 'Delete Password'}
              </label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => {
                  setDeletePassword(e.target.value);
                  setDeletePasswordError('');
                }}
                className={`w-full text-sm bg-slate-50 border ${deletePasswordError ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-rose-500'} rounded-lg px-3 py-2 focus:outline-none focus:bg-white transition-all`}
                placeholder={lang === 'ko' ? '권한 비밀번호를 입력하세요' : 'Enter authority password'}
                required
              />
              {deletePasswordError && (
                <p className="text-xs text-rose-500 mt-1 font-semibold">{deletePasswordError}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'ko' ? '취소' : 'Cancel'}
              </button>
                           <button
                onClick={async () => {
                  if (postToDelete === null) return;

                  if (deletePassword !== '2027') {
                    setDeletePasswordError(lang === 'ko' ? '비밀번호가 올바르지 않습니다.' : 'Incorrect password.');
                    return;
                  }

                  const isCustom = customNews.some(p => p.id === postToDelete);

                  if (isCustom) {
                    const { error } = await supabase
                      .from('company_news')
                      .delete()
                      .eq('id', postToDelete);

                    if (error) {
                      console.error('Failed to delete custom company news:', error);
                      alert('Supabase 삭제 중 오류가 발생했습니다.');
                      return;
                    }

                    const updatedCustom = customNews.filter(p => p.id !== postToDelete);
                    setCustomNews(updatedCustom);
                  } else {
                    const { error } = await supabase
                      .from('deleted_news_ids')
                      .insert({ id: postToDelete });

                    if (error) {
                      console.error('Failed to save deleted news id:', error);
                      alert('Supabase 삭제 기록 저장 중 오류가 발생했습니다.');
                      return;
                    }

                    const updatedDeleted = [...deletedPostIds, postToDelete];
                    setDeletedPostIds(updatedDeleted);
                  }

                  if (selectedPost?.id === postToDelete) {
                    setSelectedPost(null);
                  }

                  setPostToDelete(null);
                }}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {lang === 'ko' ? '삭제' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



