import type { Observation } from "data/observations.types";

// For each filter, check to see if a config can be loaded
// from localstorage. If so, return that config, if not,
// return the default config for that filter.
export const getFilterConfigsForObservationId = (
  observationId: string,
  observations: Record<string, Observation>
) =>
  Object.fromEntries(
    observations[observationId].filters.map(({ name, defaultConfig }) => {
      try {
        const storedValue = localStorage.getItem(`${observationId}-${name}`);
        if (storedValue) {
          return [name, JSON.parse(storedValue)];
        }
      } catch {}
      return [name, defaultConfig];
    })
  );

export const deleteStoredFilterConfigsForObservationId = (
  observationId: string,
  observations: Record<string, Observation>
) =>
  observations[observationId].filters.forEach(({ name }) => {
    try {
      localStorage.removeItem(`${observationId}-${name}`);
    } catch {}
  });

// Get the default filter configs for each filter in the
// specified observationId.
export const getDefaultFilterConfigsForObservationId = (
  observationId: string,
  observations: Record<string, Observation>
) =>
  Object.fromEntries(
    observations[observationId].filters.map(({ name, defaultConfig }) => [
      name,
      defaultConfig,
    ])
  );
