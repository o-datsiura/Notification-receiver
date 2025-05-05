import { useCallback, useState } from 'react';

export const useQueue = <T>(maxSize: number): [T[], (item: T) => void] => {
  const [queue, setQueue] = useState<T[]>([]);

  const enqueue = useCallback(
    (item: T): void => {
      setQueue((prevQueue) => {
        const newQueue = [...prevQueue, item];
        if (newQueue.length > maxSize) {
          return newQueue.slice(1);
        }

        return newQueue;
      });
    },
    [maxSize],
  );

  return [queue, enqueue];
};
