import { MotionDiv, MotionForm } from './MotionWrapper';
import InputField from './InputField';
import ArrowIcon from '../assets/svg/icon-arrow.svg';

export default function AgeForm({ register, errors, onSubmit }) {
  return (
    <>
      <MotionForm
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
        }}
        className="w-full"
        onSubmit={onSubmit}
      >
        <div className="flex w-full justify-between gap-4 sm:gap-6 md:w-3/4 md:justify-start lg:gap-8">
          <InputField
            label="DAY"
            placeholder="DD"
            id="day"
            name="day"
            inputProps={register('day')}
            error={errors.day?.message}
          />
          <InputField
            label="MONTH"
            placeholder="MM"
            id="month"
            name="month"
            inputProps={register('month')}
            error={errors.month?.message}
          />
          <InputField
            label="YEAR"
            placeholder="YYYY"
            id="year"
            name="year"
            inputProps={register('year')}
            error={errors.year?.message}
          />
        </div>

        <MotionDiv
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative my-12 flex w-full items-center sm:my-10"
        >
          <div className="w-full border-t border-gray-200" />
          <button
            type="submit"
            className="group absolute left-1/2 flex h-16 w-16 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-xl transition-colors duration-300 hover:bg-gray-900 sm:right-0 sm:left-auto sm:h-20 sm:w-20 sm:translate-x-0 lg:h-24 lg:w-24"
            aria-label="Calculate age"
          >
            <MotionDiv whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <img
                src={ArrowIcon}
                alt="Calculate"
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
              />
            </MotionDiv>
          </button>
        </MotionDiv>
      </MotionForm>
    </>
  );
}
