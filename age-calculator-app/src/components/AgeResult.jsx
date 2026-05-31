import { MotionDiv } from './MotionWrapper';
import AgeItem from './AgeItem';

export default function AgeResult({ age }) {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.15, delayChildren: 0.4 }}
    >
      <MotionDiv
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.15, delayChildren: 0.4 }}
        className="mt-8 flex flex-col text-5xl leading-[1.1] font-extrabold tracking-[-0.02em] italic sm:text-7xl lg:text-[104px]"
      >
        <AgeItem value={age.year} label="years" variants={itemVariants} />
        <AgeItem value={age.month} label="months" variants={itemVariants} />
        <AgeItem value={age.day} label="days" variants={itemVariants} />
      </MotionDiv>
    </MotionDiv>
  );
}
