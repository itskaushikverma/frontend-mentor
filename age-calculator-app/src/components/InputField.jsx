import { MotionDiv } from './MotionWrapper';

export default function InputField({ label, placeholder, id, name, inputProps, error }) {
  return (
    <MotionDiv
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
      }}
      className="max-w-30 flex-1 sm:max-w-40"
    >
      <div className="relative flex w-full flex-col gap-1 sm:gap-2">
        <label
          htmlFor={id}
          className={`text-[11px] font-bold tracking-[0.25em] uppercase transition-colors sm:text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}
        >
          {label}
        </label>
        <input
          type="number"
          id={id}
          name={name || id}
          {...(inputProps || {})}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-3 py-3 text-xl font-extrabold tracking-wider text-gray-900 transition-colors focus:ring-0 focus:outline-none sm:rounded-xl sm:px-6 sm:py-4 sm:text-3xl ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 hover:border-gray-400 focus:border-purple-600'}`}
        />
        {error && (
          <span className="absolute -bottom-5 left-0 text-[9px] leading-tight font-normal text-red-500 italic sm:-bottom-6 sm:text-xs">
            {error}
          </span>
        )}
      </div>
    </MotionDiv>
  );
}
