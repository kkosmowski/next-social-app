const authEndpoints = {
  login: '/auth/signin',
  logout: '/auth/logout',
  me: '/auth/me',
} as const;

const postEndpoints = {
  posts: '/posts',
  post: '/posts/:postId',
  postLike: '/posts/:postId/like',
} as const;

const commentEndpoints = {
  comment: '/posts/:postId/comment',
  commentLike: '/comments/:commentId/like',
} as const;

const userEndpoints = {
  user: '/users/:username',
} as const;

const endpoints = {
  ...authEndpoints,
  ...postEndpoints,
  ...commentEndpoints,
  ...userEndpoints,
};

export type Endpoint = (typeof endpoints)[keyof typeof endpoints];

export default endpoints;
