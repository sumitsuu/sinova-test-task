"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUrlSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get all search params as an object
  const getAll = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // Get a single param by key
  const get = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  // Set multiple params
  const setParams = useCallback(
    (params: Record<string, string | number | boolean | null | undefined>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
    [pathname, router, searchParams],
  );

  // Set a single param
  const setParam = useCallback(
    (key: string, value: string | number | boolean | null | undefined) => {
      setParams({ [key]: value });
    },
    [setParams],
  );

  // Remove a single param
  const remove = useCallback(
    (key: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete(key);

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
    [pathname, router, searchParams],
  );

  // Remove multiple params
  const removeMultiple = useCallback(
    (keys: string[]) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      keys.forEach((key) => current.delete(key));

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
    [pathname, router, searchParams],
  );

  // Clear all params
  const clearAll = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  // Check if a param exists
  const has = useCallback(
    (key: string) => {
      return searchParams.has(key);
    },
    [searchParams],
  );

  return {
    getAll,
    get,
    setParam,
    setParams,
    remove,
    removeMultiple,
    clearAll,
    has,
  };
}
