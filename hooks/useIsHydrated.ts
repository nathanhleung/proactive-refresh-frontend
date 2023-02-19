import { useEffect, useState } from 'react';

function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);

  return isHydrated;
}

export default useIsHydrated;
