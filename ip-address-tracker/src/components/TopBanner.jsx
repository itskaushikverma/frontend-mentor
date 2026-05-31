import { useEffect, useState, useCallback } from 'react';
import { MotionH1, MotionForm, MotionButton, MotionDiv } from './MotionWrapper';
import { MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DOMAIN_REGEX, IP_REGEX } from '../constant.js';
import { APIKEY } from '../utils/getAPIKey.js';
import axios from 'axios';
import InfoCard from './InfoCard.jsx';

const isValidSearchValue = (value) => IP_REGEX.test(value) || DOMAIN_REGEX.test(value);

const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .refine((value) => value === '' || isValidSearchValue(value), {
      message: 'Please enter a valid IP address or domain',
    }),
});

export default function TopBanner({ setAPILocation, apiLocation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
    mode: 'onTouched',
    defaultValues: {
      query: '',
    },
  });

  const fetchData = useCallback(
    async (formData) => {
      setIsLoading(true);
      try {
        if (!APIKEY) {
          setError('Missing API key. Please provide your own IPify API key.');
          return;
        }

        setError('');
        const params = { apiKey: APIKEY };

        if (formData.query) {
          if (DOMAIN_REGEX.test(formData.query)) {
            params.domain = formData.query;
          } else {
            params.ipAddress = formData.query;
          }
        }

        const res = await axios.get(`https://geo.ipify.org/api/v2/country,city`, { params });

        setAPILocation(res.data);
      } catch (err) {
        setError(
          err.response?.data?.messages ||
            'Failed to fetch location data: ' + (err.message || 'Unknown error'),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setAPILocation],
  );

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchData({ query: '8.8.8.8' });
    };
    loadInitialData();
  }, [fetchData]);

  return (
    <div className="relative z-10 flex h-1/3 flex-col items-center space-y-4 p-5 px-6 sm:space-y-6 sm:p-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[url('/pattern-bg-desktop.png')] bg-cover bg-center bg-no-repeat" />

      <MotionH1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-2xl font-medium tracking-wide text-white md:text-3xl"
      >
        <MapPin className="h-8 w-8" />
        IP Address Tracker
      </MotionH1>

      <MotionForm
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit(fetchData)}
        noValidate
        className="relative flex w-full max-w-xl rounded-xl bg-white shadow-2xl"
      >
        <div className="relative flex-1">
          <label htmlFor="ip-address" className="sr-only">
            IP Address or domain
          </label>
          <input
            id="ip-address"
            type="text"
            inputMode="text"
            autoComplete="off"
            placeholder="Search for any IP address or domain"
            {...register('query')}
            className={`w-full rounded-l-xl px-5 py-4 text-sm outline-none placeholder:text-gray-500 focus:outline-none md:text-base`}
          />
        </div>

        <MotionButton
          type="submit"
          disabled={isLoading}
          whileHover="hover"
          whileTap="tap"
          className="cursor-pointer rounded-r-xl bg-gray-900 px-4 transition-colors hover:bg-black disabled:bg-gray-700"
          aria-label="Search"
        >
          <MotionDiv
            variants={{ hover: { scale: 1.1 }, tap: { scale: 0.9 } }}
            className="flex h-full w-full items-center justify-center text-white"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ChevronRight className="h-6 w-6 stroke-3" />
            )}
          </MotionDiv>
        </MotionButton>

        {errors?.query && (
          <span className="absolute right-0 -bottom-6 text-xs text-red-500 italic">
            {errors.query.message}
          </span>
        )}
      </MotionForm>

      <InfoCard
        apiLocation={apiLocation}
        error={error}
        isLoading={isLoading}
        fetchData={fetchData}
      />
    </div>
  );
}
