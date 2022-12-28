import { Runtime } from "./runtime.constants";

/**
 * Returns true if the app is currently rendering server-side.
 */
export const isNodeRuntime = () =>
  typeof window === "undefined" && typeof self === "undefined";

export const isWorkerRuntime = () =>
  typeof self !== "undefined" &&
  self.hasOwnProperty("WorkerGlobalScope") === true;

export const isDomRuntime = () =>
  typeof window !== "undefined" &&
  window.hasOwnProperty("WorkerGlobalScope") === false;

export const getRuntime = (): Runtime => {
  if (isDomRuntime()) {
    return Runtime.Dom;
  } else if (isWorkerRuntime()) {
    return Runtime.Worker;
  } else {
    return Runtime.Node;
  }
};
