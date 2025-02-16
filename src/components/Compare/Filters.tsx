import React, { Fragment, useEffect } from 'react';
import {
  MetroFilter,
  GeoScopeFilter,
  trackCompareEvent,
  HomepageLocationScope,
} from 'common/utils/compare';
import {
  Container,
  SliderContainer,
  GeoSlider,
} from 'components/Compare/Filters.style';
import { EventAction } from 'components/Analytics';
import HomepageSlider from './HomepageSlider';

// For location page: maps each numerical slider value to its corresponding GeoScopeFilter
export const sliderNumberToFilterMap: { [val: number]: GeoScopeFilter } = {
  0: GeoScopeFilter.NEARBY,
  50: GeoScopeFilter.STATE,
  99: GeoScopeFilter.COUNTRY,
};

// For homepage: maps each numerical slider value to its corresponding HomepageLocationScope
export const homepageSliderNumberToFilterMap: {
  [val: number]: HomepageLocationScope;
} = {
  0: HomepageLocationScope.COUNTY,
  50: HomepageLocationScope.MSA,
  99: HomepageLocationScope.STATE,
};

const Filters = (props: {
  isHomepage?: boolean;
  setCountyTypeToView: React.Dispatch<React.SetStateAction<MetroFilter>>;
  countyTypeToView: MetroFilter;
  stateId?: string;
  county?: any | null;
  geoScope?: GeoScopeFilter;
  setGeoScope?: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  isModal: boolean;
  sliderValue: GeoScopeFilter;
  setSliderValue: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;

  homepageScope: HomepageLocationScope;
  setHomepageScope: React.Dispatch<React.SetStateAction<HomepageLocationScope>>;
  homepageSliderValue: HomepageLocationScope;
  setHomepageSliderValue: React.Dispatch<
    React.SetStateAction<HomepageLocationScope>
  >;
}) => {
  const {
    sliderValue,
    setSliderValue,
    setCountyTypeToView,
    homepageScope,
    setHomepageScope,
    homepageSliderValue,
    setHomepageSliderValue,
  } = props;

  const disableMetroMenu = props.isHomepage
    ? homepageScope !== HomepageLocationScope.COUNTY
    : sliderValue === 0;

  useEffect(() => {
    if (disableMetroMenu) {
      setCountyTypeToView(MetroFilter.ALL);
    }
  }, [disableMetroMenu, setCountyTypeToView]);

  const GeoFilterLabels = {
    [GeoScopeFilter.NEARBY]: 'Nearby',
    [GeoScopeFilter.STATE]: `${props.stateId}`,
    [GeoScopeFilter.COUNTRY]: 'USA',
  };

  // Last value is set to 99 for styling
  // so that the final mark falls on the slider and not to the right of it
  const marks = [
    {
      value: 0,
      label: GeoFilterLabels[GeoScopeFilter.NEARBY],
    },
    {
      value: 50,
      label: GeoFilterLabels[GeoScopeFilter.STATE],
    },
    {
      value: 99,
      label: GeoFilterLabels[GeoScopeFilter.COUNTRY],
    },
  ];

  const sliderHandleChange = (event: any, value: any) => {
    if (props.setGeoScope) {
      setSliderValue(value);
      props.setGeoScope(sliderNumberToFilterMap[value]);
      trackCompareEvent(
        EventAction.SELECT,
        `GeoScope: ${GeoScopeFilter[sliderNumberToFilterMap[value]]}`,
      );
    }
  };

  const homepageSliderHandleChange = (
    event: React.ChangeEvent<{}>,
    value: any,
  ) => {
    if (setHomepageScope) {
      setHomepageSliderValue(value);
      setHomepageScope(homepageSliderNumberToFilterMap[value]);
      trackCompareEvent(
        EventAction.SELECT,
        `GeoScope: ${
          HomepageLocationScope[homepageSliderNumberToFilterMap[value]]
        }`,
      );
    }
  };

  return (
    <Fragment>
      <Container $isModal={props.isModal} $isHomepage={props.isHomepage}>
        {props.isHomepage && (
          <HomepageSlider
            homepageScope={homepageScope}
            onChange={homepageSliderHandleChange}
            homepageSliderValue={homepageSliderValue}
            $isModal={props.isModal}
          />
        )}
        {props.county && (
          <SliderContainer $isModal={props.isModal}>
            <GeoSlider
              onChange={sliderHandleChange}
              value={sliderValue}
              step={null}
              marks={marks}
              track={false}
              $isModal={props.isModal}
              geoScope={props.geoScope}
            />
          </SliderContainer>
        )}
      </Container>
    </Fragment>
  );
};

export default Filters;
