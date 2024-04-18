"use client";
import useSWR, { useSWRConfig } from "swr";

interface IOptions {
  disabled?: any;
  retryCount?: number;
  errorRefetch?: number;
}

// Hook to centralize all useSWR calls and configure error handling
export default function useFetch<T>(
  key: string | null,
  request: () => Promise<T>,
  options?: IOptions
) {
  const { mutate } = useSWRConfig();

  const refetch = () => {
    mutate(key);
  };

  const keyValue = !options ? key : options && options.disabled ? key : null;

  const { data, error, isLoading } = useSWR<T>(keyValue, request, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      const retryValue = options && options.retryCount ? options.retryCount : 0;
      const errorRefetch =
        options && options.errorRefetch ? options.errorRefetch : 10000;

      if (retryCount >= retryValue) return;
      setTimeout(() => revalidate({ retryCount }), errorRefetch);
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
