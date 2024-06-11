import { useEffect, useState } from 'react';
import Papa from 'papaparse';

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

export const useDataLoader = () => {
  const [usages, setUsages] = useState<Usage[]>([]);
  const [costs, setCosts] = useState<Cost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        fetch('/usages.csv')
        .then(response => response.text())
        .then(data => {
          Papa.parse<Usage>(data, {
            header: true,
            dynamicTyping: true,
            complete: result => setUsages(result.data),
          });
        });

        fetch('/costs.csv')
        .then(response => response.text())
        .then(data => {
          Papa.parse<Cost>(data, {
            header: true,
            dynamicTyping: true,
            complete: result => setCosts(result.data),
          });
        });
      } catch (error) {
        alert('data is fell')
      } finally {
        setLoading(false);
      }
    }

    loadData()
  }, []);

  return { usages, costs, loading };
};
