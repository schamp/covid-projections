import React, { Fragment, useState } from 'react';
import Map from 'components/Map/Map';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import HorizontalThermometer from 'components/HorizontalThermometer';
import Toggle from 'components/Toggle/Toggle';
import { ColumnCentered } from './HomepageMap.style';

const HomepageMap: React.FC = () => {
  const [showCounties, setShowCounties] = useState(false);

  const onClickSwitch = (newShowCounties: boolean) => {
    setShowCounties(newShowCounties);
    trackEvent(
      EventCategory.MAP,
      EventAction.SELECT,
      `Select: ${newShowCounties ? 'Counties' : 'States'}`,
    );
  };
  return (
    <Fragment>
      <ColumnCentered>
        <Toggle showCounties={showCounties} onClickSwitch={onClickSwitch} />
      </ColumnCentered>
      <Map hideLegend hideInstructions showCounties={showCounties} />
      <ColumnCentered $topBottomSpacing>
        <HorizontalThermometer />
      </ColumnCentered>
    </Fragment>
  );
};

export default HomepageMap;
