import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserModel } from "@models";
import { httpClient } from "../http-client";

const selfRepository = {
  async getSelf() {
    return httpClient.get<UserModel>("/users/self");
  },
};

const AuthContext = createContext<{
  getUser(): UserModel | undefined;
  setUser(user?: UserModel): void;
}>({
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
  const [user, setUser] = useState<UserModel>();
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

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useUser = <T extends boolean = false>(options?: {
  canBeUnauthenticated: T;
}): T extends false
  ? [UserModel, (user: UserModel) => void]
  : [UserModel | undefined, (user: UserModel) => void] => {
  const { getUser, setUser } = useContext(AuthContext);
  const user = getUser();
  const canBeUnauthenticated = options?.canBeUnauthenticated ?? false;

  if (!user && !canBeUnauthenticated) {
    throw new Error("Not authenticated");
  }

  return [user!, setUser];
};

export { AuthProvider };
