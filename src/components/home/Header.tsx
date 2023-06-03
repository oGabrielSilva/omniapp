import { GlobalContext } from '@Omniapp/context/GlobalContext';
import Image from 'next/image';
import { useContext } from 'react';
import { HeaderLink } from './HeaderLink';

export function Header() {
  const { strings } = useContext(GlobalContext);

  return (
    <header style={{ flex: 1, display: 'flex' }}>
      <div id="header_1" style={{ flex: 1, borderRight: '4px solid var(--primary-variant)' }}>
        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Image alt={strings.appName} src="/omniapp.svg" width={30} height={30} />
          <div>
            <span>
              <strong>{strings.appName}</strong>
            </span>
          </div>
        </div>
        <nav style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column' }}>
          <ul>
            <HeaderLink hash="feed" icon="bi bi-compass">
              {strings.feed}
            </HeaderLink>
            <HeaderLink hash="search" icon="bi bi-search">
              {strings.search}
            </HeaderLink>
            <HeaderLink hash="create" icon="bi bi-plus-circle">
              {strings.create}
            </HeaderLink>
            <HeaderLink hash="files" icon="bi bi-folder2-open">
              {strings.files}
            </HeaderLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
