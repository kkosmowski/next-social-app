'use client';

import type { Post } from '@/types/post';
import useIntl from '@/app/hooks/useIntl';

import PostItemSimplified from './PostItemSimplified';

type Props = Post & {
  small?: boolean;
};

function PostItemController(props: Props) {
  const { locale } = useIntl();

  return <PostItemSimplified locale={locale} {...props} />;
}

export default PostItemController;
