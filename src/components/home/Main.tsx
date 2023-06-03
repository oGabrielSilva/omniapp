import { Header } from './Header';
import { Feed } from './Feed';
import { Files } from './Files';
import { Create } from './Create';

export function Main() {
  return (
    <section
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <main className="home-main">
        <Header />
        <Feed />
        <Files />
        <Create />
      </main>
    </section>
  );
}
