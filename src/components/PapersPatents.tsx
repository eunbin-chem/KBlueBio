import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  FileText, 
  Award, 
  Search, 
  ExternalLink, 
  BookOpen, 
  Bookmark, 
  Calendar, 
  User, 
  CheckCircle2, 
  TrendingUp, 
  Activity,
  Layers,
  ArrowUpRight,
  ChevronRight,
  Filter,
  Plus,
  Trash2,
  X,
  Upload,
  Paperclip
} from 'lucide-react';

interface IPItem {
  id: string;
  type: 'paper' | 'patent';
  titleKo: string;
  titleEn: string;
  journalKo: string;
  journalEn: string;
  authorsKo: string;
  authorsEn: string;
  date: string;
  statusKo: string;
  statusEn: string;
  number?: string; // DOI for paper, Patent App/Reg Number for patent
  summaryKo: string;
  summaryEn: string;
  link?: string;
  tags: string[];
}

interface PapersPatentsProps {
  lang: 'ko' | 'en';
}

const IP_DATA: IPItem[] = [
  {
    id: 'paper-poct-creatinine',
    type: 'paper',
    titleKo: '신속 및 저비용 현장진단 크레아티닌 정량을 위한 종이 기반 이중 패드 효소 센서 개발',
    titleEn: 'A paper-based dual-pad enzymatic sensor for rapid and low-cost point-of-care creatinine quantification',
    journalKo: 'Sensors and Actuators B: Chemical (국제 최우수 학술지)',
    journalEn: 'Sensors and Actuators B: Chemical (Elsevier, Q1)',
    authorsKo: '이호연, 김가경, 박진희, 김혜선, 유호정, 이영은, 천준오, 나은희, 김수현, 최현정, 신명근*, 김민곤**',
    authorsEn: 'H. Lee, G.G. Kim, J.H. Park, H.S. Kim, H. Yu, Y.E. Lee, J.O. Cheon, E.H. Nah, S.H. Kim, H.J. Choi, M.G. Shin*, M.G. Kim**',
    date: '2026-06-08',
    statusKo: '게재 완료 (IF: 8.4)',
    statusEn: 'Published (IF: 8.4)',
    number: 'Sensors & Actuators B: Chemical 466 (2026) 140336',
    link: 'https://doi.org/10.1016/j.snb.2026.140336',
    summaryKo: '본 연구는 신속하고 저렴한 혈중 크레아티닌 측정을 위해 네 가지 효소 캐스케이드 반응, 실시간 크레아틴 보정(이중 zone 차감 방식) 및 아스코르브산 간섭 제거 기술을 단일 종이 플랫폼 상에 통합한 이중 패드 효소 센서(Cre-Q 센서) 개발에 관한 것입니다. 15 μL의 미량 혈청으로 10분 이내에 임상 진단 장비 수준의 고정밀도(CV < 4.2%) 정량 분석이 가능하며, 스트립당 생산 원가 약 $0.05 수준의 초저비용 대량생산이 가능하여 응급실, 방사선과 및 의료 소외 환경 등 현장진단(POCT) 분야에서의 높은 임상적·산업적 가치를 입증한 성과입니다.',
    summaryEn: 'This study reports a dual-pad enzymatic creatinine quantification sensor (Cre-Q sensor) for rapid, low-cost, point-of-care blood creatinine measurement. Integrating a four-enzyme cascade, real-time creatine correction (via dual-zone subtraction), and upstream ascorbate oxidase on a single paper-based platform, it delivers high-precision clinical-grade results within 10 minutes using just 15 μL of serum. Offering extreme cost-efficiency (estimated material cost of $0.05 per strip) and ease of use, it demonstrates outstanding potential for rapid renal function testing in emergency, radiology, and resource-limited settings.',
    tags: ['Creatinine POCT', 'Paper-based Sensor', 'Enzymatic Detection', 'Kidney Function']
  },
  {
    id: 'patent-after-creatinine-device',
    type: 'patent',
    titleKo: '신규한 크레아티닌 정량 장치',
    titleEn: 'Novel creatinine quantification device',
    journalKo: '특허청 (KIPO) / PCT',
    journalEn: 'Korean Intellectual Property Office (KIPO) / PCT',
    authorsKo: '신명근',
    authorsEn: 'Shin Myung-geun',
    date: '2025-04-22',
    statusKo: '특허 등록 완료',
    statusEn: 'Patent Registered',
    number: '출원: 2024.07.31 / 등록: 2025.04.22 (PCT 출원)',
    summaryKo: '미량의 생체 검체로부터 크레아티닌 수치를 고정밀도로 분석할 수 있는 현장진단(POCT)형 크레아티닌 정량 측정 장치 및 스트립 설계 특허입니다.',
    summaryEn: 'A patent covering the design of a point-of-care testing (POCT) creatinine quantification measurement device and test strips capable of analyzing creatinine levels from trace-volume biological specimens with high precision.',
    tags: ['Creatinine POCT', 'Measurement Device', 'Diagnostic Strip']
  },
  {
    id: 'patent-after-leukemia-diag',
    type: 'patent',
    titleKo: '백혈병 표적 치료를 위한 프로히비틴 동반 진단용 조성물',
    titleEn: 'Composition for prohibitin companion diagnostics for targeted leukemia therapy',
    journalKo: '특허청 (KIPO) / PCT',
    journalEn: 'Korean Intellectual Property Office (KIPO) / PCT',
    authorsKo: '신명근',
    authorsEn: 'Shin Myung-geun',
    date: '2024-06-26',
    statusKo: '특허 등록 완료',
    statusEn: 'Patent Registered',
    number: '출원: 2021.12.22 / 등록: 2024.06.26 (PCT 출원)',
    summaryKo: '급성 백혈병 환자의 표적 치료 반응성을 사전 예측하기 위해 미토콘드리아 프로히비틴(Prohibitin) 발현 상태를 진단하는 동반 진단용 조성물 및 이를 활용한 분석 방법 특허입니다.',
    summaryEn: 'A companion diagnostic composition and analytical method utilizing the same to diagnose mitochondrial prohibitin expression states for predicting targeted therapeutic responsiveness in acute leukemia patients.',
    tags: ['Companion Diagnostics', 'Leukemia Target', 'Prohibitin Assay']
  },
  {
    id: 'patent-after-chromanone',
    type: 'patent',
    titleKo: '신규한 크로마논 화합물을 유효성분으로 포함하는 다발성골수종의 예방 또는 치료용 조성물',
    titleEn: 'Composition for preventing or treating multiple myeloma comprising novel chromanone compound as active ingredient',
    journalKo: '특허청 (KIPO) / PCT',
    journalEn: 'Korean Intellectual Property Office (KIPO) / PCT',
    authorsKo: '신명근',
    authorsEn: 'Shin Myung-geun',
    date: '2022-10-21',
    statusKo: '특허 등록 완료',
    statusEn: 'Patent Registered',
    number: '출원: 2022.04.08 / 등록: 2022.10.21 (PCT 출원)',
    summaryKo: '항암 약물 내성 다발성 골수종 치료를 위해 암세포 특이적 사멸 유도 작용을 극대화한 신규 크로마논(Chromanone) 유도체 화합물의 합성 및 암 대사 치료법 관련 원천 기술 특허입니다.',
    summaryEn: 'A foundational patent covering the synthesis of a novel chromanone derivative compound and cancer metabolism therapies maximizing cancer cell-specific apoptosis induction for treating chemotherapy-resistant multiple myeloma.',
    tags: ['Multiple Myeloma', 'Chromanone', 'Cancer Metabolism']
  },
  {
    id: 'patent-after-triterpene',
    type: 'patent',
    titleKo: '신규한 사환구조 트리테르펜 화합물을 유효성분으로 포함하는 다발성골수종의 예방 또는 치료용 조성물',
    titleEn: 'Composition for preventing or treating multiple myeloma comprising novel tetracyclic triterpene compound as active ingredient',
    journalKo: '특허청 (KIPO) / PCT',
    journalEn: 'Korean Intellectual Property Office (KIPO) / PCT',
    authorsKo: '신명근',
    authorsEn: 'Shin Myung-geun',
    date: '2022-02-09',
    statusKo: '특허 등록 완료',
    statusEn: 'Patent Registered',
    number: '출원: 2021.11.19 / 등록: 2022.02.09 (PCT 출원)',
    summaryKo: '다발성 골수종 세포의 미토콘드리아 대사 및 생존 경로를 표적 억제하여 우수한 항종양 활성을 나타내는 신규 사환구조 트리테르펜(Tetracyclic Triterpene) 화합물의 합성 및 치료 약학적 조성물 특허입니다.',
    summaryEn: 'A patent covering the synthesis and therapeutic pharmaceutical composition of a novel tetracyclic triterpene compound exhibiting excellent antitumor activity by selectively targeting and inhibiting mitochondrial metabolism and survival pathways of multiple myeloma cells.',
    tags: ['Multiple Myeloma', 'Triterpene', 'Target Therapeutics']
  },
  {
    id: 'patent-after-sequencing-panel',
    type: 'patent',
    titleKo: '차세대 염기서열분석 기반 표적유전자 RNA 염기서열분석 패널 및 분석알고리즘',
    titleEn: 'Next-generation sequencing-based target gene RNA sequencing panel and analysis algorithm',
    journalKo: '특허청 (KIPO) / PCT',
    journalEn: 'Korean Intellectual Property Office (KIPO) / PCT',
    authorsKo: '신명근',
    authorsEn: 'Shin Myung-geun',
    date: '2021-03-05',
    statusKo: '특허 출원 완료',
    statusEn: 'Patent Pending (Applied)',
    number: '출원: 2021.03.05 (PCT 출원)',
    summaryKo: '차세대 염기서열분석(NGS)을 기반으로 주요 질환 표적 유전자들의 RNA 발현량을 고해상도로 정밀 측정하고, 이를 독자적인 생물정보학 알고리즘과 판독 기술에 매핑하여 맞춤형 진단을 지원하는 기술입니다.',
    summaryEn: 'A technology based on next-generation sequencing (NGS) to precisely measure RNA expression levels of major disease target genes with high resolution and map them to proprietary bioinformatics algorithms and interpretation models for customized diagnostics.',
    tags: ['NGS Panel', 'RNA Sequencing', 'Bioinformatics Algorithm']
  },
  {
    id: 'patent-pre-parasites',
    type: 'patent',
    titleKo: '장내 기생충 검출용 키트 및 이를 이용한 검출 방법',
    titleEn: 'Kit for detecting intestinal parasites and detection method using the same',
    journalKo: '특허청 (KIPO)',
    journalEn: 'Korean Intellectual Property Office (KIPO)',
    authorsKo: '신명근',
    authorsEn: 'Shin Myung-geun',
    date: '2018-11-30',
    statusKo: '특허 등록 완료',
    statusEn: 'Patent Registered',
    number: '출원: 2018.01.12 / 등록: 2018.11.30',
    summaryKo: '분변 등 생체 검체 내에 존재하는 다양한 종의 장내 기생충 유전자를 고감도로 동시 검출할 수 있는 특이적 프라이머 세트, 프로브 및 현장 진단형 검출 키트 구성 기술입니다.',
    summaryEn: 'Specific primer sets, probes, and point-of-care detection kit configuration technology capable of simultaneously detecting various species of intestinal parasite genes present in biological specimens such as feces with high sensitivity.',
    tags: ['Parasite Kit', 'Intestinal Disease', 'Diagnostics']
  },
  {
    id: 'paper-pre-aml-genome-instability',
    type: 'paper',
    titleKo: '한국인 급성 골수성 백혈병(AML) 환자에서의 미토콘드리아 유전체 불안정성 분석 및 임상적 가치 규명',
    titleEn: 'Spectrum of mitochondrial genome instability and implication of mitochondrial haplogroups in Korean patients with acute myeloid leukemia',
    journalKo: 'Blood Research (대한혈액학회 공식 학술지)',
    journalEn: 'Blood Research (SCIE)',
    authorsKo: '김혜란*, 강민구*, 이영은, 나보람, 노민서, 양승현, 신종희, 신명근*',
    authorsEn: 'H.R. Kim*, M.-G. Kang*, Y.E. Lee, B.R. Na, M.S. Noh, S.H. Yang, J.-H. Shin, M.-G. Shin*',
    date: '2018-09-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Blood Res 2018;53:240-249',
    link: 'https://doi.org/10.5045/br.2018.53.3.240',
    summaryKo: '한국인 급성 골수성 백혈병(AML) 환자군을 분석하여 암세포 내 미토콘드리아 게놈의 불안정성(mtMSI) 수치를 대조군과 대조 계측하였습니다. 백혈병 발현 시 평균 복제수 수치가 9배 이상 비정상 상승함을 실증하고 발병 빈도가 비상하게 높은 하플로그룹과의 양적 인과성을 명확하게 제시하였습니다.',
    summaryEn: 'Dissected the somatic mutational landscape of mtDNA and copy number variation in 74 adult AML patients. Confirmed a distinct 9-fold increase in copy number and linked haplogroup D4 to elevated relative leukemia risk in the Korean population.',
    tags: ['AML', 'mtMSI', 'Haplogroup D4', 'Genomic Instability']
  },
  {
    id: 'patent-pre-b2m',
    type: 'patent',
    titleKo: 'CRISPR/CAS9 시스템을 이용한 베타2-마이크로불린 유전자 제거용 시발체',
    titleEn: 'Primer for knocking out beta-2-microglobulin gene using CRISPR/Cas9 system',
    journalKo: '특허청 (KIPO)',
    journalEn: 'Korean Intellectual Property Office (KIPO)',
    authorsKo: '신명근',
    authorsEn: 'Shin Myung-geun',
    date: '2017-11-03',
    statusKo: '특허 등록 완료',
    statusEn: 'Patent Registered',
    number: '출원: 2015.09.25 / 등록: 2017.11.03',
    summaryKo: 'CRISPR/Cas9 유전자 가위 기술을 적용하여 조직적합성 항원의 핵심 성분인 베타2-마이크로불린(B2M) 유전자를 고효율로 표적 절단 및 제거하기 위한 특이적 프라이머(시발체) 디자인 및 스크리닝 기술입니다.',
    summaryEn: 'Design and screening technology of specific primers for highly efficient targeted cleavage and knockout of the beta-2-microglobulin (B2M) gene, a core component of histocompatibility antigens, using CRISPR/Cas9 gene-editing technology.',
    tags: ['CRISPR/Cas9', 'B2M Knockout', 'Primer Design']
  },
  {
    id: 'patent-pre-phb2',
    type: 'patent',
    titleKo: 'CRISPR/CAS9 시스템을 이용한 프로히비틴2 유전자 제거용 시발체',
    titleEn: 'Primer for knocking out prohibitin 2 gene using CRISPR/Cas9 system',
    journalKo: '특허청 (KIPO)',
    journalEn: 'Korean Intellectual Property Office (KIPO)',
    authorsKo: '신명근',
    authorsEn: 'Shin Myung-geun',
    date: '2017-06-05',
    statusKo: '특허 등록 완료',
    statusEn: 'Patent Registered',
    number: '출원: 2015.09.25 / 등록: 2017.06.05',
    summaryKo: '미토콘드리아 기능 유지 및 세포 사멸 조절에 관여하는 핵심 인자인 프로히비틴2(PHB2) 유전자를 표적 제거하기 위한 CRISPR/Cas9 시스템 전용 유전자 가위 가이드 및 시발체 제작 기술입니다.',
    summaryEn: 'Guide and primer construction technology dedicated to the CRISPR/Cas9 system for targeted knockout of the prohibitin 2 (PHB2) gene, a key factor involved in mitochondrial function maintenance and cell death regulation.',
    tags: ['CRISPR/Cas9', 'PHB2 Knockout', 'Primer Design']
  },
  {
    id: 'paper-pre-pediatric-aml',
    type: 'paper',
    titleKo: '소아 급성 골수성 백혈병(Pediatric AML) 환자에서 미토콘드리아 유전체 다형성 및 4,977-bp 대량 결실의 유의성 평가',
    titleEn: 'Clinicopathological Implications of Mitochondrial Genome Alterations in Pediatric Acute Myeloid Leukemia',
    journalKo: 'Annals of Laboratory Medicine (국제 학술지)',
    journalEn: 'Annals of Laboratory Medicine (SCIE, Q1 / IF: 4.9)',
    authorsKo: '강민구, 김유나, 이준형, 마이클 자데닝스, 백희조, 국훈, 김혜란*, 신명근*',
    authorsEn: 'M.-G. Kang, Y.-N. Kim, J.H. Lee, M. Szardenings, H.-J. Baek, H. Kook, H.-R. Kim*, M.-G. Shin*',
    date: '2016-03-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Ann Lab Med 2016;36:101-110',
    link: 'https://doi.org/10.3343/alm.2016.36.2.101',
    summaryKo: '소아 급성 골수성 백혈병 환자의 골수 세포 분석을 통해 미토콘드리아 DNA(mtDNA) 복제수 상승과 4,977-bp 공통 결실 비율을 계측하고, 발병 위험도와 환자 생존율 간의 긴밀한 분자유전학적 연관성을 규명하여 학술적 임상 병리 이론을 설계하였습니다.',
    summaryEn: 'Dissected pediatric AML cells and detected a 2-fold copy number increase alongside elevated 4,977-bp deletion rates. Proved that these quantitative mitochondrial genome alterations represent robust prognostic factors in pediatric leukemia patients.',
    tags: ['Pediatric AML', '4977-bp Deletion', 'Mito DNA Copy Number', 'Prognostics']
  },
  {
    id: 'paper-pre-leukemia-quiescence',
    type: 'paper',
    titleKo: '단일 세포 배양 및 분자 시그니처 분석을 통한 CD34+CD38- 백혈병 줄기세포(LSC)의 휴면성(Quiescence) 실증 및 임상병리적 의의',
    titleEn: 'Direct confirmation of quiescence of CD34+CD38- leukemia stem cell populations using single cell culture, their molecular signature and clinicopathological implications',
    journalKo: 'BMC Cancer (국제 종양학 SCIE 학술지)',
    journalEn: 'BMC Cancer (Springer Nature, SCIE)',
    authorsKo: '원은정*, 김혜란*, 백승철, 황대용, 김환영, 신종희, 서순팔, 양동욱, 마이클 자데닝스, 신명근*',
    authorsEn: 'E.J. Won*, H.R. Kim*, S.-C. Back, D. Hwang, H.-Y. Kim, J.-H. Shin, S.-P. Suh, D.-W. Ryang, M. Szardenings, M.-G. Shin*',
    date: '2015-04-02',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'BMC Cancer (2015) 15:217',
    link: 'https://doi.org/10.1186/s12885-015-1233-x',
    summaryKo: '백혈병 줄기세포(LSCs)의 약물 및 방사선 저항성(내성) 근원인 세포 휴면(Quiescence) 현상을 단일 세포 배양법 및 NGS 어레이 분석법으로 실증하고, 줄기세포의 휴면 정지에 비례하여 현저하게 다운그레이드 조절되는 세포 대사경로 및 미토콘드리아 복제수 억제 기전을 면밀히 규명한 성과입니다.',
    summaryEn: 'Investigated quiescent CD34+CD38- leukemia stem cell (LSC) populations using single-cell cultures. Directly demonstrated deep cellular quiescence linked with a notable down-regulation of major pathways (TGF-b/Wnt/Notch) and significantly lower mtDNA copy numbers.',
    tags: ['Leukemia Stem Cells', 'Quiescence', 'Chemoresistance', 'Mito Copy Number']
  },
  {
    id: 'paper-pre-review-diseases',
    type: 'paper',
    titleKo: '조혈계 질환, 만성 염증성 질환 및 암에서 미토콘드리아 DNA 이상 및 그 병태생리적 임상 의의',
    titleEn: 'Mitochondrial DNA Aberrations and Pathophysiological Implications in Hematopoietic Diseases, Chronic Inflammatory Diseases, and Cancers',
    journalKo: 'Annals of Laboratory Medicine (국제 학술지)',
    journalEn: 'Annals of Laboratory Medicine (SCIE, Q1)',
    authorsKo: '김혜란, 스테파니 제인 원, 클레어 파비안, 강민구, 마이클 자데닝스, 신명근*',
    authorsEn: 'H.-R. Kim, S.J. Won, C. Fabian, M.-G. Kang, M. Szardenings, M.-G. Shin*',
    date: '2015-01-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Ann Lab Med 2015;35:1-14',
    link: 'https://doi.org/10.3343/alm.2015.35.1.1',
    summaryKo: '노화 조혈모세포, 골수부전 증후군, 만성 염증성 질환 및 종양 등 다양한 임상 병증에서 발생하는 산화 스트레스, 미토콘드리아 기능 장애, 그리고 미토콘드리아 게놈 이상에 대한 병태생리적 메커니즘을 종합적으로 고찰하고 유망한 바이오마커로써의 가치와 핵심 패러다임을 제안한 종합 종설 논문입니다.',
    summaryEn: 'A comprehensive review paper detailing the pathophysiological implications of oxidative stress, mitochondrial dysfunction, and mitochondrial genome aberrations in aging hematopoietic stem cells, bone marrow failure, hematological malignancies, solid tumors, and inflammatory diseases.',
    tags: ['Mito Review', 'Pathophysiology', 'Hematopoietic Disease', 'Mito DNA Aberration']
  },
  {
    id: 'paper-pre-pah-biomarker',
    type: 'paper',
    titleKo: '다환방향족탄화수소(PAH) 발암물질 노출에 대한 만능 바이오마커로써의 Lamin-A/C Isoform 3 및 미토콘드리아 복제수 규명',
    titleEn: 'Profiling of Biomarkers for the Exposure of Polycyclic Aromatic Hydrocarbons: Lamin-A/C Isoform 3, Poly[ADP-ribose] Polymerase 1, and Mitochondria Copy Number Are Identified as Universal Biomarkers',
    journalKo: 'BioMed Research International (국제 독성생화학 학술지)',
    journalEn: 'BioMed Research International (SCIE, Q1)',
    authorsKo: '김환영, 김혜란, 강민구, 응우옌 티 다이 트랑, 백희조, 문재동, 신종희, 서순팔, 양동욱, 국훈, 신명근*',
    authorsEn: 'H.-Y. Kim, H.-R. Kim, M.-G. Kang, N.T.D. Trang, H.-J. Baek, J.-D. Moon, J.-H. Shin, S.-P. Suh, D.-W. Ryang, H. Kook, M.-G. Shin*',
    date: '2014-07-10',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'BioMed Research International 2014, Article ID 605135',
    link: 'https://doi.org/10.1155/2014/605135',
    summaryKo: '미세먼지 유래 발암 유독물인 다환방향족탄화수소(PAHs)에 노출되었을 때 발생하는 유전체 불안정성 지표를 도출한 기초 연구입니다. 노출 시 핵심 유전자 수치 변동과 함께 미토콘드리아 복제수(Copy Number)의 현격한 변조 패턴을 확인하여 만능 노출 마커로써의 기틀을 다졌습니다.',
    summaryEn: 'Discovered that chronic exposure to genotoxic Polycyclic Aromatic Hydrocarbons (PAHs) induces critical mutations in Lamin-A/C, PARP-1, and significantly alters mitochondrial DNA copy number, confirming their value as universal environmental biomarkers.',
    tags: ['PAH Genotoxicity', 'Lamin-A/C', 'PARP-1', 'mtDNA Alteration']
  },
  {
    id: 'paper-pre-chimerism-transplant',
    type: 'paper',
    titleKo: '조혈모세포 이식 후 이식 편대 숙주 반응 및 생착 모니터링을 위한 미토콘드리아 DNA 미니위성의 유용성과 임상 예후 가치',
    titleEn: 'Diagnostic and Prognostic Value of Mitochondrial DNA Minisatellites after Stem Cell Transplantation',
    journalKo: 'Biology of Blood and Marrow Transplantation (국제 이식면역학 최우수 학술지)',
    journalEn: 'Biology of Blood and Marrow Transplantation (Elsevier, Q1)',
    authorsKo: '원은정*, 김혜란*, 김환영, 국훈, 김형준, 신종희, 서순팔, 양동욱, 신명근*',
    authorsEn: 'E.J. Won*, H.R. Kim*, H.Y. Kim, H. Kook, H.-J. Kim, J.-H. Shin, S.-P. Suh, D.-W. Ryang, M.G. Shin*',
    date: '2013-05-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Biol Blood Marrow Transplant 19 (2013) 918-924',
    link: 'https://doi.org/10.1016/j.bbmt.2013.03.002',
    summaryKo: '이식 수혜자 100명을 장기 모니터링하여 자체 수립한 미토콘드리아 미니위성(mtMS) 정량 키메리즘 기술이 이식 거부 반응 및 백혈병의 재발(Recurrence)을 극히 초기 단계에서 정밀 감지하고, 이식 성패 및 생존율을 정교하게 예측할 수 있음을 검증한 선도적 임상 논문입니다.',
    summaryEn: 'Longitudinal follow-up of 100 transplant recipients. Confirmed that the developed quantitative mtMS markers capture minor chimerism changes (down to 1%) indicating bone marrow graft status and early relapse, presenting exceptional clinical and prognostic value.',
    tags: ['Stem Cell Engraftment', 'Chimerism Monitoring', 'MRD Detection', 'Prognostic Value']
  },
  {
    id: 'paper-pre-barrett-metaplasia',
    type: 'paper',
    titleKo: '이형성증이 동반되지 않은 바렛식도 화생성 조직에서의 빈번한 미토콘드리아 DNA 돌연변이 발생 규명',
    titleEn: 'Frequent Occurrence of Mitochondrial DNA Mutations in Barrett’s Metaplasia without the Presence of Dysplasia',
    journalKo: 'PLoS ONE (국제 우수 학술지)',
    journalEn: 'PLoS ONE (Q1)',
    authorsKo: '이숭, 한문종, 이기상, 백승철, 황대용, 김환영, 신종희, 서순팔, 양동욱, 김혜란*, 신명근*',
    authorsEn: 'S. Lee, M.-J. Han, K.-S. Lee, S.-C. Back, D. Hwang, H.-Y. Kim, J.-H. Shin, S.-P. Suh, D.-W. Ryang, H.-R. Kim*, M.-G. Shin*',
    date: '2012-05-22',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'PLoS ONE 7(5): e37571',
    link: 'https://doi.org/10.1371/journal.pone.0037571',
    summaryKo: '본 연구는 바렛식도(Barrett\'s Metaplasia) 이형성증이 동반되지 않은 34명 환자의 조직을 인접 정상 점막 조직과 비교 분석하여, 초기 화생성 병변 단계에서 발생하는 미토콘드리아 DNA(mtDNA) 돌연변이 및 대량 결실(4977 bp deletion), 복제수(Copy Number) 증가 등의 유전적 이상을 세계 최초 수준으로 규명한 선도 연구입니다. 활성산소종(ROS) 유의적 상승 및 호흡 복합체 효소 활성 손상이 mtDNA 돌연변이를 축적시켜 암 진행에 기여하는 분자 기전을 밝혀냈습니다.',
    summaryEn: 'This study investigates mitochondrial DNA (mtDNA) mutations, large deletions (4977 bp deletion), and copy number variations in 34 patients with Barrett\'s metaplasia without dysplasia. It demonstrates that elevated reactive oxygen species (ROS) and impaired mitochondrial respiratory chain complexes trigger early somatic mtDNA mutations, establishing these alterations as critical early molecular events in disease progression and esophageal tumorigenesis.',
    tags: ['Barrett\'s Esophagus', 'mtDNA Mutation', 'ROS Accumulation', 'Early Tumorigenesis']
  },
  {
    id: 'paper-pre-colorectal-cancer',
    type: 'paper',
    titleKo: '대장암 조직에서의 고빈도 미토콘드리아 게놈 미니위성 불안정성 및 임상병리적 연관성 규명',
    titleEn: 'High-frequency minisatellite instability of the mitochondrial genome in colorectal cancer tissue associated with clinicopathological values',
    journalKo: 'International Journal of Cancer (국제 종양학 최우수 학술지)',
    journalEn: 'International Journal of Cancer (Wiley, Q1 / IF: 7.3)',
    authorsKo: '임상우*, 김혜란*, 김환영, 허정욱, 김영진, 신종희, 서순팔, 양동욱, 김형록, 신명근*',
    authorsEn: 'S.W. Lim*, H.R. Kim*, H.Y. Kim, J.W. Huh, Y.J. Kim, J.H. Shin, S.-P. Suh, D.-W. Ryang, H.R. Kim, M.G. Shin*',
    date: '2011-11-28',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Int. J. Cancer: 131, 1332–1341 (2012)',
    link: 'https://doi.org/10.1002/ijc.27375',
    summaryKo: '대장암 환자 54명의 암 조직과 정상 조직을 비교하여 미토콘드리아 DNA(mtDNA) 돌연변이 및 미니위성 불안정성(mtMSI)을 규명하고, 변이가 동반된 환자군에서 종양 크기 증가 및 TNM 병기 진행과의 유의미한 상관관계를 밝혀 미토콘드리아 불안정성이 대장암 예후 인자로써 작용함을 규명한 연구입니다.',
    summaryEn: 'Investigated cancer tissue-specific mtDNA mutations and minisatellite instability (mtMSI) in 54 colorectal cancer patients. It demonstrated significant correlations between these mutations and advanced TNM stage and larger tumor sizes, highlighting the role of mitochondrial genome instability in tumor progression.',
    tags: ['Colorectal Cancer', 'mtMSI', 'Mito Genome Instability', 'Oncology']
  },
  {
    id: 'paper-pre-benzene-biomarker',
    type: 'paper',
    titleKo: '벤젠 직접 노출 바이오마커로써의 미토콘드리아 DNA 복제수 및 hnRNP A2/B1 단백질의 유용성 연구',
    titleEn: 'Mitochondrial DNA Copy Number and hnRNP A2/B1 Protein: Biomarkers for Direct Exposure of Benzene',
    journalKo: 'Environmental Toxicology and Chemistry (국제 환경독성학 학술지)',
    journalEn: 'Environmental Toxicology and Chemistry (Wiley, SCIE)',
    authorsKo: '엄하영*, 김혜란*, 김환영, 한동균, 백희조, 이재혁, 문재동, 신종희, 서순팔, 양동욱, 국훈, 신명근*',
    authorsEn: 'H.-Y. Eom*, H.-R. Kim*, H.Y. Kim, D.-K. Han, H.-J. Baek, J.-H. Lee, J.D. Moon, J.-H. Shin, S.-P. Suh, D.-W. Ryang, H. Kook, M.-G. Shin*',
    date: '2011-09-14',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Environ. Toxicol. Chem. 2011;30(12):2762-2770',
    link: 'https://doi.org/10.1002/etc.675',
    summaryKo: '환경 유해 발암물질인 벤젠에 폭로된 세포의 독성 반응을 추적하여, 노출량에 비례한 산화 스트레스 발생, 미토콘드리아 질량 및 DNA 복제수의 점진적 상승과 조혈세포 유래 hnRNP A2/B1 단백질의 정밀한 발현 억제를 확인하여 독성학적 스크리닝의 정밀 지표를 제시하였습니다.',
    summaryEn: 'Discovered that direct benzene exposure triggers cell-specific increases in mitochondrial DNA copy number and dramatic downregulation of hnRNP A2/B1 expression. These distinct changes serve as highly sensitive biological markers for benzene-induced hematopoietic toxicity.',
    tags: ['Benzene Toxicity', 'cfDNA Copy Number', 'hnRNP A2/B1', 'Environmental Health']
  },
  {
    id: 'paper-pre-bladder-cancer',
    type: 'paper',
    titleKo: '방광암 조기 진단을 위한 요중 박리 상피세포 미토콘드리아 DNA 돌연변이 및 복제수 분석 유용성 평가',
    titleEn: 'Analysis of fluorescence in situ hybridization, mtDNA quantification, and mtDNA sequence for the detection of early bladder cancer',
    journalKo: 'Cancer Genetics and Cytogenetics (국제 종양유전학 학술지)',
    journalEn: 'Cancer Genetics and Cytogenetics (Elsevier, SCIE)',
    authorsKo: '유종하*, 수 보름*, 박태성, 신명근*, 최영득, 이창훈, 최종락*',
    authorsEn: 'J.-H. Yoo*, B. Suh*, T.S. Park, M.-G. Shin*, Y.D. Choi, C.H. Lee, J.R. Choi*',
    date: '2010-01-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Cancer Genetics and Cytogenetics 198 (2010) 107–117',
    link: 'https://doi.org/10.1016/j.cancergencyto.2009.12.017',
    summaryKo: '방광암 조기 무침습적 요정량 검체 액체생검 진단의 핵심 프레임을 정립한 성과입니다. 요중 박리 상피세포의 복제 정량 및 mtDNA 시퀀싱을 통해 76.9% 고감도의 암 진단 유효성과 말초 혈액 대비 미토콘드리아 복제수 증폭 양상을 실증하였습니다.',
    summaryEn: 'Demonstrated highly sensitive non-invasive detection of early bladder cancer via exfoliated urinary cells. Achieved 76.9% diagnostic sensitivity by combining cytogenetic FISH, mtDNA sequencing, and deep copy number quantification.',
    tags: ['Bladder Cancer', 'Urine Liquid Biopsy', 'Exfoliated Cells', 'Non-Invasive Diagnostic']
  },
  {
    id: 'paper-pre-nasal-polyp',
    type: 'paper',
    titleKo: '만성 부비동염 및 비용종(Nasal Polyp) 조직에서의 미토콘드리아 DNA 돌연변이 및 세포 복제수 교란 규명',
    titleEn: 'Alteration of mitochondrial DNA sequence and copy number in nasal polyp tissue',
    journalKo: 'Mitochondrion (국제 미토콘드리아학회 공식 학술지)',
    journalEn: 'Mitochondrion (Elsevier, SCIE, Q1)',
    authorsKo: '박상영*, 신명근*, 김혜란*, 오지연, 김수현, 신종희, 조용범, 서순팔, 양동욱',
    authorsEn: 'S.-Y. Park*, M.-G. Shin*, H.-R. Kim*, J.-Y. Oh, S.-H. Kim, J.-H. Shin, Y.-B. Cho, S.-P. Suh, D.-W. Ryang',
    date: '2009-09-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Mitochondrion 9 (2009) 318–325',
    link: 'https://doi.org/10.1016/j.mito.2009.04.006',
    summaryKo: '이비인후과 외과 수술로 적출한 만성 비용종 조직의 미토콘드리아 DNA 염기 이종성과 복제수 이상을 추적하였습니다. 만성적인 기도의 염증으로 유도된 높은 수준의 활성산소종(ROS)이 유전자 돌연변이 유발과 더불어 세포 복제수를 유의미하게 3배 교란시키는 기전을 규명한 다학제 연구입니다.',
    summaryEn: 'Discovered somatic mtDNA mutations and copy number alterations in 57% of nasal polyp tissues. Confirmed chronic inflammation-induced reactive oxygen species (ROS) damage local mitochondria, driving a compensatory 3-fold increase in copy numbers.',
    tags: ['Nasal Polyp', 'Chronic Inflammation', 'ROS Stress', 'Otorhinolaryngology']
  },
  {
    id: 'paper-pre-aplastic-anemia',
    type: 'paper',
    titleKo: '재생불량성 빈혈 환자의 골수 세포에서 나타나는 미토콘드리아 DNA 유전체 이상 규명',
    titleEn: 'Mitochondrial DNA Aberrations of Bone Marrow Cells from Patients with Aplastic Anemia',
    journalKo: 'Journal of Korean Medical Science (대한의학회지)',
    journalEn: 'Journal of Korean Medical Science (JKMS, SCIE)',
    authorsKo: '김혜란*, 신명근, 김미지*, 김형준*, 신종희, 서순팔, 양동욱',
    authorsEn: 'H.-R. Kim*, M.-G. Shin, M.-J. Kim*, H.-J. Kim*, J.-H. Shin, S.-P. Suh, D.-W. Ryang',
    date: '2008-12-12',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'J Korean Med Sci 2008; 23: 1062-7',
    link: 'https://doi.org/10.3346/jkms.2008.23.6.1062',
    summaryKo: '재생불량성 빈혈(Aplastic Anemia) 환자의 골수 단핵세포 전장 미토콘드리아 유전체를 완전 해독하여, 조혈 기능 장애 환자에게서 빈번하게 유발되는 비동의(nonsynonymous) 유전 변이와 아미노산 서열 치환을 입증하고 조혈 세포 사멸 및 기능 부전과의 직접적 분자 연결고리를 밝혀냈습니다.',
    summaryEn: 'Analyzed the complete mitochondrial genome of bone marrow cells from patients with aplastic anemia. Identified high-frequency nonsynonymous mutations triggering amino acid alterations, suggesting a critical role of mitochondrial genome decay in marrow failure.',
    tags: ['Aplastic Anemia', 'Marrow Failure', 'Mito Genome', 'Somatic Mutation']
  },
  {
    id: 'paper-pre-h-pylori-peptic-ulcer',
    type: 'paper',
    titleKo: '헬리코박터 파일로리 감염에 따른 위점막 염증성 조직 내 미토콘드리아 게놈 돌연변이 및 유전 손상 성과',
    titleEn: 'Association between Helicobacter pylori–Related Peptic Ulcer Tissue and Somatic Mitochondrial DNA Mutations',
    journalKo: 'Clinical Chemistry (국제 임상화학 최고 권위지)',
    journalEn: 'Clinical Chemistry (AACC, Q1 / IF: 9.3)',
    authorsKo: '이숭, 신명근*, 조원형, 김미지, 김혜란, 이완식, 박동호, 원종훈, 신종희, 서순팔, 양동욱',
    authorsEn: 'S. Lee, M.-G. Shin*, W.-H. Jo, M.-J. Kim, H.-R. Kim, W.-S. Lee, D.-H. Park, J.-H. Won, J.-H. Shin, S.-P. Suh, D.-W. Ryang',
    date: '2007-07-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Clinical Chemistry 53, No. 7, 2007',
    link: 'https://doi.org/10.1373/clinchem.2007.085894',
    summaryKo: '장기적인 위궤양 및 위염증 상태에서 축적된 체세포 mtDNA 돌연변이를 다각도 시퀀싱하여 규명하였습니다. 감염에 따른 고농도 유해 산소 노출과 위 상피 유해 변이 누적이 미토콘드리아 에너지 대사 기전을 손상시키는 직접적인 분자 궤적을 확인한 논문입니다.',
    summaryEn: 'Identified somatic mtDNA control region and Cytb mutations in 44% of chronic gastric ulcer tissues. Proved H. pylori-driven inflammation elevates local hydrogen peroxide (ROS) causing mitochondrial bioenergetic collapse and cellular decay.',
    tags: ['Helicobacter pylori', 'Peptic Ulcer', 'Mito DNA Mutation', 'ROS Pathology']
  },
  {
    id: 'paper-pre-atrial-fibrillation',
    type: 'paper',
    titleKo: '만성 심방세동(Atrial Fibrillation) 환자의 심방 조직에서 나타나는 체세포 미토콘드리아 DNA 유전 손상 발굴',
    titleEn: 'Chronic atrial fibrillation associated with somatic mitochondrial DNA mutations in human atrial tissue',
    journalKo: 'Journal of Clinical Pathology (국제 진단병리학 최우수 학술지)',
    journalEn: 'Journal of Clinical Pathology (BMJ, SCIE)',
    authorsKo: '박형욱, 안영근, 정명호, 조정관, 박종춘, 강정채, 신명근*, 신종희, 서순팔, 양동욱, 김남호, 최종범, 김혜란',
    authorsEn: 'H.-W. Park, Y. Ahn, M.-H. Jeong, J.-G. Cho, J.-C. Park, J.-C. Kang, M.-G. Shin*, J.-H. Shin, S.-P. Suh, D.-W. Ryang, N.-H. Kim, J.-B. Choi, H.-R. Kim',
    date: '2007-05-25',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'J Clin Pathol 2007;60:948–950',
    link: 'https://doi.org/10.1136/jcp.2006.037473',
    summaryKo: '수술로 획득한 심방 세포를 활용해 미토콘드리아 전장 변이 및 9-bp 대량 결실 등의 조절 이상을 발굴하고, 심근 수축 장애와 전기적 전도 장애 리모델링 메커니즘 하에서 발생하는 미토콘드리아 유전 손상과의 인과성을 규명하였습니다.',
    summaryEn: 'Discovered somatic mitochondrial DNA mutations and a 9-bp deletion in left atrial appendages of chronic atrial fibrillation (cAF) patients. Proved cardiac remodeling accumulates structural and length heteroplasmy defects due to oxidative workloads.',
    tags: ['Atrial Fibrillation', 'Cardiomyopathy', 'Mito Mutation', 'Cardiac Remodeling']
  },
  {
    id: 'paper-pre-chimerism-marker',
    type: 'paper',
    titleKo: '동종 조혈모세포 이식 환자의 미소 키메리즘(Chimerism) 정량 분석을 위한 미토콘드리아 DNA 미니위성 지표 개발',
    titleEn: 'Mitochondrial DNA minisatellites as new markers for the quantitative determination of hematopoietic chimerism after allogeneic stem cell transplantation',
    journalKo: 'Leukemia (국제 혈액종양학 최고 권위지)',
    journalEn: 'Leukemia (Nature Publishing Group, Q1 / IF: 12.8)',
    authorsKo: '신명근*, 김혜정, 김혜란, 이일권, 국훈, 조덕, 기승정, 신종희, 서순팔, 양동욱',
    authorsEn: 'M.-G. Shin*, H.-J. Kim, H.-R. Kim, I.-K. Lee, H. Kook, D. Cho, S.-J. Kee, J.-H. Shin, S.-P. Suh, D.-W. Ryang',
    date: '2007-03-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Leukemia (2007) 21, 369–373',
    link: 'https://doi.org/10.1038/sj.leu.2404502',
    summaryKo: '조혈모세포 이식편(Graft)의 정상 생착과 미세 잔존 백혈병(MRD)을 모니터링하기 위해, 다형성이 우수한 미토콘드리아 조절구 영역(poly-C)의 미니위성(mtMS) 마커 분석기법을 확립하였습니다. 극미량 및 분해된 DNA 샘플 조건에서 일반 핵 DNA STR 마커보다 월등하게 높은 민감도와 분석 정확도를 입증하여 종양 예후 기술의 전기를 마련하였습니다.',
    summaryEn: 'Established novel mitochondrial DNA minisatellite (mtMS) markers to quantitatively analyze donor chimerism post-transplantation. Due to multi-copy mitochondrial amplification, these markers show vastly superior sensitivity over nuclear STR markers under low-volume or degraded DNA conditions.',
    tags: ['Stem Cell Transplant', 'Chimerism Analysis', 'mtMS Markers', 'MRD Assay']
  },
  {
    id: 'paper-pre-length-heteroplasmy-korean',
    type: 'paper',
    titleKo: '한국인 집단의 혈액 세포 내 미토콘드리아 DNA 조절 영역의 유전자 길이 이질성(Length Heteroplasmy) 프로파일링',
    titleEn: 'Profiling of length heteroplasmies in the human mitochondrial DNA control regions from blood cells in the Korean population',
    journalKo: 'Electrophoresis (국제 분리분석 과학 최고 학술지)',
    journalEn: 'Electrophoresis (Wiley, SCIE, Q1)',
    authorsKo: '신명근*, 바바라 C. 레빈, 김혜웅*, 김혜란, 이일권, 조덕, 기승정, 신종희, 서순팔, 양동욱',
    authorsEn: 'M.-G. Shin*, B.C. Levin, H.-J. Kim*, H.-R. Kim, I.-K. Lee, D. Cho, S.-J. Kee, J.-H. Shin, S.-P. Suh, D.-W. Ryang',
    date: '2006-04-01',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Electrophoresis 2006, 27, 1331–1340',
    link: 'https://doi.org/10.1002/elps.200500551',
    summaryKo: '한국인 인구 집단의 미토콘드리아 조절구(poly-C 부위) 이질성 프로파일을 집대성한 연구입니다. 2bp 이상의 심한 프레임시프트 및 이질성 비율이 미토콘드리아의 전체 게놈 복제 효율을 2배 이상 떨어트리는 원인임을 정량적 PCR로 면밀하게 밝혔습니다.',
    summaryEn: 'Profiled the exact landscape of length heteroplasmies in the mtDNA control region among Koreans. Discovered that severe poly-C tract frameshifts (>=2bp) trigger a significant reduction in copy number, demonstrating biological constraints on replication.',
    tags: ['Length Heteroplasmy', 'Mito Replication', 'Poly-C Tract', 'Korean Baseline']
  },
  {
    id: 'paper-pre-circulating-cd34',
    type: 'paper',
    titleKo: '말초혈액 내 순환 조혈모세포(CD34+) 및 과립구 단일 세포에서의 미토콘드리아 DNA 유전적 이질성 축적 규명',
    titleEn: 'Mitochondrial DNA sequence heterogeneity in circulating normal human CD34 cells and granulocytes',
    journalKo: 'Blood (국제 혈액학 최고 권위지)',
    journalEn: 'Blood (American Society of Hematology, Q1 / IF: 20.3)',
    authorsKo: '신명근, 사치코 카지기야, 막달레나 타르노브카, 제이 필립 맥코이 주니어, 바바라 C. 레빈, 닐 S. 영',
    authorsEn: 'M.G. Shin, S. Kajigaya, M. Tarnowka, J.P. McCoy Jr, B.C. Levin, N.S. Young',
    date: '2004-06-15',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Blood. 2004;103(12):4466-4477',
    link: 'https://doi.org/10.1182/blood-2003-11-3949',
    summaryKo: '말초혈액 유래 단일 CD34+ 줄기세포 클론과 성숙 과립구 세포의 mtDNA 제어 부위를 미세 비교하여, 조혈 줄기세포의 유전적 변이가 성숙한 혈액 세포인 후손 과립구까지 그대로 확장 및 보존되는 과정을 완벽히 추적해냄으로써, 비침습적 혈액 분석으로 골수 줄기세포 동태를 추정할 수 있음을 규명하였습니다.',
    summaryEn: 'Executed meticulous single-cell sequencing comparing circulating CD34+ stem/progenitor cells and mature granulocytes. Confirmed clonal lineage transmission where daughter granulocytes preserve the somatic mtDNA mutation profile of progenitor cells, enabling non-invasive stem cell dynamics tracking.',
    tags: ['Circulating CD34+', 'Single-Cell', 'Clonal Expansion', 'Lineage Tracking']
  },
  {
    id: 'paper-pre-marrow-cd34',
    type: 'paper',
    titleKo: '정상 성인 골수 유래 단일 CD34+ 세포 클론에서 미토콘드리아 DNA 염기서열의 뚜렷한 이질성 규명',
    titleEn: 'Marked mitochondrial DNA sequence heterogeneity in single CD34+ cell clones from normal adult bone marrow',
    journalKo: 'Blood (국제 혈액학 최고 권위지)',
    journalEn: 'Blood (American Society of Hematology, Q1 / IF: 20.3)',
    authorsKo: '신명근, 사치코 카지기야, 제이 필립 맥코이 주니어, 바바라 C. 레빈, 닐 S. 영',
    authorsEn: 'M.G. Shin, S. Kajigaya, J.P. McCoy Jr, B.C. Levin, N.S. Young',
    date: '2004-01-15',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Blood. 2004;103: 553-561',
    link: 'https://doi.org/10.1182/blood-2003-05-1724',
    summaryKo: '급성 백혈병 환자의 골수 유래 단일 세포 전사체 데이터 분석과 정상 성인 골수 세포 이질성 규명의 학술적 모태가 된 연구입니다. 성인 골수 유래 단일 CD34+ 줄기세포 클론의 mtDNA 제어 부위를 고해상도로 분석함으로써 조혈모세포 분화 과정 및 노화에 따른 체세포 돌연변이 축적 현상과 이질성(Heteroplasmy)을 세계 최초 최초 수준으로 확인하였습니다.',
    summaryEn: 'Reveals significant mitochondrial DNA (mtDNA) sequence heterogeneity among individual adult bone marrow CD34+ clones. This seminal paper establishes that age-dependent accumulation of somatic mtDNA mutations and clonal expansion occur in mitotically active human tissues, offering a powerful natural genetic marker for hematopoiesis.',
    tags: ['Mitochondrial DNA', 'CD34+ Clones', 'Hematopoiesis', 'Somatic Mutation']
  },
  {
    id: 'paper-pre-mds-mutations',
    type: 'paper',
    titleKo: '골수이형성증후군(MDS) 환자의 미토콘드리아 게놈 전장 분석을 통한 유전자 돌연변이 및 이질성 규명',
    titleEn: 'Mitochondrial DNA mutations in patients with myelodysplastic syndromes',
    journalKo: 'Blood (국제 혈액학 최고 권위지)',
    journalEn: 'Blood (American Society of Hematology, Q1 / IF: 20.3)',
    authorsKo: '신명근, 사치코 카지기야, 바바라 C. 레빈, 닐 S. 영',
    authorsEn: 'M.G. Shin, S. Kajigaya, B.C. Levin, N.S. Young',
    date: '2003-04-15',
    statusKo: '게재 완료',
    statusEn: 'Published',
    number: 'Blood. 2003;101(8):3118-3125',
    link: 'https://doi.org/10.1182/blood-2002-06-1825',
    summaryKo: '미국 국립보건원(NIH) 연구팀과의 협력을 통해 골수이형성증후군(MDS) 환자의 전장 미토콘드리아 유전체를 전면 해독하여, 정상 대조군과 대조되는 체세포 소수 돌연변이 패턴과 30개의 신규 염기 치환 변이를 탐지하고 이들 중 임상 진행에 미치는 아미노산 서열 치환 부위의 영향을 명확하게 규명하였습니다.',
    summaryEn: 'A high-impact collaboration with the NIH team executing complete mitochondrial genome sequencing in myelodysplastic syndrome (MDS) patients. Unveiled somatic mtDNA mutations and novel nucleotide substitutions, charting out mitochondrial genomic decay in marrow insufficiency.',
    tags: ['MDS', 'Marrow Failure', 'Full Genome sequencing', 'Somatic Mutation']
  }
];

export default function PapersPatents({ lang }: PapersPatentsProps) {
  const [activePeriod, setActivePeriod] = useState<'after' | 'before'>('after');
  const [activeTab, setActiveTab] = useState<'all' | 'paper' | 'patent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<IPItem | null>(null);

  // Persistence States
   const [customIP, setCustomIP] = useState<IPItem[]>([]);
  const [deletedIPIds, setDeletedIPIds] = useState<string[]>([]);

  useEffect(() => {
    const loadSupabaseData = async () => {
      const { data: ipData, error: ipError } = await supabase
        .from('papers_patents')
        .select('*')
        .order('date', { ascending: false });

      if (ipError) {
        console.error('Failed to load papers/patents:', ipError);
      } else {
        setCustomIP(
          (ipData || []).map((item) => ({
            id: item.id,
            type: item.type,
            titleKo: item.title_ko,
            titleEn: item.title_en,
            journalKo: item.journal_ko,
            journalEn: item.journal_en,
            authorsKo: item.authors_ko || '',
            authorsEn: item.authors_en || '',
            date: item.date,
            statusKo: item.status_ko,
            statusEn: item.status_en,
            number: item.number || '',
            summaryKo: item.summary_ko,
            summaryEn: item.summary_en,
            link: item.link || '',
            tags: item.tags || [],
            isCustom: item.is_custom,
          }))
        );
      }

      const { data: deletedData, error: deletedError } = await supabase
        .from('deleted_ip_ids')
        .select('id');

      if (deletedError) {
        console.error('Failed to load deleted IP ids:', deletedError);
      } else {
        setDeletedIPIds((deletedData || []).map((item) => item.id));
      }
    };

    loadSupabaseData();
  }, []);

  // Form States for creation
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newType, setNewType] = useState<'paper' | 'patent'>('paper');
  const [newTitleKo, setNewTitleKo] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newJournalKo, setNewJournalKo] = useState('');
  const [newJournalEn, setNewJournalEn] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newStatusKo, setNewStatusKo] = useState('');
  const [newStatusEn, setNewStatusEn] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSummaryKo, setNewSummaryKo] = useState('');
  const [newSummaryEn, setNewSummaryEn] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newTagsString, setNewTagsString] = useState('');

  // Password & Verification States
  const [createPassword, setCreatePassword] = useState('');
  const [createPasswordError, setCreatePasswordError] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [deletePasswordError, setDeletePasswordError] = useState('');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const openCreateModal = () => {
    const today = new Date().toISOString().split('T')[0];
    setNewType('paper');
    setNewTitleKo('');
    setNewTitleEn('');
    setNewJournalKo('');
    setNewJournalEn('');
    setNewDate(today);
    setNewStatusKo('');
    setNewStatusEn('');
    setNewNumber('');
    setNewSummaryKo('');
    setNewSummaryEn('');
    setNewLink('');
    setNewTagsString('');
    setCreatePassword('');
    setCreatePasswordError('');
    setIsCreateModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setDeletePassword('');
    setDeletePasswordError('');
    setItemToDelete(id);
  };

  const ipData = useMemo(() => {
    return [...customIP, ...IP_DATA].filter(item => !deletedIPIds.includes(item.id));
  }, [customIP, deletedIPIds]);

  // Dynamic filter based on period, tab & query
  const filteredData = useMemo(() => {
    return ipData.filter(item => {
      // Period filter: 2020 is the founding year
      const year = parseInt(item.date.split('-')[0], 10);
      if (activePeriod === 'after' && year < 2020) {
        return false;
      }
      if (activePeriod === 'before' && year >= 2020) {
        return false;
      }

      // Tab filter
      if (activeTab !== 'all' && item.type !== activeTab) {
        return false;
      }
      
      // Query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = (lang === 'ko' ? item.titleKo : item.titleEn).toLowerCase().includes(q);
      const matchJournal = (lang === 'ko' ? item.journalKo : item.journalEn).toLowerCase().includes(q);
      const matchNumber = item.number?.toLowerCase().includes(q) || false;
      const matchTags = item.tags.some(tag => tag.toLowerCase().includes(q));

      return matchTitle || matchJournal || matchNumber || matchTags;
    });
  }, [ipData, activePeriod, activeTab, searchQuery, lang]);

  // Stat summary
  const stats = useMemo(() => {
    const totalPapers = ipData.filter(i => i.type === 'paper').length;
    const totalPatents = ipData.filter(i => i.type === 'patent').length;
    return {
      papers: totalPapers,
      patents: totalPatents,
      registered: ipData.filter(i => i.type === 'patent' && (i.statusKo.includes('등록') || i.statusEn.includes('Registered'))).length,
      pending: ipData.filter(i => i.type === 'patent' && (i.statusKo.includes('출원') || i.statusEn.includes('Pending'))).length,
    };
  }, [ipData]);

  return (
    <div className="bg-slate-50 min-h-screen py-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a2d74] text-white py-16 sm:py-20 md:py-24">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.9),rgba(15,23,42,0.3))]" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-sky-500/20 text-sky-300 mb-6 border border-sky-500/30">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Intellectual Property</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {lang === 'ko' ? (
                <>논문 및 지적재산 공시</>
              ) : (
                <>IP & Scientific Publications</>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
              {lang === 'ko' ? (
                '케이블루바이오는 미토콘드리아 전사체 정밀 진단 및 암 타겟 신약 물질 등 독자적으로 발굴한 혁신적 과학적 지적재산(IP)의 투명한 공시를 추구합니다.'
              ) : (
                'KBlueBio pursues transparent publication of independently discovered scientific intellectual property (IP), including mitochondrial transcriptome diagnostics and targeted cancer therapeutics.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Board Section */}
      <section className="relative -mt-10 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-lg">
          <div className="text-center p-3 border-r border-slate-100 last:border-0 md:border-r">
            <div className="flex justify-center mb-1">
              <BookOpen className="w-5 h-5 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stats.papers}건</div>
            <div className="text-xs text-slate-500 mt-1.5 font-bold tracking-tight">
              {lang === 'ko' ? 'SCI 학술지 논문 게재' : 'SCI Journal Papers'}
            </div>
          </div>

          <div className="text-center p-3 border-slate-100 md:border-r last:border-0">
            <div className="flex justify-center mb-1">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stats.patents}건</div>
            <div className="text-xs text-slate-500 mt-1.5 font-bold tracking-tight">
              {lang === 'ko' ? '총 보유 특허 파이프라인' : 'Total Patent Pipelines'}
            </div>
          </div>

          <div className="text-center p-3 border-r border-slate-100 last:border-0">
            <div className="flex justify-center mb-1">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stats.registered}건</div>
            <div className="text-xs text-slate-500 mt-1.5 font-bold tracking-tight">
              {lang === 'ko' ? '공식 특허 등록 완료' : 'Registered Patents'}
            </div>
          </div>

          <div className="text-center p-3 last:border-0">
            <div className="flex justify-center mb-1">
              <Activity className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stats.pending}건</div>
            <div className="text-xs text-slate-500 mt-1.5 font-bold tracking-tight">
              {lang === 'ko' ? '국내/해외 특허 출원 중' : 'Pending Applications'}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Table & Filter Board Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Period Selector Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setActivePeriod('after'); setActiveTab('all'); }}
            className={`pb-4 px-6 font-bold text-sm sm:text-base tracking-tight border-b-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activePeriod === 'after'
                ? 'border-[#0a2d74] text-[#0a2d74]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'ko' ? '창업 후 성과 (2020년 ~ 현재)' : 'Post-Founding Achievements (2020 ~ Present)'}
          </button>
          <button
            onClick={() => { setActivePeriod('before'); setActiveTab('all'); }}
            className={`pb-4 px-6 font-bold text-sm sm:text-base tracking-tight border-b-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activePeriod === 'before'
                ? 'border-[#0a2d74] text-[#0a2d74]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'ko' ? '창업 전 연구 성과 (~ 2019년)' : 'Pre-Founding Foundations (~ 2019)'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          {/* Tabs Filter */}
          <div className="flex p-1 bg-slate-200/60 rounded-xl max-w-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 text-center py-2.5 px-4 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                activeTab === 'all' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ko' ? '전체 보기' : 'Show All'}
            </button>
            <button
              onClick={() => setActiveTab('paper')}
              className={`flex-1 text-center py-2.5 px-4 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                activeTab === 'paper' 
                  ? 'bg-white text-sky-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ko' ? '학술 논문' : 'Papers'}
            </button>
            <button
              onClick={() => setActiveTab('patent')}
              className={`flex-1 text-center py-2.5 px-4 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                activeTab === 'patent' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ko' ? '특허 기술' : 'Patents'}
            </button>
          </div>

          {/* Search bar & Write button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-xl w-full">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ko' ? '제목, 발행처, 번호 검색...' : 'Search title, journal, patents...'}
                className="block w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs placeholder-slate-400 transition-all"
              />
            </div>
            <button
              onClick={() => openCreateModal()}
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#0a2d74] text-white hover:bg-[#071f50] text-sm font-bold shadow-xs transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ko' ? '신규 등록' : 'Register New'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic List Grid with Animations */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all group flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                  <div className="flex-1">
                    {/* Upper row: Tag and status badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {item.type === 'paper' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100">
                          <FileText className="w-3.5 h-3.5 mr-1 text-sky-500" />
                          {lang === 'ko' ? '연구 논문' : 'Research Paper'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <Award className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                          {lang === 'ko' ? '특허 지식재산' : 'Patent IP'}
                        </span>
                      )}

                      <span className={`px-2 py-1 text-[11px] font-bold rounded-md ${
                        item.statusKo.includes('등록') || item.statusEn.includes('Published')
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {lang === 'ko' ? item.statusKo : item.statusEn}
                      </span>
                      
                      {/* Date */}
                      <span className="flex items-center text-xs text-slate-400 ml-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 group-hover:text-sky-900 transition-colors tracking-tight leading-snug mb-3">
                      {lang === 'ko' ? item.titleKo : item.titleEn}
                    </h3>

                    {/* Meta info: Journal & Authors */}
                    {item.type === 'paper' && (
                      <div className="text-xs text-slate-500 mb-4 border-b border-slate-100 pb-4">
                        <span className="font-bold text-slate-400 mr-1.5">{lang === 'ko' ? '발행처/조직:' : 'Published in:'}</span>
                        <span className="font-semibold text-slate-700">{lang === 'ko' ? item.journalKo : item.journalEn}</span>
                      </div>
                    )}

                    {/* Summary Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
                      {lang === 'ko' ? item.summaryKo : item.summaryEn}
                    </p>

                    {/* Item Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="bg-slate-50 px-2 py-1 rounded-md text-[10px] text-slate-500 border border-slate-100 font-semibold uppercase tracking-wider">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex flex-row md:flex-col justify-end items-center gap-3 md:self-stretch md:justify-between border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                    <div className="text-right hidden md:block text-slate-400 text-xs font-mono">
                      ID: {item.id.toUpperCase()}
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="flex-1 md:flex-initial text-center px-4 py-2.5 rounded-lg text-xs font-extrabold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors tracking-tight cursor-pointer"
                      >
                        {lang === 'ko' ? '상세 분석 보기' : 'Detailed Analysis'}
                      </button>

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors flex items-center justify-center border border-sky-100"
                          title={lang === 'ko' ? '학술 논문 원문(DOI)으로 이동' : 'Go to DOI original article'}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}

                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="p-2.5 rounded-lg border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 text-slate-400 hover:text-rose-600 transition-colors flex items-center justify-center cursor-pointer"
                        title={lang === 'ko' ? '삭제' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h4 className="text-base font-bold text-slate-800 mb-1">
              {lang === 'ko' ? '검색 결과가 없습니다' : 'No Results Found'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'ko' 
                ? '다른 키워드로 검색해보시거나, 상단 탭 필터를 다르게 조정해 보세요.' 
                : 'Try searching for different keywords or check your tab filters.'}
            </p>
          </div>
        )}
      </section>

      {/* Structured IP Pipeline Section */}
      <section className="bg-slate-100/50 py-16 sm:py-20 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase bg-sky-50 px-3 py-1.5 rounded-full">
              Core R&D IP Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2d5a] tracking-tight leading-tight mt-4">
              {lang === 'ko' ? '특허 중심의 기술 보호 장벽 구축' : 'Patent-Driven Technical Barriers'}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mt-4 font-normal">
              {lang === 'ko' 
                ? '케이블루바이오는 차세대 백혈병 전사체 분류 패널, 미토콘드리아 1% 이하 소수 변이(Minor Heteroplasmy) 극초 감도 검출 장치 및 차세대 백혈병 타겟 신약 KBB-N1에 이르는 강력한 특허 방어선을 구축하고 있습니다.' 
                : 'KBlueBio actively builds robust patent defenses across next-generation leukemia molecular profiling panels, high-resolution cfDNA heteroplasmy assays, and the target-therapeutics portfolio.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-5 border border-sky-100">
                <Layers className="w-5 h-5 text-sky-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                {lang === 'ko' ? '미토콘드리아 RNA 수치 계측' : 'Mito RNA Quantification'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {lang === 'ko'
                  ? '세계 최초로 급성 백혈병 환자의 미토콘드리아 RNA 전사체 변동성을 NGS 검사 패널 기반으로 계측 및 자동 리포팅하는 특허 패밀리.'
                  : 'A world-first proprietary patent family evaluating mitochondrial transcript variances of leukemia patients via custom NGS diagnostic assays.'}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 border border-emerald-100">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                {lang === 'ko' ? '1% 소수 변이 노이즈 배제' : '1% Minor Heteroplasmy Detection'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {lang === 'ko'
                  ? '혈액 내 극미량의 cell-free DNA(cfDNA) 분석과 시퀀싱 증폭 에러를 완전 배제해 1% 미만 변이를 분별하는 초미량 액체생검 특허.'
                  : 'Liquid biopsy assays engineered to eliminate background amplification noise and verify minor heteroplasmy variants below 1% in serum.'}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5 border border-blue-100">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                {lang === 'ko' ? '미토콘드리아 OxPhos 제어 신약' : 'Target Therapeutics (OxPhos)'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {lang === 'ko'
                  ? '백혈병 내성 원인인 암세포 특이적 미토콘드리아 대사를 정밀 저해하는 KBB-N1 합성 및 전임상 유효 검증을 방어하는 특허 청구.'
                  : 'Active pharmaceutical compound patent applications shielding physical synthesis and biological validation of our targeted candidate KBB-N1.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Analysis Modal Popup */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-slate-950"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-2xl relative shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Top Banner Accent */}
              <div className={`h-2.5 w-full ${selectedItem.type === 'paper' ? 'bg-sky-600' : 'bg-emerald-600'}`} />

              <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
                {/* Meta details */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                    selectedItem.type === 'paper' 
                      ? 'bg-sky-50 text-sky-700' 
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {selectedItem.type === 'paper' 
                      ? (lang === 'ko' ? '학술 논문 분석' : 'Academic Article')
                      : (lang === 'ko' ? '특허 지식재산' : 'Registered Patent')
                    }
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const id = selectedItem.id;
                        setSelectedItem(null);
                        openDeleteModal(id);
                      }}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                      title={lang === 'ko' ? '삭제' : 'Delete'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                      title={lang === 'ko' ? '닫기' : 'Close'}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Main titles inside Modal */}
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                  {lang === 'ko' ? selectedItem.titleKo : selectedItem.titleEn}
                </h3>
                
                {lang === 'ko' && selectedItem.titleKo !== selectedItem.titleEn && (
                  <p className="text-xs text-slate-400 italic font-medium mb-6">
                    {selectedItem.titleEn}
                  </p>
                )}

                {/* Grid stats */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {selectedItem.type === 'paper' && (
                    <div>
                      <span className="block font-bold text-slate-400 mb-1">{lang === 'ko' ? '발행처 / 지식재산 처' : 'Publisher Agency'}</span>
                      <span className="font-semibold text-slate-800 leading-normal">{lang === 'ko' ? selectedItem.journalKo : selectedItem.journalEn}</span>
                    </div>
                  )}
                  <div>
                    <span className="block font-bold text-slate-400 mb-1">
                      {selectedItem.type === 'paper' 
                        ? (lang === 'ko' ? '등재 상태 / 피인용 지수' : 'Efficacy / Status')
                        : (lang === 'ko' ? '특허 상태' : 'Patent Status')
                      }
                    </span>
                    <span className="font-semibold text-sky-700 leading-normal">{lang === 'ko' ? selectedItem.statusKo : selectedItem.statusEn}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 mb-1">
                      {selectedItem.type === 'paper' 
                        ? (lang === 'ko' ? '식별 번호 (DOI)' : 'DOI Number')
                        : (lang === 'ko' ? '출원/등록 번호' : 'Patent App/Reg Number')
                      }
                    </span>
                    <span className="font-semibold text-slate-800 font-mono leading-normal">{selectedItem.number || '-'}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 mb-1">{lang === 'ko' ? '공시 일자' : 'Publication Date'}</span>
                    <span className="font-semibold text-slate-800 leading-normal">{selectedItem.date}</span>
                  </div>
                </div>

                {/* Abstract Text block */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-800 tracking-wider uppercase mb-2">
                    {lang === 'ko' ? '지적재산 기술 상세 요약 (Abstract)' : 'Detailed Analysis Summary (Abstract)'}
                  </h4>
                  <div className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal bg-sky-50/20 p-5 rounded-2xl border border-sky-100/30">
                    {lang === 'ko' ? selectedItem.summaryKo : selectedItem.summaryEn}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedItem.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-slate-100 px-2.5 py-1 rounded-md text-[10px] text-slate-600 font-semibold border border-slate-200/50 uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal footer action */}
              <div className="bg-slate-50 p-5 sm:px-8 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '창 닫기' : 'Close Details'}
                </button>
                {selectedItem.link && (
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-100 transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>{lang === 'ko' ? '논문 정식 원문 열기' : 'Open Full Article'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create IP Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="fixed inset-0 bg-slate-950"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-2xl relative shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="h-2 w-full bg-[#0a2d74]" />
              
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {lang === 'ko' ? '신규 지적재산 등록' : 'Register New Intellectual Property'}
                  </h3>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form id="create-ip-form" className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newTitleKo.trim() || !newTitleEn.trim() || !newSummaryKo.trim() || !newSummaryEn.trim()) return;

                  if (createPassword !== '2027') {
                    setCreatePasswordError(lang === 'ko' ? '비밀번호가 올바르지 않습니다.' : 'Incorrect password.');
                    return;
                  }

                  const generatedId = `custom-ip-${Date.now()}`;
                  const tags = newTagsString
                    ? newTagsString.split(',').map(t => t.trim()).filter(Boolean)
                    : [];

                  const newIPItem: IPItem = {
                    id: generatedId,
                    type: newType,
                    titleKo: newTitleKo,
                    titleEn: newTitleEn,
                    journalKo: newType === 'paper' ? newJournalKo : '',
                    journalEn: newType === 'paper' ? newJournalEn : '',
                    authorsKo: '',
                    authorsEn: '',
                    date: newDate || new Date().toISOString().split('T')[0],
                    statusKo: newStatusKo || (newType === 'paper' ? '게재 완료' : '특허 등록 완료'),
                    statusEn: newStatusEn || (newType === 'paper' ? 'Published' : 'Patent Registered'),
                    number: newNumber || undefined,
                    summaryKo: newSummaryKo,
                    summaryEn: newSummaryEn,
                    link: newLink || undefined,
                    tags: tags
                  };

                                                    const { error } = await supabase.from('papers_patents').insert({
                    id: newIPItem.id,
                    type: newIPItem.type,
                    title_ko: newIPItem.titleKo,
                    title_en: newIPItem.titleEn,
                    journal_ko: newIPItem.journalKo || '',
                    journal_en: newIPItem.journalEn || '',
                    authors_ko: newIPItem.authorsKo || '',
                    authors_en: newIPItem.authorsEn || '',
                    date: newIPItem.date,
                    status_ko: newIPItem.statusKo,
                    status_en: newIPItem.statusEn,
                    number: newIPItem.number || '',
                    summary_ko: newIPItem.summaryKo,
                    summary_en: newIPItem.summaryEn,
                    link: newIPItem.link || '',
                    tags: newIPItem.tags || [],
                    is_custom: true,
                  });

                  if (error) {
                    console.error('Failed to save papers/patents:', error);
                    alert('Supabase 저장 중 오류가 발생했습니다.');
                    return;
                  }

                  const updatedCustom = [newIPItem, ...customIP];
                  setCustomIP(updatedCustom);
                  
                  setIsCreateModalOpen(false);
                }}>
                  {/* Type Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      {lang === 'ko' ? '구분' : 'Type'}
                    </label>
                    <div className="flex p-1 bg-slate-100 rounded-lg max-w-xs">
                      <button
                        type="button"
                        onClick={() => setNewType('paper')}
                        className={`flex-1 text-center py-1.5 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                          newType === 'paper' 
                            ? 'bg-white text-sky-600 shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {lang === 'ko' ? '학술 논문' : 'Research Paper'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewType('patent')}
                        className={`flex-1 text-center py-1.5 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                          newType === 'patent' 
                            ? 'bg-white text-emerald-600 shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {lang === 'ko' ? '특허 기술' : 'Patent IP'}
                      </button>
                    </div>
                  </div>

                  {/* Title Ko & En */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">
                        {lang === 'ko' ? '제목 (국문)' : 'Title (Korean)'}
                      </label>
                      <input
                        type="text"
                        value={newTitleKo}
                        onChange={(e) => setNewTitleKo(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                        placeholder={lang === 'ko' ? '국문 제목을 입력하세요' : 'Enter Korean title'}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">
                        {lang === 'ko' ? '제목 (영문)' : 'Title (English)'}
                      </label>
                      <input
                        type="text"
                        value={newTitleEn}
                        onChange={(e) => setNewTitleEn(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                        placeholder={lang === 'ko' ? '영문 제목을 입력하세요' : 'Enter English title'}
                        required
                      />
                    </div>
                  </div>

                  {/* Journal Ko & En - ONLY for paper */}
                  {newType === 'paper' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5">
                          {lang === 'ko' ? '발행처/학술지 (국문)' : 'Publisher/Journal (Korean)'}
                        </label>
                        <input
                          type="text"
                          value={newJournalKo}
                          onChange={(e) => setNewJournalKo(e.target.value)}
                          className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                          placeholder={lang === 'ko' ? '예: 학술지명 등' : 'e.g. Journal name'}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5">
                          {lang === 'ko' ? '발행처/학술지 (영문)' : 'Publisher/Journal (English)'}
                        </label>
                        <input
                          type="text"
                          value={newJournalEn}
                          onChange={(e) => setNewJournalEn(e.target.value)}
                          className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                          placeholder={lang === 'ko' ? '예: Elsevier 등' : 'e.g. Publisher/Journal name'}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Date, Status Ko, Status En, Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">
                        {lang === 'ko' ? '공시 일자' : 'Publication Date'}
                      </label>
                      <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">
                        {newType === 'paper' 
                          ? (lang === 'ko' ? '식별 번호 (DOI)' : 'DOI Number')
                          : (lang === 'ko' ? '출원/등록 번호' : 'App/Reg Number')
                        }
                      </label>
                      <input
                        type="text"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                        placeholder={newType === 'paper' ? 'e.g. 10.1016/j.snb...' : 'e.g. 10-2024-xxxxxxx'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">
                        {lang === 'ko' ? '상태 (국문)' : 'Status (Korean)'}
                      </label>
                      <input
                        type="text"
                        value={newStatusKo}
                        onChange={(e) => setNewStatusKo(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                        placeholder={newType === 'paper' ? '예: 게재 완료 (IF: 8.4)' : '예: 특허 등록 완료'}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">
                        {lang === 'ko' ? '상태 (영문)' : 'Status (English)'}
                      </label>
                      <input
                        type="text"
                        value={newStatusEn}
                        onChange={(e) => setNewStatusEn(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                        placeholder={newType === 'paper' ? 'e.g. Published (IF: 8.4)' : 'e.g. Patent Registered'}
                        required
                      />
                    </div>
                  </div>

                  {/* Summary Ko & En */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      {lang === 'ko' ? '상세 요약 (국문)' : 'Summary (Korean)'}
                    </label>
                    <textarea
                      value={newSummaryKo}
                      onChange={(e) => setNewSummaryKo(e.target.value)}
                      rows={3}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all resize-none"
                      placeholder={lang === 'ko' ? '연구 또는 특허 기술의 핵심 요약을 국문으로 입력하세요.' : 'Enter summary in Korean'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      {lang === 'ko' ? '상세 요약 (영문)' : 'Summary (English)'}
                    </label>
                    <textarea
                      value={newSummaryEn}
                      onChange={(e) => setNewSummaryEn(e.target.value)}
                      rows={3}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all resize-none"
                      placeholder={lang === 'ko' ? '연구 또는 특허 기술의 핵심 요약을 영문으로 입력하세요.' : 'Enter summary in English'}
                      required
                    />
                  </div>

                  {/* Link & Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">
                        {lang === 'ko' ? '원문 링크 (URL)' : 'Original Link (URL)'}
                      </label>
                      <input
                        type="url"
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">
                        {lang === 'ko' ? '태그 (쉼표로 구분)' : 'Tags (comma separated)'}
                      </label>
                      <input
                        type="text"
                        value={newTagsString}
                        onChange={(e) => setNewTagsString(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
                        placeholder="e.g. Creatinine POCT, Diagnostics"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      {lang === 'ko' ? '게시글 비밀번호 / 권한 비밀번호를 입력하세요' : 'Enter authority password'}
                    </label>
                    <input
                      type="password"
                      value={createPassword}
                      onChange={(e) => {
                        setCreatePassword(e.target.value);
                        setCreatePasswordError('');
                      }}
                      className={`w-full text-sm bg-slate-50 border ${createPasswordError ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-sky-500'} rounded-lg px-3 py-2 focus:outline-none focus:bg-white transition-all`}
                      placeholder={lang === 'ko' ? '비밀번호를 입력하세요' : 'Enter password'}
                      required
                    />
                    {createPasswordError && (
                      <p className="text-xs text-rose-500 mt-1 font-semibold">{createPasswordError}</p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                    >
                      {lang === 'ko' ? '취소' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold bg-[#0a2d74] text-white hover:bg-[#071f50] rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      {lang === 'ko' ? '등록 완료' : 'Complete Registration'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setItemToDelete(null)}
              className="fixed inset-0 bg-slate-950"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full relative shadow-2xl z-10"
            >
              <div className="flex items-center space-x-2.5 mb-4 text-rose-600">
                <Trash2 className="w-5 h-5 shrink-0" />
                <h4 className="text-base font-bold text-slate-900">
                  {lang === 'ko' ? '지적재산 삭제' : 'Delete IP Record'}
                </h4>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                {lang === 'ko' ? '정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.' : 'Are you sure you want to delete this item? This action cannot be undone.'}
              </p>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  {lang === 'ko' ? '게시글 비밀번호 / 권한 비밀번호를 입력하세요' : 'Delete Password'}
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => {
                    setDeletePassword(e.target.value);
                    setDeletePasswordError('');
                  }}
                  className={`w-full text-sm bg-slate-50 border ${deletePasswordError ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-rose-500'} rounded-lg px-3 py-2 focus:outline-none focus:bg-white transition-all`}
                  placeholder={lang === 'ko' ? '비밀번호를 입력하세요' : 'Enter password'}
                  required
                />
                {deletePasswordError && (
                  <p className="text-xs text-rose-500 mt-1 font-semibold">{deletePasswordError}</p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '취소' : 'Cancel'}
                </button>
                <button
                  onClick={async () => {
                    if (itemToDelete === null) return;
                    if (deletePassword !== '2027') {
                      setDeletePasswordError(lang === 'ko' ? '비밀번호가 올바르지 않습니다.' : 'Incorrect password.');
                      return;
                    }
                    
                    // Delete logic
                    const isCustom = customIP.some(item => item.id === itemToDelete);
                    if (isCustom) {
                                           const { error } = await supabase
                        .from('papers_patents')
                        .delete()
                        .eq('id', itemToDelete);

                      if (error) {
                        console.error('Failed to delete custom papers/patents:', error);
                        alert('Supabase 삭제 중 오류가 발생했습니다.');
                        return;
                      }

                      const updatedCustom = customIP.filter(item => item.id !== itemToDelete);
                      setCustomIP(updatedCustom);
                    } else {
                                            const { error } = await supabase
                        .from('deleted_ip_ids')
                        .insert({ id: itemToDelete });

                      if (error) {
                        console.error('Failed to save deleted IP id:', error);
                        alert('Supabase 삭제 기록 저장 중 오류가 발생했습니다.');
                        return;
                      }

                      const updatedDeletedIds = [...deletedIPIds, itemToDelete];
                      setDeletedIPIds(updatedDeletedIds);
                    }
                    
                    setItemToDelete(null);
                  }}
                  className="px-4 py-2 text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '삭제 완료' : 'Complete Deletion'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
