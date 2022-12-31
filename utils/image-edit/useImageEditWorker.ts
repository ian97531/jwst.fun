import { useWorker } from 'utils/worker/useWorker';

import { ImageEditWorker } from './image-edit.worker';

export const useImageEditWorker = () => {
  return useWorker<ImageEditWorker>(
    () =>
      new Worker(new URL("./image-edit.worker.ts", import.meta.url), {
        type: "module",
      })
  );
};
