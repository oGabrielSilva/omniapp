import { LANGUAGE_COOKIE_NAME } from '@Omniapp/resources/constants';
import { strings as strs } from '@Omniapp/resources/strings';
import Cookies from 'js-cookie';
import { createContext, useCallback, useState } from 'react';

interface GlobalContextInterface {
  strings: typeof strs.br;
  changePageLang: (lang: string) => void;
}

export const GlobalContext = createContext<GlobalContextInterface>({} as GlobalContextInterface);

export default function GlobalContextProvider({
  children,
  lang,
}: {
  lang: string;
  children: JSX.Element;
}) {
  const [strings, setStrings] = useState((strs as any)[lang]);

  const changePageLang = useCallback(
    (lang: string) => {
      const obj =
        Object.keys((strs as any)[lang]).length < Object.keys(strings).length
          ? strings
          : (strs as any)[lang];
      setStrings(obj || strings);
      const cookie = Cookies.set(LANGUAGE_COOKIE_NAME, obj.stringName || strings.stringName, {
        path: '/',
      });
      console.log(cookie);
    },
    [strings]
  );

  return (
    <GlobalContext.Provider value={{ strings, changePageLang }}>{children}</GlobalContext.Provider>
  );
}
