import { useState, useEffect } from 'react';

/**
 * Detects user's system color scheme preference.
 * Listens for changes (e.g. user switches OS dark mode).
 * Returns true if user prefers dark mode.
 */
export function usePrefersDark(): boolean {
  const [prefersDark, setPrefersDark] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setPrefersDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersDark;
}
