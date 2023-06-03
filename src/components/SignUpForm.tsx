import {
  Dispatch,
  FocusEventHandler,
  FormEventHandler,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import type { TypeForm } from './AuthForms';
import { GlobalContext } from '@Omniapp/context/GlobalContext';
import Link from 'next/link';
import { emailISValid } from '@Omniapp/utils/emailIsValid';
import { quakeEffect } from '@Omniapp/utils/quakeEffect';
import { APIResponse } from '@Omniapp/models/APIResponse';
import { NICKNAME_REGEX } from '@Omniapp/resources/constants';
import { nicknameIsValid } from '@Omniapp/utils/nicknameIsValid';

interface Props {
  form: TypeForm;
  setForm: Dispatch<SetStateAction<TypeForm>>;
}

export function SignUpForm({ form, setForm }: Props) {
  const { strings } = useContext(GlobalContext);

  const [nameValid, setNameValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [checkingNickname, setCheckingNickname] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const badMessageSmallRef = useRef<HTMLSpanElement>(null);

  const submit = useCallback(async () => {
    const name = nameRef.current!.value.trim();
    const surname = surnameRef.current!.value.trim();
    const nickname = nicknameRef.current!.value.trim();
    const email = emailRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();
    fetch('/api/sign-up', {
      method: 'POST',
      body: JSON.stringify({ name, surname, nickname, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((body: APIResponse) => {
        if (body.success) return (window.location.href = '/');
        if (!body.error || body.error.status !== 409) return;
        const message = body.error.cause.includes('email')
          ? strings.emailAlreadyInUse
          : strings.nicknameAlreadyInUse;
        badMessageSmallRef.current!.textContent = message;
        if (message.includes('email')) return emailRef.current?.focus();
        nicknameRef.current?.focus();
      });
  }, []);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      if (!nameValid) return quakeEffect(nameRef.current!);
      if (!nicknameValid) return quakeEffect(nicknameRef.current!);
      if (!emailValid) return quakeEffect(emailRef.current!);
      if (!passwordValid) return quakeEffect(passwordRef.current!);
      submit();
    },
    [nameValid, nicknameValid, emailValid, passwordValid, submit]
  );

  const checkNickname = useCallback<FocusEventHandler<HTMLInputElement>>(async () => {
    if (!nicknameRef.current) return;
    if (!nicknameIsValid(nicknameRef.current.value)) {
      setNicknameValid(false);
      setCheckingNickname(false);
      return;
    }
    if (!checkingNickname) {
      setCheckingNickname(true);
      const response = await fetch(
        '/api/check-nickname?nickname='.concat(nicknameRef.current.value.trim()),
        { method: 'GET' }
      );
      const body: APIResponse = await response.json();
      setCheckingNickname(false);
      setNicknameValid((body.error && body.error.status === 404) || false);
    }
  }, [checkingNickname]);

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: '90vw',
        maxWidth: 600,
        padding: '1rem',
        ...(form === 'SIGN_UP' ? {} : { display: 'none' }),
      }}
      autoComplete="off"
      autoCapitalize="off"
      className="form-auth"
    >
      <h1>{strings.signUpTitle}</h1>
      <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <span>{strings.signUpWelcome}</span>
      </div>
      <label htmlFor="name">
        <span>{strings.name}</span>
        <small style={{ ...(nameValid ? { visibility: 'hidden' } : {}) }}>
          {strings.enterNameValid}
        </small>
      </label>
      <input
        ref={nameRef}
        type="text"
        id="name"
        placeholder="Any"
        onInput={(e) => setNameValid(e.currentTarget.value.length >= 2)}
      />
      <label htmlFor="surname">
        <span>{strings.surname}</span>
      </label>
      <input ref={surnameRef} type="text" id="surname" />
      <label htmlFor="nickname">
        <span>{strings.nickname}</span>
        <small style={{ ...(nicknameValid ? { visibility: 'hidden' } : {}) }}>
          {strings.enterNicknameValid}
        </small>
      </label>
      <input
        ref={nicknameRef}
        type="text"
        id="nickname"
        placeholder="any.omn"
        onBlur={checkNickname}
      />
      <label htmlFor="sign-up-email">
        <span>Email</span>
        <small style={{ ...(emailValid ? { visibility: 'hidden' } : {}) }}>
          {strings.enterEmailValid}
        </small>
      </label>
      <input
        ref={emailRef}
        type="email"
        id="sign-up-email"
        placeholder="any.exem@email.co"
        onInput={({ currentTarget }) => setEmailValid(emailISValid(currentTarget.value))}
      />
      <label htmlFor="sign-up-password">
        <span>{strings.password}</span>
        <small style={{ ...(passwordValid ? { visibility: 'hidden' } : {}) }}>
          {strings.passwordInvalidText}
        </small>
      </label>
      <input
        ref={passwordRef}
        type="password"
        id="sign-up-password"
        placeholder={strings.inputPasswordPlaceholder}
        onInput={({ currentTarget }) => setPasswordValid(currentTarget.value.length >= 8)}
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
        <small ref={badMessageSmallRef}></small>
        <button style={{ minWidth: '40%', marginTop: '0.5rem' }} type="submit">
          {strings.signUp}
        </button>
        <Link href="#sign-in" onClick={() => setForm('SIGN_IN')}>
          <button
            type="button"
            style={{ margin: '1rem 0', color: 'var(--link)' }}
            onClick={() => setForm('SIGN_IN')}
          >
            {strings.alreadyHaveAccount}
          </button>
        </Link>
      </div>
    </form>
  );
}
