export const decomposeUrl = (url: string) => {
  const [queryLocation, hash] = url.split('#');
  const [pathname, queryString] = queryLocation.split('?');
  const search = new URLSearchParams(queryString ?? '');

  return {
    pathname: pathname,
    search: search,
    hash: hash ?? '',
  };
};
