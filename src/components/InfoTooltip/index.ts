import { allTooltipContent, InfoTooltip } from 'cms-content/infoTooltips';
import { Metric } from 'common/metric';
import { assert } from 'common/utils';

function findContentById(id: string): InfoTooltip {
  const tooltipContent = allTooltipContent.find(
    (item: InfoTooltip) => item.id === id,
  );
  assert(
    tooltipContent,
    `Tooltip content unexpectedly not found for id: ${id}`,
  );
  return tooltipContent;
}

type MetricToTooltipContent = {
  [key in Metric]: InfoTooltip;
};

export const metricToTooltipContentMap: MetricToTooltipContent = {
  [Metric.CASE_DENSITY]: findContentById('daily-new-cases'),
  [Metric.CASE_GROWTH_RATE]: findContentById('infection-rate'),
  [Metric.POSITIVE_TESTS]: findContentById('positive-test-rate'),
  [Metric.VACCINATIONS]: findContentById('percent-vaccinated'),
  [Metric.HOSPITAL_USAGE]: findContentById('icu-capacity-used'),
};
