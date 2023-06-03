import { GlobalContext } from '@Omniapp/context/GlobalContext';
import { strings as strs } from '@Omniapp/resources/strings';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

export function Footer() {
  const { changePageLang, strings } = useContext(GlobalContext);

  return (
    <footer
      style={{
        width: '100%',
        padding: '1rem',
        borderTop: '2px solid var(--primary-variant)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href={'/'} style={{ marginBottom: '0.5rem' }}>
        <Image src="/omniapp.svg" alt="Omniapp" width={25} height={25} />
      </Link>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'underline',
          color: 'var(--link)',
        }}
      >
        <Link href="/privacy">{strings.privacy}</Link>
        <Link href="/terms">{strings.terms}</Link>
      </div>
      <address
        style={{
          display: 'flex',
          width: '100%',
          textAlign: 'center',
          marginBottom: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div>
          &copy; 2023 {strings.appName}.{' '}
          <span style={{ fontStyle: 'normal' }}>{strings.allRighsReserveds}.</span>{' '}
          <span style={{ fontStyle: 'normal' }}>
            | {strings.createdBy}{' '}
            <Link target="_blank" href={'https://me-ogabrielsilva.vercel.app/'}>
              Gabriel
            </Link>
            .
          </span>
        </div>
      </address>
      <select value={strings.stringName} onChange={(e) => changePageLang(e.currentTarget.value)}>
        {Object.keys(strs).map((key) => (
          <option value={key} key={(strs as any)[key].stringLabel}>
            {(strs as any)[key].stringLabel}
          </option>
        ))}
      </select>
    </footer>
  );
}
