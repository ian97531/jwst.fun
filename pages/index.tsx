import clsx from 'clsx';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Button from 'components/library/button/Button';
import FilterControls from 'components/sidebar/filter-controls/FilterControls';
import Sidebar from 'components/sidebar/Sidebar';
import Viewport from 'components/viewer/viewport/Viewport';
import { ObservationId, OBSERVATIONS } from 'data/observations.constants';
import { Filter, FilterConfig } from 'data/observations.types';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from 'styles/index.module.css';
import {
    deleteStoredFilterConfigsForObservationId, getDefaultFilterConfigsForObservationId,
    getFilterConfigsForObservationId
} from 'utils/filter-configs/filter-config.helpers';
import { isDomRuntime } from 'utils/runtime/runtime.helpers';

import { Inconsolata } from '@next/font/google';

const inconsolata = Inconsolata({ subsets: ["latin"] });

const INITIAL_SELECTED_OBSERVATION_ID: ObservationId = "jw02731";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [shouldShowProgress, setShouldShowProgress] = useState(true);
  const [viewportScale, setViewportScale] = useState(0);

  // If the user has enabled the "Isolate" switch on one of the filters, the
  // name of that filter is stored here, otherwise this value is null.
  const [isolatedFilterName, setIsolatedFilterName] = useState<string | null>(
    null
  );

  const [selectedObservationId, setSelectedObservationId] =
    useState<ObservationId>(INITIAL_SELECTED_OBSERVATION_ID);
  const selectedObservation = OBSERVATIONS[selectedObservationId];

  // The current filter adjustment settings for each filter.
  const [filterConfigs, setFilterControlConfigs] = useState(() =>
    getDefaultFilterConfigsForObservationId(selectedObservationId, OBSERVATIONS)
  );

  const updateConfigForFilter = useCallback(
    (filterName: string, updatedFilterConfig: FilterConfig) => {
      setFilterControlConfigs((prev) => ({
        ...prev,
        [filterName]: updatedFilterConfig,
      }));

      // Attempt to store the filter adjustments to localstorage.
      try {
        localStorage.setItem(
          `${selectedObservationId}-${filterName}`,
          JSON.stringify(updatedFilterConfig)
        );
      } catch {}
    },
    []
  );

  const isolateFilter = useCallback(
    (filterName: string, newValue: boolean) => {
      if (newValue === false && isolatedFilterName === filterName) {
        setIsolatedFilterName(null);
      } else {
        setIsolatedFilterName(filterName);
      }
    },
    [isolatedFilterName]
  );

  const finishLoad = useCallback(() => {
    if (shouldShowProgress) {
      setShouldShowProgress(false);
    }
  }, [shouldShowProgress]);

  const observationMenuOptions = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(OBSERVATIONS).map(([id, { name }]) => [id, name])
      ),
    [OBSERVATIONS]
  );

  const resetFilterOptions = useCallback(() => {
    deleteStoredFilterConfigsForObservationId(
      selectedObservationId,
      OBSERVATIONS
    );
    setFilterControlConfigs(
      getDefaultFilterConfigsForObservationId(
        selectedObservationId,
        OBSERVATIONS
      )
    );
  }, [selectedObservationId]);

  // Build the initial viewport scale and image position to ensure that
  // then the image is rendered, it's centered inside the available viewport
  // and not overlapped by the header, footer, or sidebar.
  const [initialViewportScale, initialImagePosition] = useMemo<
    [number, [number, number]]
  >(() => {
    if (isDomRuntime()) {
      // Find the width and height of the browser viewport.
      const browserViewportHeight =
        window.visualViewport?.height ?? document.body.clientHeight;
      const browserViewportWidth =
        window.visualViewport?.width ?? document.body.clientWidth;

      // Find the header, footer, and sidebar dimensions.
      const computedStyle = window.getComputedStyle(document.documentElement);
      const headerHeight = Number.parseInt(
        computedStyle.getPropertyValue("--header-height"),
        10
      );
      const footerHeight = Number.parseInt(
        computedStyle.getPropertyValue("--footer-height"),
        10
      );
      const sidebarWidth = isSidebarOpen
        ? Number.parseInt(computedStyle.getPropertyValue("--sidebar-width"), 10)
        : 0;

      // Compute the dimensions of the available canvas area that's not
      // obscured by the header footer or sidebar.
      const canvasViewportHeight =
        browserViewportHeight - footerHeight - headerHeight;
      const canvasViewportWidth = browserViewportWidth - sidebarWidth;

      // Find the correct scale to start the image off with given the available
      // canvas dimensions and the dimensions of the image to render.
      const imageHeightRatio =
        (canvasViewportHeight - 30) / selectedObservation.imageSizePixels[1];
      const imageWidthRatio =
        (canvasViewportWidth - 30) / selectedObservation.imageSizePixels[0];
      const scale = Math.min(imageHeightRatio, imageWidthRatio, 1);

      // Find the x and y offset from the browser viewport center that
      // represents the center of the available canvas where the image should be
      // positioned.
      const canvasViewportCenterY = headerHeight + canvasViewportHeight / 2;
      const canvasViewportCenterX = (browserViewportWidth - sidebarWidth) / 2;
      const offsetX = browserViewportWidth / 2 - canvasViewportCenterX;
      const offsetY = browserViewportHeight / 2 - canvasViewportCenterY;

      return [scale, [-offsetX, offsetY]];
    } else {
      // During server-side rendering, skip the calculations above.
      return [0, [0, 0]];
    }
  }, [isSidebarOpen, selectedObservationId]);

  useEffect(() => {
    // If the observation is changed, show progress, update the viewport scale,
    // and clear any isolated filter settings, and initialize the filter settings.
    setShouldShowProgress(true);
    setViewportScale(initialViewportScale);
    setIsolatedFilterName(null);
    setFilterControlConfigs(
      getFilterConfigsForObservationId(selectedObservationId, OBSERVATIONS)
    );
  }, [selectedObservationId]);

  return (
    <>
      <Head>
        <title>JWST.fun</title>
        <meta
          name="description"
          content="An application for mixing and colorizing images from different wavelengths of light."
        />
        <link rel="icon" href="/hexagon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={clsx(styles.main, inconsolata.className)}>
        <nav className={styles.nav}>
          <Header
            className={styles.header}
            selectedObservationId={selectedObservationId}
            filterAdjustmentOpen={isSidebarOpen}
            observationOptions={observationMenuOptions}
            onSelectObservation={setSelectedObservationId}
            onToggleFilterAdjustments={setIsSidebarOpen}
          />

          <section className={styles.mainArea}>
            <div
              className={clsx(
                styles.progressPane,
                shouldShowProgress && styles.showLoadingProgress
              )}
            >
              <div
                className={clsx(
                  styles.loading,
                  !isSidebarOpen && styles.centerLoading
                )}
              >
                Loading JWST NIRCam filter data...
              </div>
            </div>
            <Sidebar
              className={clsx(
                styles.sidebar,
                !isSidebarOpen && styles.hideSidebar
              )}
            >
              {Object.entries(filterConfigs).map(([name, settings]) => (
                <FilterControls
                  config={settings}
                  disable={
                    isolatedFilterName !== null && isolatedFilterName !== name
                  }
                  key={name}
                  name={name}
                  isolateFilter={isolatedFilterName === name}
                  onToggleIsolateFilter={isolateFilter}
                  onUpdateConfig={updateConfigForFilter}
                />
              ))}
              <Button
                className={styles.resetButton}
                onClick={resetFilterOptions}
              >
                Reset to defaults
              </Button>
            </Sidebar>
          </section>
          <Footer
            className={styles.footer}
            imageHeight={selectedObservation.imageSizePixels[1]}
            imageWidth={selectedObservation.imageSizePixels[0]}
            scale={viewportScale}
          />
        </nav>

        <Viewport
          className={styles.viewport}
          filterConfigs={filterConfigs}
          initialImagePosition={initialImagePosition}
          initialScale={initialViewportScale}
          isolateFilterName={isolatedFilterName}
          key={selectedObservationId}
          currentObservation={selectedObservation}
          onChangeScale={setViewportScale}
          onImageRendered={finishLoad}
        />
      </main>
    </>
  );
}
