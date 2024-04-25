import type { Post, PostDbModel } from '@/types/post';

function mapPostToPostRecord(post: Partial<Post>): Partial<PostDbModel> {
  return {
    title: post.title,
    content: post.content,
    tags: post.tags?.length ? post.tags.join(',') : undefined,
    ...(post.user && { user: post.user.id }),
  };
}

export default mapPostToPostRecord;
