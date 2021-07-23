import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  avatar: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type SignInOAuth = {
  code: string;
}

type ProviderName = 'github' | 'credentials';

type SignInData<P> =
  P extends 'credentials' ? SignInCredentials :
  P extends 'github' ? SignInOAuth :
  never;

interface AuthContextData {
  signIn: <P extends ProviderName>(provider: P, data: SignInData<P>) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, '@AuthTest:token');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    const { '@AuthTest:token': token } = parseCookies();

    if(token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      api.get('/profile/me').then(response => {
        const { email, name, avatar } = response.data;

        setUser({ name, email, avatar });
      }).catch(() => signOut());
    }
  }, []);

  async function signIn<P extends ProviderName>(provider: P, data: SignInData<P>) {
    try {
      let response: AxiosResponse;

      if(provider === 'credentials') {
        const { email, password } = data as SignInData<'credentials'>;
        response = await api.post('/sessions', { email, password });
      } else {
        const { code } = data as SignInData<'github'>;
        response = await api.post(`/oauth/github/${code}`);
      }
      
      const { token, user: { name, email, avatar } } = response.data;

      setCookie(undefined, '@AuthTest:token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setUser({
        name,
        email,
        avatar
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch(err) {
      toast.error(err.response.data.message);
      if(provider === 'github') Router.push('/');
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}