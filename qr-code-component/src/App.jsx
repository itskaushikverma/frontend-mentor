import React, { useEffect, useState } from 'react';
import { MotionDiv, MotionH1, MotionP } from './components/MotionWrapper';

export default function App() {
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    const handleGet = async () => {
      try {
        const resp = await fetch('https://pget.vercel.app');
        const data = await resp.json();
        setPortfolioUrl(data.portfolio);
      } catch (e) {
        console.error('Failed to load portfolio URL', e);
      }
    };
    handleGet();
  }, []);

  return (
    <main className="bg-light-gray-100 flex min-h-screen flex-col items-center justify-center p-6 font-['Outfit']">
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[320px] rounded-2xl bg-white p-4 pb-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)]"
        >
          <MotionDiv
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
            className="mb-6 overflow-hidden rounded-xl"
          >
            <img
              src="/qr-code.png"
              alt="QR Code"
              className="mx-auto block h-[300px] w-[300px] rounded-xl"
            />
          </MotionDiv>

          <div className="flex flex-col gap-4 px-4 text-center">
            <MotionH1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-dark-blue-700 text-[22px] leading-tight font-bold"
            >
              Improve your front-end skills by building projects
            </MotionH1>

            <MotionP
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-dark-blue-600 text-[15px] leading-[1.4] tracking-wide"
            >
              Scan the QR to visit Frontend Mentor and take your coding skills to the next level.
            </MotionP>
          </div>
        </MotionDiv>
      </div>

      <footer className="w-full text-center">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-grayish-blue mt-12 text-center text-[11px]"
        >
          <div className="text-xs text-gray-500">
            <p>
              Built by{' '}
              <a
                href={portfolioUrl}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kaushik Verma
              </a>{' '}
              with React and Tailwind CSS.
            </p>
            <p>Design inspired by Frontend Mentor's QR Code Component.</p>
          </div>
        </MotionDiv>
      </footer>
    </main>
  );
}
