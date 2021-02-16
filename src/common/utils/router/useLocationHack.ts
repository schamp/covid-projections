// hack to easily replace useLocation which isn't available with next.js
import { useRouter } from 'next/router';
import { decomposeUrl } from './decomposeUrl';

export default function useLocation() {
  const router = useRouter();
  const { pathname, hash, search } = decomposeUrl(router.asPath);

  return {
    pathname: pathname,
    search,
    hash: hash ?? '',
    query: router.query,
  };
}
