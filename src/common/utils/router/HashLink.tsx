import React from 'react';
import { useRouter } from 'next/router';
import Link from './Link';

export interface HashLinkProps extends React.ComponentProps<typeof Link> {
  // function signature to match legacy one, but we don't really use 'match' here
  // not sure if we need it more work necessary to figure this out
  scroll?: (el: HTMLElement) => void;
  smooth?: boolean;
}

const HashLink = (props: HashLinkProps) => {
  // FIXME: Eat the scroll param for now.  Next/link allows scrolling to IDs but doesn't
  // allow a custom scroll function (which we use to provide a scroll offset parameter,
  // it looks like, to not have the scrolled thing hidden by the banner)
  // FIXME: Find a way to fix the scroll offset.
  const { scroll, children, ...linkOwnProps } = props;

  return <Link {...linkOwnProps}>{children}</Link>;
};

export default HashLink;
