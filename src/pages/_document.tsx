import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Gabriel Henrique da Silva" />
        <meta
          name="keywords"
          content="Omniapp, RPG, rede social, personagens, histórias, jogadores"
        />
        <meta
          name="description"
          content="Omniapp é uma rede social para quem gosta de jogos de RPG. Compartilhe suas histórias, personagens e encontre outros jogadores!"
        />
        <meta property="og:title" content="Omniapp" />
        <meta
          property="og:description"
          content="Omniapp é uma rede social para quem gosta de jogos de RPG. Compartilhe suas histórias, personagens e encontre outros jogadores!"
        />
        <meta property="og:image" content="/static/img/omniapp256.png" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nova+Oval&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
