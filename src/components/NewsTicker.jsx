// components/NewsTicker.jsx
import React, { useState, useEffect, useRef } from 'react';

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const tickerRef = useRef(null);
  const contentRef = useRef(null);

  // 뉴스 데이터
  const newsItems = [
    {
      id: 1,
      type: 'breaking',
      icon: '🔥',
      text: '바돌로매 영등포 청년회, 2년 연속 전국 1등 달성',
      priority: 'high'
    },
    {
      id: 2,
      type: 'achievement',
      icon: '🏆',
      text: '전도지수 2,847 돌파 - 역대 최고 기록 경신',
      priority: 'high'
    },
    {
      id: 3,
      type: 'update',
      icon: '📈',
      text: '위기를 기회로 - 5번의 위기 모두 성공적 극복',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'innovation',
      icon: '💡',
      text: 'N개강 전환 성공 - 새로운 전도 패러다임 제시',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'growth',
      icon: '📊',
      text: '교사 양성 200% 증가 - 체계적 교육 시스템 구축',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'milestone',
      icon: '🎯',
      text: '센터 등록률 100% 달성 - 완벽한 프로세스 정립',
      priority: 'high'
    },
    {
      id: 7,
      type: 'strategy',
      icon: '🚀',
      text: '주3회 대면 개강 - 과감한 도전이 만든 기적',
      priority: 'medium'
    },
    {
      id: 8,
      type: 'success',
      icon: '✨',
      text: '유월률 82% 기록 - 전도 효율성 대폭 향상',
      priority: 'medium'
    }
  ];

  // 무한 스크롤을 위한 복제 콘텐츠
  const duplicatedNews = [...newsItems, ...newsItems];

  // 자동 뉴스 전환 (메인 헤드라인용)
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, newsItems.length]);

  // 라이브 펄스 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(false);
      setTimeout(() => setIsLive(true), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-slate-800 overflow-hidden flex items-center">
      {/* 상단 그라데이션 라인 */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent" 
             style={{ animation: 'slideHorizontal 5s linear infinite' }} />
      </div>

      <div className="relative flex items-center w-full h-full">
        {/* 좌측: LIVE 인디케이터 & 라벨 */}
        <div className="relative z-20 flex items-center gap-3 px-4 bg-slate-800">
          {/* LIVE 배지 */}
          <div className="relative flex items-center gap-2 px-2 py-1 bg-red-600 rounded-md shadow-lg">
            <div className={`
              w-2 h-2 bg-white rounded-full
              ${isLive ? 'animate-pulse' : ''}
            `}>
              <div className="absolute inset-0 bg-white rounded-full animate-ping" />
            </div>
            <span className="text-xs font-bold text-white tracking-wider">LIVE</span>
          </div>

          {/* 뉴스 라벨 */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-blue-100">속보</span>
            <div className="h-3 w-px bg-blue-300" />
            <span className="text-sm text-white font-black">JDX 전도거래소</span>
          </div>
        </div>

        {/* 중앙: 메인 티커 영역 */}
        <div 
          ref={tickerRef}
          className="relative flex-1 h-full overflow-hidden flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 스크롤링 티커 */}
          <div className="absolute left-0 right-0 flex items-center">
            <div 
              ref={contentRef}
              className={`
                flex items-center gap-8 whitespace-nowrap
                ${!isPaused ? 'animate-marquee' : ''}
              `}
            >
              {duplicatedNews.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-100">{item.icon}</span>
                    <span className="text-sm text-white font-bold">{item.text}</span>
                  </div>
                  <span className="text-blue-400">•</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 우측: 컨트롤 & 상태 */}
        <div className="relative z-20 flex items-center gap-3 px-4 bg-slate-800">
          {/* 시간 표시 */}
          <div className="text-sm text-white font-black tabular-nums">
            {new Date().toLocaleTimeString('ko-KR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>

          {/* 구분선 */}
          <div className="h-3 w-px bg-slate-600" />

          {/* 컨트롤 버튼 */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="relative p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors group"
          >
            {isPaused ? (
              <svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <div className="absolute inset-0 rounded-lg bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>

          {/* 뉴스 카운터 */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {newsItems.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-1 h-1 rounded-full transition-all duration-500
                    ${currentNewsIndex === index 
                      ? 'w-3 bg-blue-400' 
                      : 'bg-slate-600'}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NewsTicker;