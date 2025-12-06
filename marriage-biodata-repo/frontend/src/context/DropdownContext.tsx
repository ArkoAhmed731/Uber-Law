import React, { createContext, useContext, useMemo, useState } from 'react';
import { DropdownOption } from '../types';

interface DropdownState {
  [key: string]: DropdownOption[];
}

interface DropdownContextValue {
  options: DropdownState;
  fetchOptions: (type: string, params?: Record<string, string | number | undefined>) => Promise<DropdownOption[]>;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const buildKey = (type: string, params?: Record<string, string | number | undefined>) => {
  if (!params || Object.keys(params).length === 0) return type;
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) search.append(key, String(value));
  });
  return `${type}?${search.toString()}`;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const DropdownProvider = ({ children }: { children: React.ReactNode }) => {
  const [options, setOptions] = useState<DropdownState>({});

  const fetchOptions: DropdownContextValue['fetchOptions'] = async (type, params) => {
    const key = buildKey(type, params);
    if (options[key]) return options[key];

    const search = params
      ? `?${new URLSearchParams(
          Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined).map(([k, v]) => [k, String(v)]))
        ).toString()}`
      : '';

    const response = await fetch(`${API_BASE}/dropdowns/${type}${search}`);
    if (!response.ok) throw new Error('Failed to fetch dropdown');
    const data: DropdownOption[] = await response.json();
    setOptions((prev) => ({ ...prev, [key]: data }));
    return data;
  };

  const value = useMemo(() => ({ options, fetchOptions }), [options]);

  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('useDropdownContext must be used within DropdownProvider');
  return ctx;
};
