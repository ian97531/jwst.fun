import clsx from 'clsx';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import FilterControls from 'components/sidebar/filter-controls/FilterControls';
import Sidebar from 'components/sidebar/Sidebar';
import Viewport from 'components/viewer/viewport/Viewport';
import { ObservationId, OBSERVATIONS } from 'data/observations.constants';
import { FilterConfig } from 'data/observations.types';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from 'styles/index.module.css';
import { isDomRuntime } from 'utils/runtime/runtime.helpers';

import { Inconsolata } from '@next/font/google';

const inconsolata = Inconsolata({ subsets: ["latin"] });

const INITIAL_SELECTED_OBSERVATION_ID: ObservationId = "jw02731";

export default function Home() {
  const [scale, setScale] = useState(0);
  const [shouldShowProgress, setShouldShowProgress] = useState(true);
  const [filterAdjustmentsOpen, setIsFilterAdjustmentsOpen] = useState(true);
  const [isolatedFilterName, setIsolatedFilterName] = useState<string | null>(
    null
  );
  const [selectedObservationName, setSelectedObservationName] =
    useState<ObservationId>(INITIAL_SELECTED_OBSERVATION_ID);

  const selectedObservation = OBSERVATIONS[selectedObservationName];

  const [filterConfigs, setFilterControlConfigs] = useState(() =>
    Object.fromEntries(
      selectedObservation.filters.map(({ name, defaultConfig }) => [
        name,
        defaultConfig,
      ])
    )
  );

  const [initialScale, initialPosition] = useMemo<
    [number, [number, number]]
  >(() => {
    if (isDomRuntime()) {
      const browserViewportHeight =
        window.visualViewport?.height ?? document.body.clientHeight;
      const browserViewportWidth =
        window.visualViewport?.width ?? document.body.clientWidth;

      const computedStyle = window.getComputedStyle(document.documentElement);
      const headerHeight = Number.parseInt(
        computedStyle.getPropertyValue("--header-height"),
        10
      );
      const footerHeight = Number.parseInt(
        computedStyle.getPropertyValue("--footer-height"),
        10
      );

      const sidebarWidth = filterAdjustmentsOpen
        ? Number.parseInt(computedStyle.getPropertyValue("--sidebar-width"), 10)
        : 0;
      const canvasViewportHeight =
        browserViewportHeight - footerHeight - headerHeight;
      const canvasViewportWidth = browserViewportWidth - sidebarWidth;

      const heightRatio =
        (canvasViewportHeight - 30) / selectedObservation.imageSizePixels[1];
      const widthRatio =
        (canvasViewportWidth - 30) / selectedObservation.imageSizePixels[0];

      const scale = Math.min(heightRatio, widthRatio, 1);

      const canvasViewportCenterY = headerHeight + canvasViewportHeight / 2;
      const canvasViewportCenterX = (browserViewportWidth - sidebarWidth) / 2;

      const offsetX = browserViewportWidth / 2 - canvasViewportCenterX;
      const offsetY = browserViewportHeight / 2 - canvasViewportCenterY;

      return [scale, [-offsetX, offsetY]];
    } else {
      return [0, [0, 0]];
    }
  }, [filterAdjustmentsOpen, selectedObservationName]);

  const updateConfigForFilter = useCallback(
    (name: string, updatedFilterConfig: FilterConfig) => {
      setFilterControlConfigs((prev) => ({
        ...prev,
        [name]: updatedFilterConfig,
      }));
    },
    []
  );

  const updateSelectedObservation = useCallback((name: string) => {
    setSelectedObservationName(name);

    const newFilterConfigs = Object.fromEntries(
      OBSERVATIONS[name].filters.map(({ name, defaultConfig }) => [
        name,
        defaultConfig,
      ])
    );
    setFilterControlConfigs(newFilterConfigs);
  }, []);

  const observationOptions = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(OBSERVATIONS).map(([id, { name }]) => [id, name])
      ),
    [OBSERVATIONS]
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

  useEffect(() => {
    setShouldShowProgress(true);
    setScale(initialScale);
    setIsolatedFilterName(null);
  }, [selectedObservationName]);

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
            selectedObservation={selectedObservationName}
            filterAdjustmentOpen={filterAdjustmentsOpen}
            observationOptions={observationOptions}
            onSelectObservation={updateSelectedObservation}
            onToggleFilterAdjustments={setIsFilterAdjustmentsOpen}
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
                  !filterAdjustmentsOpen && styles.centerLoading
                )}
              >
                Loading...
              </div>
            </div>
            <Sidebar
              className={clsx(
                styles.sidebar,
                !filterAdjustmentsOpen && styles.hideSidebar
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
            </Sidebar>
          </section>
          <Footer
            className={styles.footer}
            imageHeight={selectedObservation.imageSizePixels[1]}
            imageWidth={selectedObservation.imageSizePixels[0]}
            scale={scale}
          />
        </nav>

        <Viewport
          className={styles.viewport}
          filterConfigs={filterConfigs}
          initialPosition={initialPosition}
          initialScale={initialScale}
          isolateFilter={isolatedFilterName}
          key={selectedObservationName}
          observation={selectedObservation}
          onChangeScale={setScale}
          onImageRendered={finishLoad}
        />
      </main>
    </>
  );
}
