import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

interface HomeNavigationProps {
  children: JSX.Element;
}

export type ScreenName = 'feed' | 'search' | 'files' | 'create';

interface HomeNavigationContextValues {
  screen: ScreenName;
  setScreen: Dispatch<SetStateAction<ScreenName>>;
}

const screens: Array<ScreenName> = ['feed', 'files', 'search', 'create'];

export const HomeNavigationContext = createContext<HomeNavigationContextValues>(
  {} as HomeNavigationContextValues
);

export default function HomeNavigationContextProvider({ children }: HomeNavigationProps) {
  const [screen, setScreen] = useState<ScreenName>('feed');

  useEffect(() => {
    const func = () => {
      const hash = window.location.hash.slice(1) as ScreenName;
      if (screens.includes(hash)) setScreen(hash);
      else setScreen('feed');
    };
    func();
    window.addEventListener('popstate', func);
    return () => {
      window.removeEventListener('popstate', func);
    };
  }, []);

  return (
    <HomeNavigationContext.Provider value={{ screen, setScreen }}>
      {children}
    </HomeNavigationContext.Provider>
  );
}
