import { releaseProxy, Remote, wrap } from 'comlink';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Runtime } from '../runtime/runtime.constants';
import { getRuntime, isDomRuntime } from '../runtime/runtime.helpers';

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
