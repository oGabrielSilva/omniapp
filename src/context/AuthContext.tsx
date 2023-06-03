import { APIResponse } from '@Omniapp/models/APIResponse';
import { UserModel } from '@Omniapp/models/UserModel';
import { createContext, useCallback, useEffect, useState } from 'react';

interface AuthContextProps {
  children: JSX.Element;
  nickname: string;
}

interface AuthContextProviderValue {
  user: UserModel | null;
  files: Array<any>;
  getUser: () => Promise<UserModel | null>;
}

export const AuthContext = createContext<AuthContextProviderValue>({} as AuthContextProviderValue);

export default function AuthContextProvider({ children, nickname }: AuthContextProps) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [files, setFiles] = useState<Array<any>>([]);

  const fetchUser = useCallback(async () => {
    const response = await fetch('/api/user?nickname='.concat(nickname), { method: 'GET' });
    const body = (await response.json()) as APIResponse<UserModel>;
    if (!body.success) return null;
    return body.body;
  }, []);

  const fetchFiles = useCallback(async () => {
    const response = await fetch('/api/files', { method: 'GET' });
    const body = (await response.json()) as APIResponse<UserModel>;
    if (!body.success) return null;
    return body.body;
  }, []);

  const getUser = useCallback(async () => {
    if (user) return user;
    const u = await fetchUser();
    return u;
  }, [user, fetchUser]);

  useEffect(() => {
    if (!user) {
      const fn = async () => {
        const u = await fetchUser();
        if (u) setUser(u);
      };

      fn();
    }
  }, []);

  return <AuthContext.Provider value={{ user, files, getUser }}>{children}</AuthContext.Provider>;
}
