import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { LocationPage } from 'screens/LocationPage';
import { Projections } from 'common/models/Projections';
import {
  LocationPageWrapperProps,
  makeGetStaticProps,
} from 'screens/ssg_utils';
import regions, { MetroArea, MetroAreaObject } from 'common/regions';

const getStaticPaths: GetStaticPaths = async () => {
  const pathParams = regions.metroAreas.map(metro => {
    return {
      params: {
        metroAreaUrlSegment: metro.urlSegment,
      },
    };
  });
  return {
    paths: pathParams,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps = makeGetStaticProps({
  paramsToRegion: params => {
    const metroAreaUrlSegment = (params?.metroAreaUrlSegment ?? '') as string;
    return metroAreaUrlSegment
      ? regions.findMetroAreaByUrlParams(metroAreaUrlSegment)
      : null;
  },
});

function Location(props: LocationPageWrapperProps) {
  const { regionObject, summaryWithTimeseries, title, description } = props;

  const region = MetroArea.fromObject(regionObject as MetroAreaObject);
  const projections = new Projections(summaryWithTimeseries, region);

  return (
    <LocationPage
      region={region}
      projections={projections}
      title={title}
      description={description}
    />
  );
}

export { getStaticPaths, getStaticProps };
export default Location;
