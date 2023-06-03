import { HomeNavigationContext } from '@Omniapp/context/HomeNavigationContext';
import { useContext } from 'react';

export function Feed() {
  const { screen } = useContext(HomeNavigationContext);

  return (
    <div
      style={{ flex: 1, overflow: 'auto', ...(screen === 'feed' ? {} : { display: 'none' }) }}
      id="feed"
    ></div>
  );
}
