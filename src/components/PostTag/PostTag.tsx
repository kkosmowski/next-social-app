import Link from 'next/link';

import type { DynamicRoute } from '@/app/utils/dynamicRoute';

type Props = {
  link: DynamicRoute;
  tagName: string;
};

function PostTag({ link, tagName }: Props) {
  return <Link href={link}>#{tagName}</Link>;
}

export default PostTag;
