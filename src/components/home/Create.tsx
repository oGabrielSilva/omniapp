import { GlobalContext } from '@Omniapp/context/GlobalContext';
import { HomeNavigationContext } from '@Omniapp/context/HomeNavigationContext';
import { imgToDataURL } from '@Omniapp/utils/image';
import Image from 'next/image';
import { useContext, useRef, useState } from 'react';

export function Create() {
  const { screen } = useContext(HomeNavigationContext);
  const { strings } = useContext(GlobalContext);

  const [image, setImage] = useState('');

  const inputImageRef = useRef<HTMLInputElement>(null);

  const getImage = () => {
    if (inputImageRef.current) inputImageRef.current.click();
  };

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        ...(screen === 'create' ? { display: 'flex' } : { display: 'none' }),
      }}
      id="create"
    >
      <form style={{ flex: 1, padding: '1rem' }}>
        <input
          onChange={(e) => {
            if (!e.currentTarget.files) return;
            imgToDataURL(e.currentTarget.files[0], 80, 80)
              .then((img) => {
                setImage(img);
              })
              .catch((e) => console.log(e));
          }}
          ref={inputImageRef}
          accept="image/*"
          type="file"
          style={{ display: 'none' }}
        />
        <div>
          {!image ? (
            <svg
              onClick={getImage}
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="var(--text)"
              className="bi bi-plus-square"
              viewBox="0 0 16 16"
              style={{ cursor: 'pointer' }}
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          ) : (
            <Image
              onClick={getImage}
              width={80}
              height={80}
              alt={strings.createPlaceholderAlt}
              src={image}
              priority
              style={{ borderRadius: 8, border: '4px solid var(--text)' }}
            />
          )}
        </div>
      </form>
    </div>
  );
}
