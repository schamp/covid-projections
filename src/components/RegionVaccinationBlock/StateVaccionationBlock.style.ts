import LinkButton from './LinkButton';
import styled from 'styled-components';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const StateLinkButton = styled(LinkButton)`
  display: flex;
  flex-grow: 1;
  width: 100%;
  font-size: 16px;

  padding: 16px 16px;
  @media @media (min-width: ${mobileBreakpoint}) {
    padding: 24px 16px;
  }

  .MuiButton-endIcon {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }
`;
