import React, { useState } from 'react';
import { PageType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CompanyIntroduction from './components/CompanyIntroduction';
import ResearchDevelopment from './components/ResearchDevelopment';
import ProductInformation from './components/ProductInformation';
import CompanyNews from './components/CompanyNews';
import PapersPatents from './components/PapersPatents';
import CodeExportModal from './components/CodeExportModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView setCurrentPage={setCurrentPage} lang={lang} />;
      case 'company':
        return <CompanyIntroduction lang={lang} />;
      case 'rnd':
        return <ResearchDevelopment lang={lang} />;
      case 'papers':
        return <PapersPatents lang={lang} />;
      case 'products':
        return <ProductInformation lang={lang} />;
      case 'news':
        return <CompanyNews lang={lang} />;
      default:
        return <HomeView setCurrentPage={setCurrentPage} lang={lang} />;
    }
  };

  const handleOpenCodeModal = () => {
    setIsCodeModalOpen(true);
  };

  const handleCloseCodeModal = () => {
    setIsCodeModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 1. Header Navigation Bar */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          window.scrollTo(0, 0);
        }} 
        onOpenCodeModal={handleOpenCodeModal}
        lang={lang}
        setLang={setLang}
      />

      {/* 2. Main Tab View Section */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* 3. Footer Branding & Info Bar */}
      <Footer 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          window.scrollTo(0, 0);
        }} 
        lang={lang} 
      />

      {/* 4. Dev Portal - Raw HTML / CSS source exporter */}
      <CodeExportModal 
        isOpen={isCodeModalOpen} 
        onClose={handleCloseCodeModal}
        lang={lang}
      />
    </div>
  );
}
