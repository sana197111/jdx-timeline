// components/Timeline.jsx
import React from 'react';

const Timeline = () => {
  // 강화된 타임라인 데이터
  const timelineData = [
    {
      year: "37년",
      period: "시작기",
      growth: "+12%",
      key: "오픈전도",
      color: "bg-blue-500"
    },
    {
      year: "39년", 
      period: "도약기",
      growth: "+45%",
      key: "유연한전도",
      color: "bg-blue-600"
    },
    {
      year: "40년",
      period: "혁신기",
      growth: "+125%",
      key: "주3회 대면",
      trophy: "🏆",
      color: "bg-yellow-500"
    },
    {
      year: "41년",
      period: "성과기",
      growth: "+234%",
      key: "마지막나팔",
      trophy: "🏆🏆",
      color: "bg-yellow-600"
    },
    {
      year: "42년",
      period: "진화기",
      growth: "+287%",
      key: "N개강",
      isCurrent: true,
      color: "bg-blue-600"
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50/50 via-slate-50 to-white border-y-2 border-slate-200 shadow-inner relative">
      {/* 좌측 장식 라인 */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600" />
      {/* 우측 장식 라인 */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600" />
      
      <div className="w-full h-full flex items-center px-8 pt-5 pb-2">
        <div className="w-full">

        {/* 타임라인 바 */}
        <div className="relative">
          {/* 배경 진행 바 */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-100 via-yellow-100 to-blue-100 rounded-full -translate-y-1/2" />
          
          {/* 실제 진행 바 */}
          <div className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-500 via-yellow-500 to-blue-600 rounded-full -translate-y-1/2"
               style={{ width: '100%' }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
          </div>
          
          {/* 타임라인 포인트들 */}
          <div className="relative flex justify-between">
            {timelineData.map((node, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* 트로피 */}
                {node.trophy && (
                  <div className="absolute -top-5 text-lg animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                    {node.trophy}
                  </div>
                )}
                
                {/* 포인트 */}
                <div className={`
                  w-5 h-5 rounded-full border-2 border-white shadow-lg z-10
                  ${node.color}
                  ${node.isCurrent ? 'animate-pulse ring-4 ring-blue-300' : ''}
                `} />
                
                {/* 정보 카드 */}
                <div className="mt-3 text-center bg-white/90 rounded-lg px-2 py-1 shadow-md">
                  <div className="text-sm font-bold text-slate-800">{node.year}</div>
                  <div className="text-xs text-slate-600">{node.key}</div>
                  <div className={`text-sm font-black ${node.trophy ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {node.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Timeline;