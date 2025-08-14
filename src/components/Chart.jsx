// components/Chart.jsx  
import React, { useEffect, useRef, useState, useMemo } from 'react';

const Chart = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  // 완전히 재설계된 이벤트 데이터 - 파란색과 금색 톤만 사용
  const events = useMemo(() => [
    {
      id: 'start',
      order: 1,
      year: '37년 11월',
      title: '오픈전도 시작',
      people: 50,
      growth: 12.3,
      position: { x: 8, y: 70 },  // 37년 11월
      color: '#3B82F6',  // 파란색
      icon: '🛡️',
      size: 'normal',
      description: '코로나 끝나기 시작하며 신천지 오픈 전도 시작. 선입견과 편견을 깨고 신뢰 관계를 쌓으며 참 말씀 전파',
      achievement: '청년회 어려운 시기였지만 새로운 전도 방식 정립'
    },
    {
      id: 'flexible',
      order: 2,
      year: '39년 2월',
      title: '유연한 전도',
      people: 145,
      growth: 35,
      position: { x: 22, y: 65 },  // 39년 2월
      color: '#2563EB',  // 진한 파란색
      icon: '💬',
      size: 'normal',
      description: '상담사 연결로 내면 상담 → 말씀 필요성 → 센터 신천지 오픈. 줌과 대면 병행',
      achievement: '곽종렬 지파장님 청년 전도 바람. 전도가 조금씩 잘 되기 시작'
    },
    {
      id: 'groearth',
      order: 3,
      year: '39년 10월',
      title: '그로어스 강연',
      people: 273,
      growth: 45.6,
      position: { x: 34, y: 58 },  // 39년 10월
      color: '#1D4ED8',  // 더 진한 파란색
      icon: '📚',
      size: 'normal',
      description: '교사·상담사 실력 향상 강연. 블라인드 테스트로 객관적 선택 유도. 주차별 목표 점검',
      achievement: '청년회 전도 체계 확립, 기획행사 시작'
    },
    {
      id: 'offline',
      order: 4,
      year: '40년 1월',
      title: '주3회 대면',
      people: 490,
      growth: 80,
      position: { x: 48, y: 52 },  // 40년 1월
      color: '#1E40AF',  // 가장 진한 파란색
      icon: '🎯',
      size: 'normal',
      description: '줌 강의 완전 폐지, 주3회 대면만. 따기 선수촌·모두의 전도단·바돌콘밸리 시즌1 시작',
      achievement: '40년 6월 고전학 프로세스 정립. 무신앙 70% 대응'
    },
    {
      id: 'first-place',
      order: 5,
      year: '40년 12월',
      title: '🏆 전국 1등 달성',
      people: 677,
      growth: 125.4,
      position: { x: 60, y: 45 },  // 40년 12월
      color: '#FCD34D',  // 밝은 금색
      icon: '📖',
      size: 'large',
      highlight: true,
      description: '12지파 중 유일하게 주3회 대면으로 압도적 1등',
      achievement: '합자·일꾼 전도로 새신자 튼튼하게 창조'
    },
    {
      id: 'trumpet',
      order: 6,
      year: '41년 2월',
      title: '마지막나팔',
      people: 954,
      growth: 180,
      position: { x: 64, y: 40 },  // 41년 2월
      color: '#2563EB',  // 파란색
      icon: '📯',
      size: 'normal',
      description: '신천지 개인정보 직접 입력 시스템. 기자·S직접오픈·법률 잎사귀로 편견 제거',
      achievement: '41년 7월 선개강 시작. 위기를 기회로'
    },
    {
      id: 'second-place',
      order: 7,
      year: '41년 12월',
      title: '🏆🏆 2년 연속 1등',
      people: 1217,
      growth: 234.5,
      position: { x: 76, y: 32 },  // 41년 12월
      color: '#F59E0B',  // 진한 금색
      icon: '🌱',
      size: 'large',
      highlight: true,
      description: '파죽지세 압도적 수치로 2년 연속 전국 1등. 타지파 견학',
      achievement: '바돌로매가 세번째 청년회 전도 부흥 (총회 교육부장님)'
    },
    {
      id: 'n-open',
      order: 8,
      year: '42년 7월',
      title: 'N개강 전환',
      people: 1437,
      growth: 287.3,
      position: { x: 90, y: 25 },  // 42년 7월
      color: '#1E40AF',  // 진한 파란색
      icon: '🔥',
      size: 'normal',
      current: true,
      description: '핍박 강화로 신천지 오픈 안하고 3개월 뒤 오픈. 42년 3월 한달 뒤 등록 시작',
      achievement: '위기 속에서도 12지파 중 앞서나가는 중'
    }
  ], []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // 캔버스 애니메이션
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // devicePixelRatio를 가져와서 고해상도 대응
    const dpr = window.devicePixelRatio || 1;
    
    // 캔버스 크기를 dpr에 맞춰 설정
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    
    // CSS 크기는 원래대로 유지
    canvas.style.width = dimensions.width + 'px';
    canvas.style.height = dimensions.height + 'px';
    
    // 컨텍스트를 dpr에 맞춰 스케일링
    ctx.scale(dpr, dpr);

    const animate = () => {
      timeRef.current += 0.003;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 그리드 라인 (더 선명하게)
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;
      
      // Y축 범위를 화면에 맞춰 조정 (하단 X축 공간 80px 확보)
      const chartBottom = dimensions.height - 80;
      const chartTop = 10;
      const chartHeight = chartBottom - chartTop;
      
      [0, 100, 200, 300].forEach(value => {
        const y = chartBottom - (value / 300) * chartHeight;
        ctx.beginPath();
        ctx.setLineDash([5, 10]);
        ctx.moveTo(20, y);
        ctx.lineTo(dimensions.width, y);  // 화면 끝까지
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // 메인 그래프 라인 (굵고 선명하게)
      const points = events.map(event => ({
        x: (event.position.x / 100) * dimensions.width,
        y: chartBottom - (event.growth / 300) * chartHeight
      }));
      
      // 미래 예측선 추가 (우상향, 오른쪽 끝까지)
      const lastPoint = points[points.length - 1];
      points.push({
        x: dimensions.width * 0.94,
        y: lastPoint.y - 25  // 위로 상승
      });
      points.push({
        x: dimensions.width - 2,  // 화면 끝까지 (2px 여백만)
        y: lastPoint.y - 50  // 더 위로 상승
      });

      // 그래프 영역 채우기
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const cp1x = (points[i - 1].x + points[i].x) / 2;
        const cp1y = points[i - 1].y;
        const cp2x = (points[i - 1].x + points[i].x) / 2;
        const cp2y = points[i].y;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[i].x, points[i].y);
      }
      ctx.lineTo(points[points.length - 1].x, chartBottom);
      ctx.lineTo(points[0].x, chartBottom);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // 메인 라인 (실선 부분만)
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 2; i++) {  // 미래 예측선 제외
        const cp1x = (points[i - 1].x + points[i].x) / 2;
        const cp1y = points[i - 1].y;
        const cp2x = (points[i - 1].x + points[i].x) / 2;
        const cp2y = points[i].y;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[i].x, points[i].y);
      }
      
      const lineGradient = ctx.createLinearGradient(0, 0, dimensions.width, 0);
      lineGradient.addColorStop(0, '#3B82F6');
      lineGradient.addColorStop(0.5, '#FCD34D');
      lineGradient.addColorStop(1, '#F59E0B');
      
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 5;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // 미래 예측선 (점선)
      ctx.beginPath();
      ctx.moveTo(points[points.length - 3].x, points[points.length - 3].y);
      ctx.setLineDash([10, 5]);
      ctx.strokeStyle = '#FCD34D';
      ctx.lineWidth = 4;
      ctx.lineTo(points[points.length - 2].x, points[points.length - 2].y);
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // 화살표
      const lastX = points[points.length - 1].x;
      const lastY = points[points.length - 1].y;
      ctx.beginPath();
      ctx.moveTo(lastX - 10, lastY + 10);
      ctx.lineTo(lastX, lastY);
      ctx.lineTo(lastX - 10, lastY - 10);
      ctx.strokeStyle = '#FCD34D';
      ctx.lineWidth = 4;
      ctx.stroke();

      // 포인트 그리기 (미래 예측 포인트 제외)
      points.slice(0, -2).forEach((point, index) => {
        const event = events[index];
        
        // 정확한 원을 그리기 위해 소수점 제거
        const centerX = Math.round(point.x);
        const centerY = Math.round(point.y);
        
        // 외부 링 (정원으로 그리기 - 크기 축소)
        if (event.highlight) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, 12, 0, Math.PI * 2, false);
          ctx.strokeStyle = event.color;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }
        
        // 메인 포인트 (정원으로 그리기 - 크기 축소)
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, event.highlight ? 8 : 6, 0, Math.PI * 2, false);
        ctx.fillStyle = event.color;
        ctx.fill();
        ctx.restore();
        
        // 내부 점 (정원으로 그리기 - 크기 축소)
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, event.highlight ? 4 : 3, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();
      });

      // 움직이는 포인트 (현재 위치 표시 - 크기 축소)
      const currentPoint = points[points.length - 3]; // 실제 마지막 이벤트 포인트
      const pulseSize = 10 + Math.sin(timeRef.current * 3) * 2;
      const currentCenterX = Math.round(currentPoint.x);
      const currentCenterY = Math.round(currentPoint.y);
      ctx.save();
      ctx.beginPath();
      ctx.arc(currentCenterX, currentCenterY, pulseSize, 0, Math.PI * 2, false);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, events]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden" ref={containerRef}>

      {/* Y축 레이블 */}
      <div className="absolute left-4 top-10 bottom-20 flex flex-col justify-between">
        <div className="text-sm font-bold text-slate-700">300%</div>
        <div className="text-sm font-bold text-slate-600">200%</div>
        <div className="text-sm font-bold text-slate-500">100%</div>
        <div className="text-sm font-bold text-slate-400">0%</div>
      </div>

      {/* 캔버스 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* 이벤트 카드들 - 완전 재설계 */}
      {events.map((event, index) => {
        const isLarge = event.size === 'large';
        // 모든 카드 넓이 통일
        const cardWidth = 'w-72';
        
        // 화면 높이에 따른 동적 카드 배치
        const viewportHeight = dimensions.height || 600;
        
        // 카드 위치 계산 - 화면 높이와 그래프 위치에 따라 동적으로 조정
        let yOffset;
        
        // 카드 배치 로직 - 간단하고 안정적으로
        if (index === 0 || index === 1) {
          // 첫 두 카드는 위쪽에 배치
          yOffset = -45;
        } else if (index === 2 || index === 3) {
          // 중간 카드들
          yOffset = -50;
        } else if (index === 4) {
          // 5번 카드 (첫 1등) - 그래프와 거의 같은 위치
          yOffset = 2;
        } else if (index === 5) {
          // 6번 카드 - 그래프 위로 이동 (더 아래로 조정)
          yOffset = -30;
        } else if (index === 6) {
          // 7번 카드 (2년 연속 1등) - 그래프 살짝 아래
          yOffset = 18;
        } else {
          // 8번 카드 - 그래프 살짝 아래
          yOffset = 15;
        }
        
        // 화면 크기에 따른 동적 조정 - 더 세밀하게
        if (viewportHeight > 900) {
          // 큰 화면에서는 간격을 넓게
          if (yOffset < 0) {
            yOffset = yOffset * 1.3;  // 위쪽 카드는 더 위로
          } else {
            yOffset = yOffset * 1.2;  // 아래쪽 카드는 약간만
          }
        } else if (viewportHeight > 700) {
          // 중간 화면에서는 기본값 유지
          yOffset = yOffset * 1.0;
        } else if (viewportHeight > 600) {
          // 작은 화면에서는 간격을 줄임
          yOffset = yOffset * 0.85;
        } else {
          // 매우 작은 화면에서는 더 줄임
          yOffset = yOffset * 0.7;
        }
        
        // 그래프 포인트의 실제 Y 위치 계산 (Canvas와 동일한 계산식)
        // 화면 높이의 80px를 X축용으로 확보, 상단 10px 여백
        const chartHeightPercent = ((dimensions.height - 90) / dimensions.height) * 100;
        const chartBottomPercent = ((dimensions.height - 80) / dimensions.height) * 100;
        const graphY = chartBottomPercent - (event.growth / 300) * chartHeightPercent;
        
        return (
          <div
            key={event.id}
            className="absolute z-20"
            style={{
              left: `${event.position.x}%`,
              top: `${graphY + yOffset}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {/* 순서 번호 */}
            <div className={`absolute left-1/2 -translate-x-1/2 ${(index === 4) ? '-bottom-8' : (yOffset < 0 ? '-top-8' : '-bottom-8')}`}>
              <div className="w-7 h-7 bg-gradient-to-br from-slate-700 to-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                {event.order}
              </div>
            </div>

            {/* 연결선 */}
            <div
              className="absolute w-0.5"
              style={{
                left: '50%',
                height: `${Math.abs(yOffset)}px`,
                top: yOffset < 0 ? '100%' : `-${Math.abs(yOffset)}px`,
                background: yOffset < 0 
                  ? 'linear-gradient(to bottom, rgba(148, 163, 184, 0.5), rgba(148, 163, 184, 0.1))' 
                  : 'linear-gradient(to top, rgba(148, 163, 184, 0.5), rgba(148, 163, 184, 0.1))'
              }}
            />

            {/* 카드 */}
            <div 
              className={`
                relative bg-white rounded-xl shadow-lg border overflow-hidden
                ${cardWidth}
                ${isLarge ? 'border-yellow-400 shadow-yellow-200/50' : 'border-slate-200'}
                ${event.current ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
              `}
            >
              {/* 상단 바 */}
              <div 
                className="h-2"
                style={{ backgroundColor: event.color }}
              />

              <div className="p-4">
                {/* 헤더 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {event.icon}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-500">{event.year}</div>
                      <h3 className="font-black text-slate-900 text-lg">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  {event.current && (
                    <div className="bg-blue-100 px-2.5 py-1.5 rounded-full">
                      <span className="text-sm font-bold text-blue-700">NOW</span>
                    </div>
                  )}
                </div>

                {/* 설명 */}
                <div className="mb-3">
                  <div className="text-sm text-slate-700 font-medium leading-relaxed">
                    {event.description}
                  </div>
                </div>

                {/* 주요 성과 */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3">
                  <div className="text-sm text-slate-500 font-bold mb-1.5">핵심 성과</div>
                  <div className="text-sm font-bold leading-relaxed" style={{ color: event.color }}>
                    {event.achievement}
                  </div>
                </div>

                {/* 하이라이트 메시지 */}
                {event.highlight && (
                  <div className="mt-3 p-2 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border border-yellow-300">
                    <div className="text-sm font-black text-yellow-800 text-center">
                      {event.order === 5 ? '🎯 첫 번째 정상 등극!' : '🎯 2년 연속 최고 기록!'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* X축 타임라인 */}
      <div className="absolute bottom-2 left-2 right-2 h-16 bg-white/90 backdrop-blur rounded-lg shadow-lg border border-slate-200 z-30">
        <div className="relative h-full">
          {[
            { year: '37년', x: 8, policy: '오픈전도', growth: '+12%' },
            { year: '39년', x: 30, policy: '유연한전도', growth: '+45%' },
            { year: '40년', x: 52, policy: '주3회 대면', growth: '+125%', highlight: true },
            { year: '41년', x: 71, policy: '마지막나팔', growth: '+234%', highlight: true },
            { year: '42년', x: 90, policy: 'N개강', growth: '+287%', current: true }
          ].map(({ year, x, policy, growth, highlight, current }) => {
            
            return (
              <div 
                key={year} 
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, transform: 'translateX(-50%) translateY(-50%)' }}
              >
                <div className={`
                  px-3 py-2 rounded-lg text-center
                  ${highlight ? 'bg-yellow-100 border border-yellow-300' : 
                    current ? 'bg-blue-100 border border-blue-300' : 
                    'bg-slate-100 border border-slate-200'}
                `}>
                  <div className="font-bold text-sm text-slate-800">{year}</div>
                  <div className="font-medium text-xs text-slate-600">{policy}</div>
                  <div className={`font-black text-sm ${highlight ? 'text-yellow-600' : current ? 'text-blue-600' : 'text-slate-700'}`}>
                    {growth}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Chart;