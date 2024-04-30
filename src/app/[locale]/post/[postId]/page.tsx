import type { ServerComponentProps } from '@/types/common';
import api from '@/api';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import endpoints from '@/consts/endpoints';
import PostItemController from '@/components/PostItem';
import type { GetPostResponse } from '@/types/post';

type Props = ServerComponentProps<{}, { postId: string }>;

async function getPost(postId: string) {
  return api.get<GetPostResponse>(dynamicEndpoint(endpoints.post, { postId }));
}

async function PostPage({ params }: Props) {
  const post = await getPost(params.postId);

  return (
    <section className="page-section">
      <PostItemController {...post} />
    </section>
  );
}

export default PostPage;
