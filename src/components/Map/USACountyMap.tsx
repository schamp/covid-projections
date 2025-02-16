import React from 'react';
import { Link } from 'common/utils/router';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import { colorFromLocationSummary } from 'common/colors';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';
import regions, { State as StateType } from 'common/regions';
import { USMapWrapper, USStateMapWrapper } from './Map.style';
import COUNTIES_JSON from './data/counties-10m.json';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

function trackMapClick(label: string) {
  trackEvent(EventCategory.MAP, EventAction.NAVIGATE, label);
}

const stateFipsCodes = regions.states.map(state => state.fipsCode);

/**
 * The COUNTIES_JSON file contains geographies for counties, states and the
 * nation. The following variables simplify the object to contain either
 * state or county, not both (this might make parsing of the geographies faster
 * and reduce our bundle size a bit).
 */
const geoCounties = {
  ...COUNTIES_JSON,
  objects: { counties: COUNTIES_JSON.objects.counties },
};

const geoStates = {
  ...COUNTIES_JSON,
  objects: { states: COUNTIES_JSON.objects.states },
};

/**
 * SVG element to represent the Northern Mariana Islands on the USA Country Map as a
 * box (with risk level color) + text.
 *
 * This is special cased from the normal map display. The mariana islands are
 * small enough that simply showing the islands is not a UX that works.
 */
const MarianaIslands = ({
  fill,
  onMouseEnter,
  onMouseLeave,
  onClick,
  tabIndex,
}: {
  fill: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  tabIndex: number;
}) => {
  return (
    <g
      transform="translate(40, 395) scale(0.8)"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <rect width="20" height="20" fill={fill} />
      <text transform="translate(25, 15)">CNMI</text>
    </g>
  );
};

interface USACountyMapProps {
  stateClickHandler: (stateName: string) => void;
  setTooltipContent: (content: string) => void;
  showCounties: boolean;
}

const USACountyMap = React.memo(
  ({
    stateClickHandler,
    setTooltipContent,
    showCounties,
  }: USACountyMapProps) => {
    const locationSummaries = useSummaries();

    const getFillColor = (geo: any) => {
      const summary = (locationSummaries && locationSummaries[geo.id]) || null;
      return colorFromLocationSummary(summary);
    };

    const projection = geoAlbersUsaTerritories()
      .scale(1070)
      .translate([400, 300]);

    const onMouseLeave = () => setTooltipContent('');

    return (
      <USMapWrapper>
        {/** Map with shaded background colors for states. */}
        <USStateMapWrapper $showCounties={showCounties}>
          <ComposableMap data-tip="" projection={projection} height={500}>
            <g transform="translate(0, -50)">
              {showCounties && (
                <Geographies geography={geoCounties}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getFillColor(geo)}
                          strokeWidth={0}
                          role="img"
                        />
                      );
                    })
                  }
                </Geographies>
              )}
              <Geographies geography={geoStates}>
                {({ geographies }) =>
                  geographies
                    .filter(geo => stateFipsCodes.includes(geo.id))
                    .map(geo => {
                      const fipsCode = geo.id;
                      // we can coerce this to a state safely because we're only
                      // dealing with FIPS codes that are from states, because of that filter.
                      const state = regions.findByFipsCodeStrict(
                        fipsCode,
                      ) as StateType;

                      // This flag is used to increase an invisible border around Hawaii and Puerto Rico
                      // to increase their effective target size
                      const expandTapArea =
                        state.stateCode === 'HI' || state.stateCode === 'PR';

                      // Using a custom SVG to place the northern mariana islands to increase
                      // accessibility due to the small size.
                      if (state.stateCode === 'MP') {
                        return (
                          <Link
                            key={state.stateCode}
                            to={state.relativeUrl}
                            aria-label={state.fullName}
                            onClick={() => trackMapClick(state.fullName)}
                            tabIndex={-1}
                          >
                            <MarianaIslands
                              key={geo.rsmKey}
                              onMouseEnter={() =>
                                setTooltipContent(state.fullName)
                              }
                              onMouseLeave={onMouseLeave}
                              onClick={() => stateClickHandler(state.fullName)}
                              fill={getFillColor(geo)}
                              tabIndex={-1}
                            />
                          </Link>
                        );
                      } else {
                        return (
                          <Link
                            key={state.stateCode}
                            to={state.relativeUrl}
                            aria-label={state.fullName}
                            onClick={() => trackMapClick(state.fullName)}
                            tabIndex={-1}
                          >
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onMouseEnter={() =>
                                setTooltipContent(state.fullName)
                              }
                              onMouseLeave={onMouseLeave}
                              onClick={() => stateClickHandler(state.fullName)}
                              fill={getFillColor(geo)}
                              fillOpacity={showCounties ? 0 : 1}
                              stroke="white"
                              strokeWidth={expandTapArea ? 35 : 1}
                              strokeOpacity={expandTapArea ? 0 : 1}
                              role="img"
                              tabIndex={-1}
                            />
                          </Link>
                        );
                      }
                    })
                }
              </Geographies>
            </g>
          </ComposableMap>
        </USStateMapWrapper>
        {locationSummaries && <ScreenshotReady />}
      </USMapWrapper>
    );
  },
);

export default USACountyMap;
