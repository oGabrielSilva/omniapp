import type { AppProps } from 'next/app';
import '@Omniapp/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Omniapp</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
