import { useContext } from 'react';
import { UsageContext } from '../contexts/UsageContext';

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};
