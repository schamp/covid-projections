import React from 'react';

//import '../../App.css'; /* optional for styling like the :hover pseudo-class */

import { Projections } from 'common/models/Projections';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { COLOR_MAP } from 'common/colors';
import LogoUrlLight from 'assets/images/logoUrlLight';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import {
  HeaderText,
  AlarmLevel,
} from 'components/SocialLocationPreview/SocialLocationPreview.style';
import {
  EmbedContainer,
  EmbedWrapper,
  EmbedFooterWrapper,
  EmbedBody,
  EmbedHeaderWrapper,
  FooterDate,
  LogoWrapper,
  EmbedHeader,
  EmbedSubheader,
} from './Embed.style';
import { Region } from 'common/regions';

export interface LocationEmbedProps {
  region: Region;
  projections: Projections;
}

export function LocationEmbed({ region, projections }: LocationEmbedProps) {
  if (!projections || !region) {
    return null;
  }

  const stats = projections.getMetricValues();
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  const embedOnClickBaseURL = region.canonicalUrl;

  return (
    <EmbedContainer>
      <EmbedWrapper>
        <EmbedHeaderWrapper>
          <HeaderText>
            <EmbedHeader>{region.fullName}</EmbedHeader>
            <EmbedSubheader>Overall COVID risk</EmbedSubheader>
          </HeaderText>
          <AlarmLevel color={fillColor}>{levelInfo.name}</AlarmLevel>
        </EmbedHeaderWrapper>
        <EmbedBody>
          <SummaryStats
            stats={stats}
            condensed={true}
            isEmbed={true}
            embedOnClickBaseURL={embedOnClickBaseURL}
          />
        </EmbedBody>
        <EmbedFooter />
      </EmbedWrapper>
    </EmbedContainer>
  );
}

export function EmbedFooter() {
  const lastUpdatedDate = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate && lastUpdatedDate.toLocaleDateString();

  return (
    <EmbedFooterWrapper>
      <LogoWrapper
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.covidactnow.org"
      >
        <LogoUrlLight height={15} />
      </LogoWrapper>
      <FooterDate>Last Updated {lastUpdatedDateString}</FooterDate>
    </EmbedFooterWrapper>
  );
}
