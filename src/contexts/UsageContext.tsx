import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useDataLoader } from '../hooks/useDataLoader';

interface Usage {
  type: string;
  created_at: string;
  model: string;
  usage_input: number;
  usage_output: number;
}

interface Cost {
  model: string;
  input: number;
  output: number;
}

interface UsageContextProps {
  usages: Usage[];
  costs: Cost[];
  filter: (type: string | null, model: string | null) => void;
  filteredUsages: Usage[];
  loading: boolean;
}

export const UsageContext = createContext<UsageContextProps | null>(null);

export const UsageProvider = ({ children }: { children: ReactNode }) => {
  const { usages, costs, loading } = useDataLoader();
  const [filteredUsages, setFilteredUsages] = useState<Usage[]>([]);
  const [filters, setFilters] = useState<{ type: string | null; model: string | null }>({ type: null, model: null });

  useEffect(() => {
    let filtered = usages;
    if (filters.type) {
      filtered = filtered.filter(usage => usage.type === filters.type);
    }
    if (filters.model) {
      filtered = filtered.filter(usage => usage.model === filters.model);
    }
    setFilteredUsages(filtered);
  }, [usages, filters]);

  const filter = (type: string | null, model: string | null) => {
    setFilters({ type, model });
  };

  return (
    <UsageContext.Provider value={{ usages, costs, filter, filteredUsages, loading }}>
      {children}
    </UsageContext.Provider>
  );
};
