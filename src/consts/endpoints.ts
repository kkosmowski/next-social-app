const authEndpoints = {
  login: '/auth/signin',
  me: '/auth/me',
} as const;

const endpoints = {
  ...authEndpoints,
};

export type Endpoint = (typeof endpoints)[keyof typeof endpoints];

export default endpoints;
