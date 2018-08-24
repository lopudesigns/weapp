import weauthjs from 'weauthjs';

const authAPI = weauthjs.Initialize({
  app: process.env.AUTH_API_CLIENT_ID,
  baseURL: process.env.AUTH_API_HOST,
  callbackURL: process.env.AUTH_API_REDIRECT_URL,
});

export default authAPI;
