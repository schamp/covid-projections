import React, { Fragment } from 'react';
import { last, isNull } from 'lodash';
import moment from 'moment';
import { useAggregations } from 'common/hooks';
import {
  formatPercent,
  formatDecimal,
  getPercentChange,
  formatEstimate,
} from 'common/utils';

const getTwoWeekPercentChange = (series: any[]): number | null => {
  const lastTwoWeeks = series.slice(-15);
  const firstVal = lastTwoWeeks[0];
  const lastVal = last(lastTwoWeeks);
  if (!firstVal || !lastVal) {
    return null;
  }
  return getPercentChange(firstVal, lastVal);
};

const getTotalCasesCopy = (summedRawCases: number): string => {
  const ONE_MILLION = 1000000;
  const divided = summedRawCases / ONE_MILLION;
  return `${formatDecimal(divided, 1)} million`;
};

export function NationalTextContent(): React.ReactElement {
  const { result: aggregations, pending } = useAggregations();
  if (pending || !aggregations) {
    return <>Loading...</>;
  }
  const usaAggregation = aggregations['00001'];
  const {
    totalCases,
    totalDeaths,
    smoothedDailyCases,
    smoothedDailyDeaths,
    dates,
  } = usaAggregation;

  const percentChangeSmoothedCases = getTwoWeekPercentChange(
    smoothedDailyCases,
  );
  const percentChangeSmoothedDeaths = getTwoWeekPercentChange(
    smoothedDailyDeaths,
  );

  const lastDate = last(dates);
  const lastDateFormatted: string = moment
    .utc(lastDate)
    .format('MMMM Do, YYYY');

  const getChangeDescriptorCopy = (percentChange: number): string => {
    const changeByCopy = `by about ${formatPercent(Math.abs(percentChange))}`;
    if (percentChange > 0.01) {
      return `increased ${changeByCopy}`;
    } else if (percentChange < 0) {
      return `decreased ${changeByCopy}`;
    } else return 'remained about the same';
  };

  return (
    <Fragment>
      As of {lastDateFormatted}, there have been roughly{' '}
      {getTotalCasesCopy(totalCases)} cases and{' '}
      {formatEstimate(totalDeaths, 3).toLocaleString()} deaths from COVID in the
      United States.{' '}
      {!isNull(percentChangeSmoothedCases) &&
      !isNull(percentChangeSmoothedDeaths)
        ? `Over the last 14 days, daily new
    cases have ${getChangeDescriptorCopy(
      percentChangeSmoothedCases,
    )} and daily new
    deaths have ${getChangeDescriptorCopy(percentChangeSmoothedDeaths)}.`
        : ''}
    </Fragment>
  );
}
