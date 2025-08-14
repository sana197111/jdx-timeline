// components/BottomMetrics.jsx
import React, { useState, useEffect, useRef } from 'react';

const BottomMetrics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    conversionRate: 0,
    teacherGrowth: 0,
    centerRegistration: 0,
    policies: 0,
    crisisManagement: 0
  });
  const containerRef = useRef(null);

  // 뷰포트 진입 감지 (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            animateMetrics();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // 메트릭 애니메이션
  const animateMetrics = () => {
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const targetValues = {
      conversionRate: 82,
      teacherGrowth: 200,
      centerRegistration: 100,
      policies: 9,
      crisisManagement: 5
    };

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        conversionRate: targetValues.conversionRate * easeProgress,
        teacherGrowth: targetValues.teacherGrowth * easeProgress,
        centerRegistration: targetValues.centerRegistration * easeProgress,
        policies: Math.floor(targetValues.policies * easeProgress),
        crisisManagement: Math.floor(targetValues.crisisManagement * easeProgress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues(targetValues);
      }
    }, stepDuration);
  };

  // 메트릭 데이터
  const metrics = [
    {
      id: 'conversion',
      title: '유월률',
      value: animatedValues.conversionRate,
      target: 82,
      unit: '%',
      icon: '📊',
      color: 'blue',
      description: '찾기→상담 전환율',
      trend: '+12%',
      details: '전년 대비 상승'
    },
    {
      id: 'teacher',
      title: '교사양성',
      value: animatedValues.teacherGrowth,
      target: 200,
      unit: '%',
      prefix: '+',
      icon: '👥',
      color: 'green',
      description: '교사 증가율',
      trend: '2배 성장',
      details: '체계적 교육 성과'
    },
    {
      id: 'center',
      title: '센터등록',
      value: animatedValues.centerRegistration,
      target: 100,
      unit: '%',
      icon: '🎯',
      color: 'purple',
      description: '등록 완료율',
      trend: '완벽달성',
      details: '목표 100% 달성'
    },
    {
      id: 'policy',
      title: '혁신정책',
      value: animatedValues.policies,
      target: 9,
      unit: '개',
      icon: '💡',
      color: 'yellow',
      description: '도입 정책 수',
      trend: '지속혁신',
      details: '매년 2개 이상'
    },
    {
      id: 'crisis',
      title: '위기극복',
      value: animatedValues.crisisManagement,
      target: 5,
      unit: '회',
      icon: '🔥',
      color: 'red',
      description: '성공 전환',
      trend: '100%',
      details: '모든 위기 극복'
    }
  ];

  // 색상 매핑
  const colorMap = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      progress: 'from-blue-400 to-blue-600'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      light: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      progress: 'from-green-400 to-green-600'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      progress: 'from-purple-400 to-purple-600'
    },
    yellow: {
      bg: 'from-yellow-500 to-yellow-600',
      light: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-600',
      progress: 'from-yellow-400 to-yellow-600'
    },
    red: {
      bg: 'from-red-500 to-red-600',
      light: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      progress: 'from-red-400 to-red-600'
    }
  };

  return (
    <div ref={containerRef} className="relative w-full px-6 py-8">
      {/* 섹션 타이틀 */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">핵심 성과 지표</h3>
        <p className="text-sm text-slate-600 mt-1">5대 핵심 달성 지표</p>
      </div>

      {/* 메트릭 그리드 */}
      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric, index) => {
          const colors = colorMap[metric.color];
          const progress = (metric.value / metric.target) * 100;
          const isHovered = hoveredMetric === metric.id;

          return (
            <div
              key={metric.id}
              className={`
                relative group cursor-pointer
                transform transition-all duration-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                ${isHovered ? 'scale-105 -translate-y-2 z-10' : 'scale-100'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredMetric(metric.id)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              {/* 메인 카드 */}
              <div className={`
                relative bg-white rounded-2xl p-4 overflow-hidden
                border-2 transition-all duration-500
                ${isHovered 
                  ? `shadow-2xl ${colors.border}` 
                  : 'shadow-lg border-slate-200'}
              `}>
                {/* 상단 헤더 */}
                <div className="flex items-center justify-between mb-3">
                  {/* 아이콘 */}
                  <div className={`
                    relative w-10 h-10 rounded-xl
                    bg-gradient-to-br ${colors.bg}
                    flex items-center justify-center shadow-md
                    ${isHovered ? 'animate-bounce' : ''}
                  `}>
                    <span className="text-white text-lg">{metric.icon}</span>
                    {isHovered && (
                      <div className="absolute inset-0 rounded-xl bg-white/30 animate-ping" />
                    )}
                  </div>

                  {/* 트렌드 인디케이터 */}
                  <div className={`
                    text-xs font-medium ${colors.text}
                    ${isHovered ? 'animate-pulse' : ''}
                  `}>
                    {metric.trend}
                  </div>
                </div>

                {/* 타이틀 */}
                <h4 className="text-sm font-medium text-slate-600 mb-2">
                  {metric.title}
                </h4>

                {/* 메인 수치 */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-1">
                    {metric.prefix && (
                      <span className={`text-xl font-bold ${colors.text}`}>
                        {metric.prefix}
                      </span>
                    )}
                    <span className={`
                      text-2xl font-bold text-slate-800 tabular-nums
                      ${isVisible ? 'transition-all duration-100' : ''}
                    `}>
                      {metric.value.toFixed(metric.unit === '%' ? 0 : 0)}
                    </span>
                    <span className="text-sm font-medium text-slate-600">
                      {metric.unit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {metric.description}
                  </p>
                </div>

                {/* 프로그레스 바 */}
                <div className="relative">
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    {/* 배경 패턴 */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 2px,
                          rgba(0,0,0,0.05) 2px,
                          rgba(0,0,0,0.05) 4px
                        )`
                      }} />
                    </div>

                    {/* 진행 바 */}
                    <div
                      className={`
                        absolute top-0 left-0 h-full rounded-full
                        bg-gradient-to-r ${colors.progress}
                        transition-all duration-2000 ease-out
                      `}
                      style={{ width: isVisible ? `${progress}%` : '0%' }}
                    >
                      {/* 빛나는 효과 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>

                    {/* 목표 마커 */}
                    {metric.target < 100 && (
                      <div
                        className="absolute top-0 w-0.5 h-full bg-slate-400"
                        style={{ left: `${metric.target}%` }}
                      />
                    )}
                  </div>

                  {/* 프로그레스 텍스트 */}
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-500">0</span>
                    <span className={`text-xs font-medium ${colors.text}`}>
                      {metric.target}{metric.unit}
                    </span>
                  </div>
                </div>

                {/* 호버시 상세 정보 */}
                <div className={`
                  absolute bottom-0 left-0 right-0 p-3
                  ${colors.light} border-t ${colors.border}
                  transform transition-all duration-500
                  ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
                `}>
                  <p className={`text-xs font-medium ${colors.text}`}>
                    {metric.details}
                  </p>
                </div>

                {/* 달성 배지 */}
                {progress >= 100 && (
                  <div className="absolute top-2 right-2">
                    <div className={`
                      px-2 py-1 rounded-full text-xs font-bold
                      ${colors.light} ${colors.text} ${colors.border} border
                      animate-pulse
                    `}>
                      달성
                    </div>
                  </div>
                )}

                {/* 배경 장식 */}
                <div className={`
                  absolute -top-20 -right-20 w-40 h-40 rounded-full
                  bg-gradient-to-br ${colors.bg} opacity-5
                  ${isHovered ? 'animate-spin-slow' : ''}
                `} />
              </div>

              {/* 호버 그림자 */}
              {isHovered && (
                <div className={`
                  absolute -inset-1 rounded-2xl -z-10
                  bg-gradient-to-br ${colors.progress} opacity-20 blur-xl
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* 하단 요약 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          모든 핵심 지표 
          <span className="font-bold text-blue-600 mx-1">목표 달성</span>
          또는
          <span className="font-bold text-green-600 mx-1">초과 달성</span>
        </p>
      </div>

      {/* 배경 장식 라인 */}
      <div className="absolute top-1/2 left-0 w-full h-px pointer-events-none">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-30" />
        </div>
      </div>
    </div>
  );
};

// 추가 애니메이션 스타일
const additionalStyles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
`;

export default BottomMetrics;