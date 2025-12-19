import { useState, useCallback, useEffect } from 'react';

const useCountdown = (seconds = 3, onComplete) => {
  const [count, setCount] = useState(null);

  const startCountdown = useCallback(() => {
    setCount(seconds);
  }, [seconds]);

  useEffect(() => {
    if (count === null) return;

    if (count === 0) {
      if (onComplete) onComplete();
      setCount(null); // Reset
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return { count, startCountdown, isCounting: count !== null };
};

export default useCountdown;