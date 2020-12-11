import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import MiniMap from 'components/MiniMap';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ChartsHolder from 'components/LocationPage/ChartsHolder';
import { LoadingScreen } from './LocationPage.style';
import { useProjectionsFromRegion } from 'common/utils/model';
import { getPageTitle, getPageDescription } from './utils';
import { getStateCode, Region, RegionType } from 'common/regions';
import { assert } from 'common/utils';

interface LocationPageProps {
  region: Region;
}

function LocationPage({ region }: LocationPageProps) {
  let { chartId } = useParams<{ chartId: string }>();

  const stateCode = getStateCode(region);
  const getDefaultMapOption = (region: Region) => {
    if (stateCode === MAP_FILTERS.DC) {
      return MAP_FILTERS.NATIONAL;
    }
    switch (region.regionType) {
      case RegionType.COUNTY:
        return MAP_FILTERS.STATE;
      case RegionType.STATE:
        return MAP_FILTERS.STATE;
      case RegionType.MSA:
        return MAP_FILTERS.MSA;
      default:
        return MAP_FILTERS.NATIONAL;
    }
  };
  const [mapOption, setMapOption] = useState(getDefaultMapOption(region));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const projections = useProjectionsFromRegion(region);

  // Projections haven't loaded yet
  // If a new county has just been selected, we may not have projections
  // for the new county loaded yet
  if (!projections || projections.fips !== region.fipsCode) {
    return <LoadingScreen></LoadingScreen>;
  }

  const pageTitle = getPageTitle(region);
  const pageDescription = getPageDescription(region, projections);
  const canonicalUrl = region.canonicalUrl;

  return (
    <div>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl={canonicalUrl}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
      <div>
        <SearchHeader
          setMapOption={setMapOption}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <ChartsHolder
          projections={projections}
          chartId={chartId}
          region={region}
        />
        <MiniMap
          region={region}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          mapOption={mapOption}
          setMapOption={setMapOption}
        />
      </div>
    </div>
  );
}

export default LocationPage;
