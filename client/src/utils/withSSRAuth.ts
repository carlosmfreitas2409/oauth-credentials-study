import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";

import { AuthTokenError } from "../services/errors/AuthTokenError";

type IWithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: IWithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['@AuthTest:token'];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@AuthTest:token');
    
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  
  }
}