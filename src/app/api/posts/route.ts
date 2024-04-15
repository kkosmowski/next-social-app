import { NextResponse } from 'next/server';

import pb from '@/app/api/pocketbase';
import type { Post } from '@/types/post';
import mapPostRecordToPost from '@/utils/dataMappers/mapPostRecordToPost';

export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await pb.posts.getFullList({
    sort: '-created',
    expand: 'comments,likes,post_likes_via_post,user',
  });

  const mappedPosts: Post[] = posts.map(mapPostRecordToPost);
  return NextResponse.json(mappedPosts);
}
