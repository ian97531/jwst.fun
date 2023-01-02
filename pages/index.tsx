import clsx from 'clsx';
import FilterControls from 'components/filter-controls/FilterControls';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Sidebar from 'components/sidebar/Sidebar';
import Viewport from 'components/viewport/Viewport';
import { ObservationId, OBSERVATIONS } from 'data/observations.constants';
import { FilterConfig } from 'data/observations.types';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from 'styles/index.module.css';
import { isDomRuntime } from 'utils/runtime/runtime.helpers';

const INITIAL_SELECTED_OBSERVATION_ID: ObservationId = "jw02731";

export default function Home() {
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

  const initialScale = useMemo(() => {
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

      const sidebarWidth = Number.parseInt(
        computedStyle.getPropertyValue("--sidebar-width"),
        10
      );
      const canvasViewportHeight =
        browserViewportHeight - footerHeight - headerHeight - 30;
      const canvasViewportWidth = browserViewportWidth - sidebarWidth - 30;

      const heightRatio =
        canvasViewportHeight / selectedObservation.imageSizePixels[1];
      const widthRatio =
        canvasViewportWidth / selectedObservation.imageSizePixels[0];

      const scale = Math.min(heightRatio, widthRatio, 1);
      return scale;
    } else {
      return 0;
    }
  }, []);

  const [scale, setScale] = useState(0);

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
      Object.values(OBSERVATIONS).map(
        ({ name, imageSizePixels }) =>
          `${name} - ${imageSizePixels[0]}px × ${imageSizePixels[1]}px`
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

  useEffect(() => {
    setScale(initialScale);
  }, [initialScale]);

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

      <main className={styles.main}>
        <nav className={styles.nav}>
          <Header
            selectedObservation={selectedObservationName}
            filterAdjustmentOpen={filterAdjustmentsOpen}
            observations={OBSERVATIONS}
            onSelectObservation={updateSelectedObservation}
            onToggleFilterAdjustments={setIsFilterAdjustmentsOpen}
          />

          <Sidebar hidden={!filterAdjustmentsOpen}>
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
          <Footer scale={scale} />
        </nav>

        <Viewport
          className={styles.viewport}
          initialScale={initialScale}
          isolateFilter={isolatedFilterName}
          filterConfigs={filterConfigs}
          observation={selectedObservation}
          onChangeScale={setScale}
        />
      </main>
    </>
  );
}
