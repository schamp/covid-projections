/**
 * common stuff to make the many places we render locationPage based on route
 * simpler
 */
import React from 'react';
import { Api } from 'api';
import { RegionSummaryWithTimeseries } from 'api/schema/RegionSummaryWithTimeseries';
import { getPageTitle, getPageDescription } from 'screens/LocationPage/utils';
import type { Region, RegionObject } from 'common/regions';

export const makeGetStaticProps = ({
  paramsToRegion,
}: {
  paramsToRegion: (params: any) => Region | null;
}) => {
  const getStaticProps = async ({ params }: any): Promise<any> => {
    const region = paramsToRegion(params);
    if (!region) {
      return {
        notFound: true,
      };
    }

    // Projections isn't JSON serializable but this is, so let's use it instead
    const summaryWithTimeseries = await new Api().fetchSummaryWithTimeseries(
      region,
    );
    const regionObject = region.toObject();
    const title = getPageTitle(region);
    const description = getPageDescription(region);

    const props = {
      regionObject,
      summaryWithTimeseries,
      title,
      description,
    };

    if (!(summaryWithTimeseries && title && description)) {
      console.error('Missing data:', props);
      return {
        notFound: true,
      };
    }
    return {
      props,
    };
  };
  return getStaticProps;
};

export interface LocationEmbedWrapperProps {
  regionObject: RegionObject;
  summaryWithTimeseries: RegionSummaryWithTimeseries;
}

export interface LocationPageWrapperProps {
  regionObject: RegionObject;
  summaryWithTimeseries: RegionSummaryWithTimeseries;
  title: string;
  description: string;
}
