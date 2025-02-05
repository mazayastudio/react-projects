import { useEffect } from 'react';

export function useKey(key, action) {

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    };

    const eventType = 'keydown';
    document.addEventListener(eventType, handleKeydown);
    return () => document.removeEventListener(eventType, handleKeydown);
  }, [action, key]);
}