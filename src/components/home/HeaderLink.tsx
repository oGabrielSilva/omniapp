import { HomeNavigationContext, ScreenName } from '@Omniapp/context/HomeNavigationContext';
import { NAV_ITEM_SELECTED_CLASS } from '@Omniapp/resources/constants';
import Link from 'next/link';
import { useContext, useRef } from 'react';

interface HeaderLinkProps {
  children: JSX.Element | string;
  hash: ScreenName;
  icon: string;
}

export function HeaderLink({ children, hash, icon }: HeaderLinkProps) {
  const { setScreen, screen } = useContext(HomeNavigationContext);

  return (
    <li
      className={screen === hash ? NAV_ITEM_SELECTED_CLASS : ''}
      onClick={(e) => {
        e.currentTarget.querySelector('a')?.click();
        return window.location.hash.slice(1) === hash ? void 0 : setScreen(hash);
      }}
    >
      <h3>
        <i className={icon}></i>
        <div>
          <Link
            onClick={(e) => {
              e.preventDefault();
              if (window.location.hash.slice(1) !== hash) {
                window.history.pushState({}, '', '#'.concat(hash));
                setScreen(hash);
              }
            }}
            href={'#'.concat(hash)}
          >
            {children}
          </Link>
        </div>
      </h3>
    </li>
  );
}
