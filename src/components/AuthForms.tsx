import { useEffect, useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export type TypeForm = 'SIGN_IN' | 'SIGN_UP';

export function AuthForms() {
  const [form, setForm] = useState<TypeForm>('SIGN_IN');

  useEffect(() => setForm(window.location.hash === '#sign-up' ? 'SIGN_UP' : 'SIGN_IN'), []);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: '1rem 0',
      }}
    >
      <SignInForm form={form} setForm={setForm} />
      <SignUpForm form={form} setForm={setForm} />
    </main>
  );
}
