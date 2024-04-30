type ExpandOption = 'user' | 'likes' | 'comments' | 'subComments';
type ExcludableOptions = 'comments' | 'subComments';

function getPostsExpand(exclude?: [ExcludableOptions]): string {
  const options: ExpandOption[] = ['user', 'likes'];

  if (!exclude?.includes('comments')) {
    options.push('comments');

    if (!exclude?.includes('subComments')) {
      options.push('subComments');
    }
  }

  const _commentsBase = 'comments_via_post';
  const comments = `${_commentsBase}.user`;
  const commentLikes = `${_commentsBase}.comment_likes_via_comment`;

  const _subCommentsBase = `${_commentsBase}.subcomments_via_comment`;
  const subComments = `${_subCommentsBase}.user`;
  const subCommentLikes = `${_subCommentsBase}.subcomment_likes_via_comment`;

  const expand: Record<ExpandOption, string> = {
    user: 'user',
    likes: 'post_likes_via_post',
    comments: [comments, commentLikes].join(','),
    subComments: [subComments, subCommentLikes].join(','),
  };

  return options.map((option) => expand[option]).join(',');
}

export default getPostsExpand;
