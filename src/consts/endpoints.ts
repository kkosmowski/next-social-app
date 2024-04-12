const authEndpoints = {
  login: '/auth/signin',
  logout: '/auth/logout',
  me: '/auth/me',
} as const;

const postEndpoints = {
  posts: '/posts',
} as const;

const endpoints = {
  ...authEndpoints,
  ...postEndpoints,
};

export type Endpoint = (typeof endpoints)[keyof typeof endpoints];

export default endpoints;
