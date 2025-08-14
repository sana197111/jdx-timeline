// App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Chart from './components/Chart';
import NewsTicker from './components/NewsTicker';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 초기 로딩 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 실시간 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* 배경 애니메이션 레이어 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 플로팅 원형 그라데이션 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* 미세한 격자 패턴 */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `linear-gradient(to right, #3B82F6 1px, transparent 1px), 
                             linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* 메인 컨텐츠 컨테이너 - vh 단위로 정확한 높이 분배 */}
      <div className={`
        relative z-10 h-screen flex flex-col
        transition-all duration-1000 transform
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* 헤더 - 8vh */}
        <div style={{ height: '8vh' }} className="flex-shrink-0">
          <Header currentTime={currentTime} />
        </div>

        {/* 차트 섹션 (통합 비주얼 타임라인) - 87vh */}
        <div style={{ height: '87vh' }} className={`
          flex-1
          transform transition-all duration-1000 delay-500
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}>
          <Chart />
        </div>

        {/* 뉴스 티커 - 5vh */}
        <div style={{ height: '5vh' }} className={`
          flex-shrink-0
          transform transition-all duration-1000 delay-600
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}>
          <NewsTicker />
        </div>
      </div>

      {/* 초기 로딩 스크린 */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="relative">
              {/* 로딩 서클 */}
              <div className="w-20 h-20 mx-auto mb-4">
                <svg className="animate-spin" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgb(226, 232, 240)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#loadingGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* 로딩 텍스트 */}
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                JDX 전도거래소
              </h2>
              <p className="mt-1 text-xs text-slate-600 animate-pulse">
                데이터를 불러오는 중...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS 애니메이션 정의 */}
      <style jsx>{`
        @keyframes slideHorizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};


export default App;