import { AuthContext } from '@Omniapp/context/AuthContext';
import { GlobalContext } from '@Omniapp/context/GlobalContext';
import { HomeNavigationContext } from '@Omniapp/context/HomeNavigationContext';
import Link from 'next/link';
import { useContext } from 'react';

export function Files() {
  const { files } = useContext(AuthContext);
  const { screen, setScreen } = useContext(HomeNavigationContext);
  const { strings } = useContext(GlobalContext);

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        ...(screen === 'files' ? { display: 'flex' } : { display: 'none' }),
      }}
      id="files"
    >
      {files.length < 1 ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h2>{strings.doesNotHaveFiles}</h2>
          <Link
            style={{ padding: '1rem' }}
            href={'#create'}
            onClick={(e) => {
              e.preventDefault();
              if (window.location.hash.slice(1) !== 'create') {
                window.history.pushState({}, '', '#create');
                setScreen('create');
              }
            }}
          >
            {strings.start}
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
