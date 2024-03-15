import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User } from '@models';
import { getToken } from '../util';
import { httpClient } from '../http-client';

const loadToken = (token: string) => {
  // TODO: 쿠키에 저장하도록 수정
  localStorage.setItem('token', token);
};

const selfRepository = {
  async getSelf() {
    return httpClient.get<User>('/users/self');
  },
};

const AuthContext = createContext<{ getUser(): User | undefined; setUser(user?: User): void }>({
  getUser() {
    return undefined;
  },
  setUser() {},
});

function AuthProvider(props: { children?: ReactNode }) {
  // prop destruction
  const { children } = props;

  // lib hooks
  // state, ref, querystring hooks
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState(false);

  // form hooks
  // query hooks
  // calculated values
  const contextValue = useMemo(() => {
    return {
      getUser() {
        return user;
      },
      setUser,
    };
  }, [user]);

  // effects
  useEffect(() => {
    if (initialized) {
      return;
    }

    const token = getToken();

    if (!token) {
      setInitialized(true);
      return;
    }

    loadToken(token);

    selfRepository
      .getSelf()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        /**
         * TODO: token은 있는데 getSelf에 실패했을 때 ex) 만료된 토큰. 서버에 장애가 있음. 등등
         */
        console.error(err);
      })
      .finally(() => {
        setInitialized(true);
      });
  }, [initialized]);

  // handlers

  if (!initialized) {
    return null;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useUser = <T extends boolean = false>(options?: {
  canBeUnauthenticated: T;
}): T extends false ? [User, (user: User) => void] : [User | undefined, (user: User) => void] => {
  const { getUser, setUser } = useContext(AuthContext);
  const user = getUser();
  const canBeUnauthenticated = options?.canBeUnauthenticated ?? false;

  if (!user && !canBeUnauthenticated) {
    throw new Error('Not authenticated');
  }

  return [user!, setUser];
};

export const useOauth = (): [
  /**
   * @returns {boolean} true: 이미 가입되어있는 유저 / false: 가입해야하는 유저
   */
  (
    code: string,
    provider: OauthProvider
  ) => Promise<{ email: string; nickname: string; profileImage: string } | undefined>
] => {
  const { setUser } = useContext(AuthContext);

  const handleOauth = useCallback(
    async (code: string, provider: OauthProvider) => {
      const result = await httpClient.post<
        { accessToken: string } | { email: string; nickname: string; profileImage: string }
      >(`/auth/oauth/${provider}`, { code });

      if ('accessToken' in result) {
        loadToken(result.accessToken);
        setUser(await selfRepository.getSelf());
        return;
      } else {
        return result;
      }
    },
    [setUser]
  );

  return [handleOauth];
};

export { AuthProvider };
