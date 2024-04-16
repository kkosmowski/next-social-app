import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { Post } from '@/types/post';
import mapPostRecordToPost from '@/utils/dataMappers/mapPostRecordToPost';
import session from '@/app/api/[utils]/SessionClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { pb } = await session.refreshData(cookies().toString());

  const posts = await pb.posts.getFullList({
    sort: '-created',
    expand: 'comments,likes,post_likes_via_post,user',
  });

  const mappedPosts: Post[] = posts.map(mapPostRecordToPost);
  return NextResponse.json(mappedPosts);
}
