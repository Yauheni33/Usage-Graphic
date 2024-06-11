import React, { Suspense, lazy } from 'react';
import { UsageProvider, UsageContext } from './contexts/UsageContext';
import { Loader } from './components/Loader'

import styles from './App.module.scss'



const UsageChart = lazy(() => import('./components/UsageChart'));
const Filters = lazy(() => import('./components/Filters'));

const AppContent = () => {
  const context = React.useContext(UsageContext);

  if (!context) {
    return <div>error</div>
  }

  const { loading } = context;

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      <Suspense
        fallback={
          <Loader />
        }
      >
        <h1>Usage Cost Calculator</h1>
        <Filters />
        <div className={styles.graphicContainer}>
          <UsageChart/>
        </div>
      </Suspense>
    </div>
  );
};


export const App = () => {
  return (
    <UsageProvider>
      <AppContent />
    </UsageProvider>
  );
};