import React, { useState, useEffect } from 'react';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import { Projections } from 'common/models/Projections';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import MiniMap from 'components/MiniMap';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { LoadingScreen } from './LocationPage.style';
import { getStateCode, MetroArea, Region } from 'common/regions';

import { useLocation } from 'common/utils/router';

interface LocationPageProps {
  region: Region;
  projections: Projections;
  title: string;
  description: string;
}

function LocationPage({
  region,
  projections,
  title,
  description,
}: LocationPageProps) {
  const location = useLocation();
  const chartIdMatch = location.hash.match(/chart-(?<chartId>\d+)/);
  const chartId = chartIdMatch?.groups?.chartId ?? '';

  const defaultMapOption = getDefaultMapOption(region);
  const [mapOption, setMapOption] = useState(defaultMapOption);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //const projections = useProjectionsFromRegion(region);
  //const title = getPageTitle(region);
  //const description = getPageDescription(region);

  useEffect(() => {
    setMapOption(defaultMapOption);
    // Close the map on mobile on any change to a region.
    setMobileMenuOpen(false);
  }, [defaultMapOption, region]);

  return (
    <div>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl={region.canonicalUrl}
        pageTitle={title}
        pageDescription={description}
      />
      <div>
        <SearchHeader
          setMapOption={setMapOption}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          region={region}
        />
        {/* Shows a loading screen if projections are not loaded yet, or
         * if a new location has been selected */}
        {!projections || projections.fips !== region.fipsCode ? (
          <LoadingScreen />
        ) : (
          <ChartsHolder
            projections={projections}
            chartId={chartId}
            region={region}
          />
        )}
        <MiniMap
          region={region}
          mobileMenuOpen={mobileMenuOpen}
          mapOption={mapOption}
          setMapOption={setMapOption}
        />
      </div>
    </div>
  );
}

function getDefaultMapOption(region: Region) {
  const stateCode = getStateCode(region);
  if (stateCode === MAP_FILTERS.DC) {
    return MAP_FILTERS.NATIONAL;
  }
  if (region instanceof MetroArea) {
    return MAP_FILTERS.MSA;
  }
  return MAP_FILTERS.STATE;
}

export default LocationPage;
