import { useEffect, useState } from 'react';
import { DropdownOption } from '../types';
import { useDropdownContext } from '../context/DropdownContext';

export const useDropdown = (type: string, params?: Record<string, string | number | undefined>) => {
  const { fetchOptions } = useDropdownContext();
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchOptions(type, params)
      .then((data) => {
        if (active) setOptions(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [type, JSON.stringify(params)]); // eslint-disable-line react-hooks/exhaustive-deps

  return { options, loading, error };
};
