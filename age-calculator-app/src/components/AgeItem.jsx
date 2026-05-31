import { MotionDiv } from './MotionWrapper';
import AnimatedNumber from './AnimateNumber';

export default function AgeItem({ value, label, variants, className }) {
  const itemVariants = variants ?? {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };

  return (
    <MotionDiv variants={itemVariants} className={className ?? 'flex items-center gap-2 sm:gap-4'}>
      <span className="text-purple-600">
        <AnimatedNumber value={value} />
      </span>
      <span className="text-gray-900">{label}</span>
    </MotionDiv>
  );
}
