import clsx from 'clsx';
import FilterControls from 'components/filter-controls/FilterControls';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Sidebar from 'components/sidebar/Sidebar';
import Viewport from 'components/viewport/Viewport';
import { ObservationId, OBSERVATIONS } from 'data/observations.constants';
import { FilterConfig } from 'data/observations.types';
import Head from 'next/head';
import { useCallback, useMemo, useState } from 'react';
import styles from 'styles/index.module.css';

const INITIAL_SELECTED_OBSERVATION_ID: ObservationId = "jw02731";
const INITIAL_SCALE = 0.2;

export default function Home() {
  const [scale, setScale] = useState(INITIAL_SCALE);
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
          initialScale={INITIAL_SCALE}
          isolateFilter={isolatedFilterName}
          filterConfigs={filterConfigs}
          observation={selectedObservation}
          onChangeScale={setScale}
        />
      </main>
    </>
  );
}
