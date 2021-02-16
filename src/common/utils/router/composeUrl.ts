export const composeUrl = ({
  pathname,
  query,
  hash,
}: {
  pathname: string;
  query?: string;
  hash?: string;
}): string => {
  const hashString = hash ? '#' + hash : '';
  const queryString = query ? '?' + query : '';
  return pathname + queryString + hashString;
};
