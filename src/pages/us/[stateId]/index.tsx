import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { LocationPage } from 'screens/LocationPage';
import { Projections } from 'common/models/Projections';
import {
  LocationPageWrapperProps,
  makeGetStaticProps,
} from 'screens/ssg_utils';
import regions, { State, StateObject } from 'common/regions';

const getStaticPaths: GetStaticPaths = async () => {
  const pathParams = regions.states.map(state => {
    return {
      params: {
        stateId: state.urlSegment,
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
    const stateId = (params?.stateId ?? '') as string;
    const region = stateId ? regions.findStateByUrlParams(stateId) : null;
    return region;
  },
});

function Location({
  regionObject,
  summaryWithTimeseries,
  title,
  description,
}: LocationPageWrapperProps) {
  const region = State.fromObject(regionObject as StateObject);
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
