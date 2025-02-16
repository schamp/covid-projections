import styled, { css } from 'styled-components';
import { Link } from 'common/utils/router';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';
import { HeaderWrapperStyles } from 'components/LocationPage/ChartsHolder.style';

export const BorderedContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-radius: 4px;
  max-width: 900px;
  width: 100%;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 1.5rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    flex-direction: row;
  }
`;

const ColumnStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${mobileBreakpoint}) {
    align-items: unset;
  }
`;

export const FirstColumn = styled.div`
  ${ColumnStyles};
  padding: 1.5rem 2.5rem 0.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0;
  }

  @media (min-width: ${mobileBreakpoint}) {
    margin-right: 1rem;
  }
`;

export const SecondColumn = styled.div`
  ${ColumnStyles};
`;

export const TextSmall = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  text-align: center;

  @media (min-width: ${mobileBreakpoint}) {
    text-align: left;
  }
`;

export const RegionDescription = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 1rem;
  margin: 1rem 0 1.25rem;
  text-align: center;

  strong {
    color: black;
  }

  @media (min-width: ${mobileBreakpoint}) {
    margin: 1rem 0 0;
    text-align: left;
    max-width: 385px;
  }
`;

export const StyledLink = styled(Link)`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
  display: block;
  margin: 0.5rem 0 1.25rem;
  text-align: left;
`;

export const LevelName = styled.span`
  font-weight: bold;
  font-size: 1.125rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: ${mobileBreakpoint}) {
    margin-bottom: 0.5rem;
    text-align: left;
  }
`;

export const HeaderWrapper = styled.div`
  ${HeaderWrapperStyles};

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;
