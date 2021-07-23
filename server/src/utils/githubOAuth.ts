import axios from 'axios';

interface GithubUser {
  name: string;
  email: string;
  avatar_url: string;
}

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

async function getUserAccessToken(code: string): Promise<string> {
  const response = await axios.post('https://github.com/login/oauth/access_token', {
    code,
    client_id,
    client_secret
  });

  const params = new URLSearchParams(response.data);
  const token = params.get('access_token');

  return token;
}

async function getUserDetails(access_token: string): Promise<GithubUser> {
  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return data;
}

export { getUserAccessToken, getUserDetails };
