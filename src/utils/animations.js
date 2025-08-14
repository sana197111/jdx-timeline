// 사용 예시
import useCountUp from './hooks/useCountUp';
import useAutoHighlight from './hooks/useAutoHighlight';
import { animateValue, easings, formatNumber } from './utils/animations';

// 컴포넌트 내에서
const { formattedValue, start } = useCountUp({
  end: 2847,
  duration: 2500,
  decimals: 2,
  onComplete: () => console.log('완료!')
});

const { activeIndex, pause, resume } = useAutoHighlight({
  totalItems: 5,
  intervalDuration: 10000
});