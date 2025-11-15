"use client";

import { useState, useEffect } from 'react';
import Loader from './Loader';

const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader onLoadingComplete={handleLoadingComplete} />}
      {children}
    </>
  );
};

export default LoaderWrapper;

