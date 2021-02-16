import React from 'react';

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import {
  LocationEmbedWrapperProps,
  makeGetStaticProps,
} from 'screens/ssg_utils';

import { Projections } from 'common/models/Projections';

import regions, { State, StateObject } from 'common/regions';
import { LocationEmbed } from 'screens/Embed/Embed';

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

function EmbedPage({
  regionObject,
  summaryWithTimeseries,
}: LocationEmbedWrapperProps) {
  const region = State.fromObject(regionObject as StateObject);
  const projections = new Projections(summaryWithTimeseries, region);

  return <LocationEmbed region={region} projections={projections} />;
}

export { getStaticPaths, getStaticProps };
export default EmbedPage;
