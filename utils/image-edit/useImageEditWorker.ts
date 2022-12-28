import * as Comlink from 'comlink';
import { useRef } from 'react';

import { useWorker } from '../worker/useWorker';
import { ImageEditWorker } from './image-edit.worker';

export const useImageEditWorker = () => {
  return useWorker<ImageEditWorker>(
    () =>
      new Worker(new URL("./image-edit.worker.ts", import.meta.url), {
        type: "module",
      })
  );
};
