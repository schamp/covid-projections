import React, { FunctionComponent } from 'react';
import Map from 'components/Map/Map';
import { MAP_FILTERS } from 'screens/LocationPage/Enums/MapFilterEnums';
import * as Styles from './MiniMap.style';
import { Region, State, County, MetroArea } from 'common/regions';
import RegionMap from 'components/RegionMap';

interface MiniMapProperties {
  region: Region;
  mobileMenuOpen: boolean;
  mapOption: string;
  setMapOption: (input: string) => void;
}

/**
 * TODO(sgoldblatt): Don't pass in the setState vars here and use a provider
 * to set the selected MobileMenu and map options as well
 */
const MiniMap: FunctionComponent<MiniMapProperties> = ({
  region,
  mobileMenuOpen,
  mapOption,
  setMapOption,
}) => {
  // Exception for District of Columbia
  const showState = !region.fipsCode.startsWith('11');

  return (
    <Styles.Container mobileMenuOpen={mobileMenuOpen}>
      <Styles.Tabs>
        {showState && !(region instanceof MetroArea) && (
          <Styles.TabItem
            selected={mapOption === MAP_FILTERS.STATE}
            onClick={() => setMapOption(MAP_FILTERS.STATE)}
          >
            {regionTabName(region)}
          </Styles.TabItem>
        )}
        {region instanceof MetroArea && (
          <Styles.TabItem
            selected={mapOption === MAP_FILTERS.MSA}
            onClick={() => setMapOption(MAP_FILTERS.MSA)}
          >
            {regionTabName(region)}
          </Styles.TabItem>
        )}
        <Styles.TabItem
          selected={mapOption === MAP_FILTERS.NATIONAL}
          onClick={() => setMapOption(MAP_FILTERS.NATIONAL)}
        >
          USA
        </Styles.TabItem>
      </Styles.Tabs>
      <Styles.MapContainer>
        {/* US Map */}
        {mapOption === MAP_FILTERS.NATIONAL && <Map hideLegend={true} />}
        {/* State Map */}
        {mapOption === MAP_FILTERS.STATE && (
          <Styles.StateMapContainer>
            <RegionMap region={region} />
          </Styles.StateMapContainer>
        )}
        {mapOption === MAP_FILTERS.MSA && (
          <Styles.StateMapContainer>
            <RegionMap region={region} />
          </Styles.StateMapContainer>
        )}
      </Styles.MapContainer>
    </Styles.Container>
  );
};

function regionTabName(region: Region) {
  if (region instanceof State) {
    return region.shortName;
  } else if (region instanceof County) {
    return region.state.shortName;
  } else if (region instanceof MetroArea) {
    return region.stateCodes;
  }
}

export default MiniMap;
