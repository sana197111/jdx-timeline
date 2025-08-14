// components/MetricsBar.jsx
import React, { useState, useEffect, useRef } from 'react';

const MetricsBar = () => {
  const [metrics, setMetrics] = useState({
    index: 0,
    rank: 1,
    achievement: 0
  });
  
  const [animatedValues, setAnimatedValues] = useState({
    index: 0,
    indexChange: 0,
    achievement: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [pulseRank, setPulseRank] = useState(false);
  const [randomFluctuation, setRandomFluctuation] = useState(0);

  // 초기 애니메이션
  useEffect(() => {
    setTimeout(() => {
      setIsAnimating(true);
      animateToTarget();
    }, 500);
  }, []);

  // 목표값까지 애니메이션
  const animateToTarget = () => {
    const duration = 2500;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const targetValues = {
      index: 2847.32,
      indexChange: 847.00,
      achievement: 287.3
    };

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Easing function (ease-out-expo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setAnimatedValues({
        index: targetValues.index * easeProgress,
        indexChange: targetValues.indexChange * easeProgress,
        achievement: targetValues.achievement * easeProgress
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues(targetValues);
        setPulseRank(true);
        startFluctuation();
      }
    }, stepDuration);
  };

  // 실시간 미세 변동 효과
  const startFluctuation = () => {
    setInterval(() => {
      setRandomFluctuation((Math.random() - 0.5) * 2);
    }, 3000);
  };

  // 개별 메트릭 카드 컴포넌트
  const MetricCard = ({ 
    title, 
    value, 
    change, 
    changeType, 
    icon, 
    gradient,
    isRank = false,
    suffix = '',
    decimal = 2 
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    return (
      <div
        ref={cardRef}
        className={`
          relative group cursor-pointer
          transform transition-all duration-500 ease-out
          ${isHovered ? 'scale-105 -translate-y-1' : 'scale-100 translate-y-0'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 배경 카드 */}
        <div className={`
          relative bg-white rounded-2xl p-6 overflow-hidden
          shadow-lg border border-slate-200/50
          ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
          transition-shadow duration-500
        `}>
          {/* 그라데이션 오버레이 */}
          <div className={`
            absolute inset-0 opacity-5 bg-gradient-to-br ${gradient}
            ${isHovered ? 'opacity-10' : 'opacity-5'}
            transition-opacity duration-500
          `} />

          {/* 상단 아이콘 & 타이틀 */}
          <div className="relative flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* 아이콘 컨테이너 */}
              <div className={`
                relative w-10 h-10 rounded-xl bg-gradient-to-br ${gradient}
                flex items-center justify-center shadow-lg
                ${isHovered ? 'animate-pulse' : ''}
              `}>
                <span className="text-white text-lg">{icon}</span>
                
                {/* 아이콘 글로우 효과 */}
                {isHovered && (
                  <div className="absolute inset-0 rounded-xl bg-white/30 animate-ping" />
                )}
              </div>
              
              <h3 className="text-sm font-medium text-slate-600">{title}</h3>
            </div>

            {/* 실시간 인디케이터 */}
            <div className="flex items-center gap-1">
              <div className={`
                w-2 h-2 rounded-full
                ${changeType === 'up' ? 'bg-green-500' : changeType === 'down' ? 'bg-red-500' : 'bg-blue-500'}
                ${isAnimating ? 'animate-pulse' : ''}
              `} />
              <span className="text-xs text-slate-400">실시간</span>
            </div>
          </div>

          {/* 메인 수치 */}
          <div className="relative">
            {isRank ? (
              // 순위 표시 (특별 처리)
              <div className="flex items-center gap-3">
                <div className={`
                  text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 
                  bg-clip-text text-transparent
                  ${pulseRank ? 'animate-pulse' : ''}
                `}>
                  {value}위
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl">{change}</span>
                  {pulseRank && (
                    <span className="text-sm font-medium text-yellow-600 animate-bounce">
                      2년 연속
                    </span>
                  )}
                </div>
              </div>
            ) : (
              // 일반 수치 표시
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className={`
                    text-3xl font-bold text-slate-800 tabular-nums
                    ${isAnimating ? 'transition-all duration-100' : ''}
                  `}>
                    {typeof value === 'number' 
                      ? value.toLocaleString('ko-KR', { 
                          minimumFractionDigits: decimal,
                          maximumFractionDigits: decimal 
                        })
                      : value}
                  </span>
                  {suffix && (
                    <span className="text-xl font-medium text-slate-600">{suffix}</span>
                  )}
                </div>

                {/* 변동 수치 */}
                {change !== undefined && (
                  <div className={`
                    flex items-center gap-1.5 text-sm font-medium
                    ${changeType === 'up' ? 'text-green-600' : changeType === 'down' ? 'text-red-600' : 'text-blue-600'}
                  `}>
                    <span className="text-base">
                      {changeType === 'up' ? '▲' : changeType === 'down' ? '▼' : '■'}
                    </span>
                    <span className="tabular-nums">
                      {typeof change === 'number' 
                        ? change.toLocaleString('ko-KR', { minimumFractionDigits: 2 })
                        : change}
                    </span>
                    {changeType === 'up' && (
                      <span className="text-xs">(+42.3%)</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 미니 차트 (장식용) */}
          {!isRank && (
            <div className="relative mt-4 h-8">
              <svg width="100%" height="32" className="overflow-visible">
                <defs>
                  <linearGradient id={`miniGradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={changeType === 'up' ? '#10B981' : '#3B82F6'} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={changeType === 'up' ? '#10B981' : '#3B82F6'} stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* 미니 차트 라인 */}
                <path
                  d={`M0,${changeType === 'up' ? '24' : '16'} Q30,${changeType === 'up' ? '20' : '18'} 60,${changeType === 'up' ? '12' : '20'} T120,${changeType === 'up' ? '8' : '22'} T180,${changeType === 'up' ? '4' : '24'}`}
                  fill="none"
                  stroke={changeType === 'up' ? '#10B981' : '#3B82F6'}
                  strokeWidth="2"
                  opacity="0.6"
                />
                
                {/* 미니 차트 영역 */}
                <path
                  d={`M0,${changeType === 'up' ? '24' : '16'} Q30,${changeType === 'up' ? '20' : '18'} 60,${changeType === 'up' ? '12' : '20'} T120,${changeType === 'up' ? '8' : '22'} T180,${changeType === 'up' ? '4' : '24'} L180,32 L0,32 Z`}
                  fill={`url(#miniGradient-${title})`}
                />

                {/* 현재 포인트 */}
                <circle
                  cx="180"
                  cy={changeType === 'up' ? '4' : '24'}
                  r="3"
                  fill={changeType === 'up' ? '#10B981' : '#3B82F6'}
                  className="animate-pulse"
                />
              </svg>
            </div>
          )}

          {/* 호버 효과 오버레이 */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent
            opacity-0 transition-opacity duration-500 pointer-events-none
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `} />

          {/* 코너 장식 */}
          {isHovered && (
            <>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-xl" />
            </>
          )}
        </div>

        {/* 그림자 효과 */}
        {isHovered && (
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl -z-10" />
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full px-6">
      {/* 메트릭 카드 그리드 */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard
          title="전도지수"
          value={animatedValues.index + randomFluctuation}
          change={animatedValues.indexChange}
          changeType="up"
          icon="📈"
          gradient="from-blue-500 to-blue-600"
          decimal={2}
        />
        
        <MetricCard
          title="전국순위"
          value={1}
          change="🏆"
          changeType="none"
          icon="🎯"
          gradient="from-yellow-500 to-yellow-600"
          isRank={true}
        />
        
        <MetricCard
          title="달성률"
          value={animatedValues.achievement}
          change="전년대비"
          changeType="up"
          icon="🚀"
          gradient="from-green-500 to-green-600"
          suffix="%"
          decimal={1}
        />
      </div>

      {/* 연결선 애니메이션 (장식) */}
      <div className="absolute top-1/2 left-0 w-full h-px pointer-events-none">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-slide-horizontal opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default MetricsBar;