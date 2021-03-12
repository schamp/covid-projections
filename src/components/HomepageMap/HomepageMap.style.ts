import styled from 'styled-components';

export const ColumnCentered = styled.div<{ $topBottomSpacing?: boolean }>`
  display: flex;
  margin: ${({ $topBottomSpacing }) =>
    $topBottomSpacing ? '1rem auto' : 'auto'};
  width: fit-content;
  flex-direction: column;
`;
