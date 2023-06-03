import { AuthForms } from '@Omniapp/components/AuthForms';
import { Footer } from '@Omniapp/components/Footer';
import GlobalContextProvider from '@Omniapp/context/GlobalContext';
import { AUTH_COOKIE_NAME, LANGUAGE_COOKIE_NAME } from '@Omniapp/resources/constants';
import { strings } from '@Omniapp/resources/strings';
import { decryptToken, tokenIsValid, undoToken } from '@Omniapp/authentication/token';
import { Main } from '@Omniapp/components/home/Main';
import AuthContextProvider from '@Omniapp/context/AuthContext';
import { GetServerSideProps } from 'next';
import { PageProps } from '../../omniapp.global';
import HomeNavigationContextProvider from '@Omniapp/context/HomeNavigationContext';

export default function Home({ logged, lang, nickname }: PageProps) {
  return logged ? (
    <GlobalContextProvider lang={lang}>
      <AuthContextProvider nickname={nickname}>
        <HomeNavigationContextProvider>
          <Main />
        </HomeNavigationContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  ) : (
    <GlobalContextProvider lang={lang}>
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <AuthForms />
        <Footer />
      </div>
    </GlobalContextProvider>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ req }) => {
  const logged = tokenIsValid(req.cookies[AUTH_COOKIE_NAME], false);
  const nickname = logged ? undoToken(decryptToken(req.cookies[AUTH_COOKIE_NAME]!)).nickname : '';
  const lang = req.cookies[LANGUAGE_COOKIE_NAME] || strings.br.stringName;

  return { props: { logged, lang, nickname } };
};
