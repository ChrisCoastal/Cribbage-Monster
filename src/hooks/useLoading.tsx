import { useState } from 'react';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState();

  return { isLoading, setIsLoading };
};

export default useLoading;
