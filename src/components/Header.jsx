// components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';

const Header = ({ currentTime = new Date() }) => {
  const [logoHovered, setLogoHovered] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [marketStatus, setMarketStatus] = useState('open');
  const [notifications, setNotifications] = useState([]);
  const headerRef = useRef(null);

  // 연결 상태 시뮬레이션
  useEffect(() => {
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 1500);
  }, []);

  // 시장 상태 체크 (9:00 - 18:00)
  useEffect(() => {
    const hours = currentTime.getHours();
    setMarketStatus(hours >= 9 && hours < 18 ? 'open' : 'closed');
  }, [currentTime]);

  // 알림 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        text: '전도지수 상승',
        type: 'success'
      };
      
      setNotifications(prev => [...prev.slice(-2), newNotification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);


  return (
    <header
      ref={headerRef}
      className={`
        relative h-full w-full
        bg-white backdrop-blur-xl shadow-md border-b border-slate-300
        transition-all duration-500 ease-out
      `}
    >
      {/* 상단 미니 바 */}
      <div className="relative h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" 
             style={{ animation: 'slideHorizontal 5s linear infinite' }} />
      </div>

      <div className="relative px-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* 좌측: 로고 & 타이틀 */}
          <div className="flex items-center gap-6">
            {/* 로고 컨테이너 */}
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <div className={`
                relative flex items-center gap-3
                transform transition-all duration-500
                ${logoHovered ? 'scale-105' : 'scale-100'}
              `}>
                {/* 로고 아이콘 */}
                <div className="relative">
                  <div className={`
                    relative w-10 h-10 rounded-xl
                    bg-gradient-to-br from-blue-500 to-blue-600
                    flex items-center justify-center
                    shadow-lg transform transition-all duration-500
                    ${logoHovered ? 'rotate-12' : 'rotate-0'}
                  `}>
                    <span className="text-white text-xl font-bold">JDX</span>
                    
                    {/* 로고 글로우 효과 */}
                    {logoHovered && (
                      <>
                        <div className="absolute inset-0 rounded-xl bg-blue-400/30 animate-ping" />
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 opacity-30 blur-md" />
                      </>
                    )}
                  </div>

                  {/* 연결 상태 인디케이터 */}
                  <div className={`
                    absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white
                    ${connectionStatus === 'connected' 
                      ? 'bg-green-500 animate-pulse' 
                      : connectionStatus === 'connecting'
                      ? 'bg-yellow-500 animate-pulse'
                      : 'bg-red-500'}
                  `} />
                </div>

                {/* 타이틀 */}
                <div className="flex flex-col">
                  <h1 className={`
                    text-xl font-bold bg-gradient-to-r 
                    ${logoHovered 
                      ? 'from-blue-600 via-blue-500 to-blue-600 bg-300% animate-gradient'
                      : 'from-blue-600 to-blue-500'}
                    bg-clip-text text-transparent
                    transition-all duration-500
                  `}>
                    JDX 전도거래소
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">바돌로매 영등포 청년회</span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs font-medium text-blue-600">전도과</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />

            {/* 마켓 상태 */}
            <div className="flex items-center gap-2">
              <div className={`
                px-3 py-1.5 rounded-full text-xs font-medium
                flex items-center gap-2
                ${marketStatus === 'open' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-slate-100 text-slate-600 border border-slate-200'}
              `}>
                <div className={`
                  w-2 h-2 rounded-full
                  ${marketStatus === 'open' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}
                `} />
                <span>{marketStatus === 'open' ? '운영중' : '운영종료'}</span>
              </div>
            </div>
          </div>


          {/* 중앙: 메인 타이틀 */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="text-center">
              <h2 className="text-xl font-black text-slate-900">영등포 청년회 전도과 연혁 - 위기를 기회로!</h2>
              <p className="text-xs text-slate-600 font-medium">37년~42년 전도 정책 연혁</p>
            </div>
          </div>

          {/* 우측: 알림 및 LIVE 인디케이터 */}
          <div className="flex items-center gap-4">
            {/* 알림 영역 */}
            <div className="flex items-center">
              {notifications.length > 0 && (
                <div className="flex flex-row gap-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="animate-slide-in bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1"
                    >
                      <span className="text-lg">📈</span>
                      <span>{notif.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* LIVE 인디케이터 */}
            <div className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-sm font-bold">LIVE</span>
              <span className="text-white text-xs">{currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>
        </div>

      </div>

    </header>
  );
};

export default Header;