import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import type { TypeForm } from './AuthForms';
import { GlobalContext } from '@Omniapp/context/GlobalContext';
import { emailISValid } from '@Omniapp/utils/emailIsValid';
import Link from 'next/link';
import { APIResponse } from '@Omniapp/models/APIResponse';
import { quakeEffect } from '@Omniapp/utils/quakeEffect';
import { nicknameIsValid } from '@Omniapp/utils/nicknameIsValid';

interface Props {
  form: TypeForm;
  setForm: Dispatch<SetStateAction<TypeForm>>;
}

export function SignInForm({ form, setForm }: Props) {
  const { strings } = useContext(GlobalContext);

  const [emailOrNicknameValid, setEmailOrNicknameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const emailOrNicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const badMessageSmallRef = useRef<HTMLSpanElement>(null);

  const submit = useCallback(async () => {
    const user = emailOrNicknameRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();
    fetch('/api/sign-in', {
      method: 'POST',
      body: JSON.stringify({ password, user }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((body: APIResponse) => {
        if (body.success) return (window.location.href = '/');
        if (!body.error) return;
        if (body.error.status === 404)
          return (badMessageSmallRef.current!.textContent = strings.userNotFound);
        if (body.error.status === 401)
          return (badMessageSmallRef.current!.textContent = strings.passwordIncorrect);
      });
  }, []);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      if (!emailOrNicknameValid) return quakeEffect(emailOrNicknameRef.current!);
      if (!passwordValid) return quakeEffect(passwordRef.current!);
      submit();
    },
    [emailOrNicknameValid, passwordValid, submit]
  );

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: '90vw',
        maxWidth: 600,
        padding: '1rem',
        ...(form === 'SIGN_IN' ? {} : { display: 'none' }),
      }}
      autoComplete="off"
      autoCapitalize="off"
      className="form-auth"
    >
      <h1>{strings.loginTitle}</h1>
      <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <span>{strings.loginWelcome}</span>
      </div>
      <label htmlFor="email-nickname">
        <span>{strings.nicknameOrEmail}</span>
        <small style={{ ...(emailOrNicknameValid ? { visibility: 'hidden' } : {}) }}>
          {strings.enterEmailOrNicknameValid}
        </small>
      </label>
      <input
        onInput={(e) => {
          const { value } = e.currentTarget;
          setEmailOrNicknameValid(emailISValid(value) || nicknameIsValid(value));
        }}
        id="email-nickname"
        type="text"
        ref={emailOrNicknameRef}
        placeholder="any.exem@email.co"
      />
      <label htmlFor="sign-in-password">
        <span>{strings.password}</span>
        <small style={{ ...(passwordValid ? { visibility: 'hidden' } : {}) }}>
          {strings.passwordInvalidText}
        </small>
      </label>
      <input
        ref={passwordRef}
        type="password"
        id="sign-in-password"
        onInput={(e) => setPasswordValid(e.currentTarget.value.length >= 8)}
        placeholder={strings.inputPasswordPlaceholder}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '1rem',
        }}
      >
        <a
          style={{ marginBottom: '1rem' }}
          href="/forgot-password"
          target="_blank"
          rel="noopener noreferrer"
        >
          {strings.forgotPassword}
        </a>
        <small ref={badMessageSmallRef}></small>
        <button style={{ minWidth: '40%', marginTop: '0.5rem' }} type="submit">
          {strings.enter}
        </button>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: '1rem 0',
          }}
        >
          <div style={{ width: '30%', border: '1px solid var(--primary-variant)' }}></div>
          <div style={{ margin: '0 1rem', textTransform: 'uppercase' }}>{strings.or}</div>
          <div style={{ width: '30%', border: '1px solid var(--primary-variant)' }}></div>
        </div>
        <Link href="#sign-up">
          <button
            type="button"
            style={{
              border: '2px solid var(--primary-variant)',
              minWidth: '40%',
              textTransform: 'uppercase',
            }}
            onClick={() => setForm('SIGN_UP')}
          >
            {strings.signUp}
          </button>
        </Link>
      </div>
    </form>
  );
}
