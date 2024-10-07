"use client";

import { useState, useCallback } from "react";
import { debounce } from "lodash";

type PaginatedResponse<T> = {
  length: number;
  data: T[];
  isLoading?: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

function useFetchData<T>(url: string) {
  const [data, setData] = useState<PaginatedResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (queryString: string = "") => {
      setLoading(true);
      try {
        const response = await fetch(`${url}?${queryString}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: PaginatedResponse<T> = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  const debouncedFetch = debounce(fetchData, 300);

  return { data, loading, error, debouncedFetch, fetchData };
}

export default useFetchData;
