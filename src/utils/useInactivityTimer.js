import { useEffect, useRef } from 'react';

const useInactivityTimer = (timeoutDuration, onTimeout) => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onTimeout, timeoutDuration);
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer(); // Initialize the timer on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeoutDuration, onTimeout]); // Add dependencies to prevent stale closures

  return resetTimer;
};

export default useInactivityTimer;
