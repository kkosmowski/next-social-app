import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { AddPostPayload, Post } from '@/types/post';
import mapPostRecordToPost from '@/utils/dataMappers/mapPostRecordToPost';
import session from '@/app/api/[utils]/SessionClient';
import { ERROR_NOT_LOGGED_IN } from '@/consts/auth';
import { HttpStatus } from '@/consts/api';

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

export async function POST(request: NextRequest) {
  const { pb, isLoggedIn, user } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: 'User is not logged in.', code: ERROR_NOT_LOGGED_IN },
      { status: HttpStatus.Unauthorized },
    );
  }

  const { title, content, tags }: AddPostPayload = await request.json();

  const data = {
    title,
    content,
    user: user.id,
    tags: tags.length ? tags.join(',') : undefined,
  };

  const record = await pb.posts.create(data, { expand: 'user' });
  const post = mapPostRecordToPost(record);

  return new NextResponse(JSON.stringify(post), {
    status: HttpStatus.Created,
    headers: { 'Content-Type': 'application/json' },
  });
}
