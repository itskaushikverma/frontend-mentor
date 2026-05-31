import { AlertCircle, Shield } from 'lucide-react';
import { MotionDiv, MotionForm } from './MotionWrapper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

const APIKeySchema = z.object({
  APIKey: z.string().trim(),
});

export default function InfoCard({ apiLocation, error, isLoading, fetchData }) {
  const [portfolioUrl, setPortfolioUrl] = useState('');

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(APIKeySchema),
    mode: 'onTouched',
  });

  const handleAPIKey = async (data) => {
    if (data.APIKey) {
      localStorage.setItem('ipify_api_key', data.APIKey);
      await fetchData();
    }
  };

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
    <div className="pointer-events-none absolute z-50 mt-35 flex w-full justify-center px-6 md:mt-45">
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="pointer-events-auto flex w-full max-w-6xl justify-center rounded-2xl bg-white shadow-xl shadow-black/10"
      >
        {error ? (
          <div
            className={`flex max-w-xl flex-col items-center space-y-6 p-4 text-xs ${error.includes('key') ? 'justify-between' : 'justify-center'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="max-w-xl text-center text-sm font-medium text-red-500 lg:text-base">
                {error}
              </p>
            </div>

            {error.includes('key') && (
              <div className="flex w-full flex-col items-center gap-3">
                <MotionForm
                  onSubmit={handleSubmit(handleAPIKey)}
                  className="flex w-full rounded-lg border border-gray-500"
                >
                  <input
                    id="api-key"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    {...register('APIKey')}
                    placeholder="Enter custom IPify API Key"
                    className="grow px-4 py-3 text-sm text-gray-800 outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-r-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Save & Retry
                  </button>
                </MotionForm>
                <div className="flex flex-col gap-1.5">
                  <p className="text-center text-xs text-gray-400">
                    Create a free account at{' '}
                    <a
                      href="https://geo.ipify.org/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      geo.ipify.org
                    </a>{' '}
                    to get your own key.
                  </p>
                  <p className="flex items-center justify-center gap-1 text-center text-[11px] text-gray-400/80">
                    <Shield className="h-3 w-3" />
                    Privacy guaranteed: Your API key remains strictly on your device and is never
                    sent to our servers.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full w-full flex-col pb-3">
            <div className="grid grid-cols-1 divide-gray-200 p-6 text-center md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:p-10 lg:text-left">
              <InfoBlock label="IP Address" value={apiLocation?.ip} isLoading={isLoading} />
              <InfoBlock
                label="Location"
                value={`${apiLocation?.location.city}, ${apiLocation?.location.region} ${apiLocation?.location.postalCode}`}
                isLoading={isLoading}
              />
              <InfoBlock
                label="Timezone"
                value={`UTC ${apiLocation?.location.timezone}`}
                isLoading={isLoading}
              />
              <InfoBlock label="ISP" value={apiLocation?.isp} isLoading={isLoading} />
            </div>
            <footer className="w-full text-center">
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
                <p>Design inspired by Frontend Mentor's IP Address Tracker Challenge.</p>
              </div>
            </footer>
          </div>
        )}
      </MotionDiv>
    </div>
  );
}

const InfoBlock = ({ label, value, isLoading }) => {
  return (
    <div className="flex flex-col gap-1 pt-4 lg:gap-3 lg:px-8 lg:pt-0 first:lg:pl-0 last:lg:pr-0">
      <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase md:text-xs">
        {label}
      </span>
      <div className="flex min-h-8 items-center justify-center lg:justify-start">
        {isLoading ? (
          <div className="mt-1 h-7 w-full animate-pulse rounded-md bg-gray-200" />
        ) : (
          <span className="text-xl leading-tight font-medium wrap-break-word text-gray-900 md:text-2xl">
            {value || '-'}
          </span>
        )}
      </div>
    </div>
  );
};
