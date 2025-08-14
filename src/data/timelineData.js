// data/timelineData.js
export const timelineData = {
  periods: [
    {
      id: 'start',
      year: '37년 말',
      title: '오픈전도 시작',
      period: '시작기',
      description: '코로나 극복 첫 도전',
      index: 100,
      growth: 0,
      color: 'blue',
      achievements: [
        '🛡️ 코로나 극복 첫발',
        '🤝 신뢰 관계 구축'
      ],
      challenges: [
        '청년 신앙 감소',
        '사회적 편견 심화',
        '전도 환경 악화'
      ],
      impact: '전도의 새로운 시작점 마련'
    },
    {
      id: 'growth',
      year: '39년',
      title: '유연한전도 + 그로어스',
      period: '도약기',
      description: '체계적 성장 시작',
      index: 450,
      growth: 345,
      color: 'blue',
      achievements: [
        '💬 상담 시스템 도입',
        '📚 체계적 교육 시작'
      ],
      challenges: [
        '온라인 전환 어려움',
        '교육 체계 부재'
      ],
      impact: '전도 시스템 체계화'
    },
    {
      id: 'innovation',
      year: '40년',
      title: '주3회 대면 + 고전학',
      period: '혁신기',
      description: '전국 1등 달성',
      index: 1200,
      growth: 1254,
      color: 'yellow',
      isHighlight: true,
      trophy: '🏆',
      achievements: [
        '🏆 전국 1등 달성',
        '✨ 대면 전환 성공'
      ],
      challenges: [
        '대면 전환 우려',
        '무신앙 증가'
      ],
      impact: '과감한 도전으로 최고 성과 달성'
    },
    {
      id: 'achievement',
      year: '41년',
      title: '마지막나팔 + 선개강',
      period: '성과기',
      description: '2년 연속 전국 1등',
      index: 2400,
      growth: 1345,
      color: 'yellow',
      isHighlight: true,
      trophy: '🏆🏆',
      achievements: [
        '🏆 2년 연속 1등',
        '🔄 위기→기회 전환'
      ],
      challenges: [
        '행정 시스템 변경',
        '개인정보 등록 거부감'
      ],
      impact: '위기 극복 능력 입증'
    },
    {
      id: 'evolution',
      year: '42년',
      title: 'N개강 전환',
      period: '진화기',
      description: '새로운 도전',
      index: 2847,
      growth: 873,
      color: 'blue',
      isCurrent: true,
      achievements: [
        '🔥 핍박 극복 중',
        '🚀 새로운 도전'
      ],
      challenges: [
        '정부/언론 핍박 증가',
        '의심과 경계 상승',
        '침 맞는 사례 증가'
      ],
      impact: '새로운 전도 패러다임 구축'
    }
  ],
  
  metrics: {
    conversionRate: {
      '37년': 45,
      '39년': 58,
      '40년': 72,
      '41년': 79,
      '42년': 82
    },
    teacherGrowth: {
      '37년': 100,
      '39년': 130,
      '40년': 180,
      '41년': 250,
      '42년': 300
    },
    centerRegistration: {
      '37년': 60,
      '39년': 75,
      '40년': 88,
      '41년': 95,
      '42년': 100
    }
  },

  milestones: [
    { date: '37년 말', event: '오픈전도 시작', type: 'start' },
    { date: '39년 초', event: '유연한 전도 도입', type: 'innovation' },
    { date: '39년 말', event: '그로어스 강연 시작', type: 'education' },
    { date: '40년 1월', event: '주3회 대면 개강', type: 'change' },
    { date: '40년 6월', event: '고전학 프로세스 정립', type: 'system' },
    { date: '40년 말', event: '전국 1등 달성', type: 'achievement' },
    { date: '41년 2월', event: '마지막 나팔 도입', type: 'system' },
    { date: '41년 7월', event: '선개강 시작', type: 'innovation' },
    { date: '41년 말', event: '2년 연속 전국 1등', type: 'achievement' },
    { date: '42년 3월', event: '한달 뒤 등록', type: 'system' },
    { date: '42년 7월', event: 'N개강 전환', type: 'change' }
  ]
};