import { useEffect } from 'react';
import { ensureSharingIdInQueryParams } from 'common/urls';
import { composeUrl, useLocation } from 'common/utils/router';
import * as QueryString from 'query-string';
import { useRouter } from 'next/router';
/**
 * Component that adds a short unique string to the URL, corresponding to the
 * currently published sharing preview images. This is important to make sure
 * that the URL is unique enough so that if somebody shares it, then
 * Facebook/Twitter/whoever will re-fetch it and get the latest sharing image.
 */
const EnsureSharingIdInUrl: React.FunctionComponent<{}> = () => {
  const location = useLocation();
  const params = Object.fromEntries(location.search.entries());

  if (typeof window !== 'undefined') {
    // `ensure...` returns true if it updated the params.
    if (ensureSharingIdInQueryParams(params)) {
      const newUrl = composeUrl({
        pathname: location.pathname,
        query: QueryString.stringify(params),
        hash: location.hash,
      });
      window.history.replaceState({}, '', newUrl);
    }
  }

  return null;
};

export default EnsureSharingIdInUrl;
