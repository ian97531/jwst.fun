import { Remote, wrap } from 'comlink';
import { useMemo } from 'react';
import { Runtime } from 'utils/runtime/runtime.constants';
import { getRuntime, isDomRuntime } from 'utils/runtime/runtime.helpers';

export function useWorker<WorkerApi>(
  createWorker: () => Worker
): Remote<WorkerApi> | undefined {
  const isDomRuntime = getRuntime() === Runtime.Dom;
  return useMemo(() => {
    if (isDomRuntime) {
      const worker = createWorker();
      return wrap<WorkerApi>(worker);
    }
  }, [isDomRuntime]);
}
