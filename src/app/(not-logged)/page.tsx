'use client';
import { SyntheticEvent } from 'react';

// import { IMAGE_LOGIN_BG } from '@/shared/constants/images/logo';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;

  background: var(--background-01);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8rem;
`;

const LoginTitle = styled.div`
  font-size: 32px;
  font-weight: 800;
`;

const LoginCard = styled.div`
  background: var(--background-00);
  box-shadow: 0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06);
  padding: var(--padding);
  border-radius: var(--border-radius);

  min-width: 500px;
  min-height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: var(--gap-36);
`;

const LoginField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: var(--gap-16);
`;

const LoginFieldName = styled.h2`
  color: var(--text-grey);
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const LoginFieldInput = styled.input`
  width: 282px;
  height: 50px;
  flex-shrink: 0;

  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 2px;
  background: var(--background-00);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
  color: var(--text-grey);
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  padding: 8px;

  &::placeholder {
    color: var(--text-grey);
    font-size: 18px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
  }
`;

const LoginFieldBtn = styled.button`
  background: var(--text-black);
  border-radius: var(--border-radius-18);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
  border: none;
  padding: 0.8rem 7rem;

  > label {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export default function SignIn() {
  const router = useRouter();

  // const bgImage = IMAGE_LOGIN_BG;

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const login = (Object.values(event.target)[0] as HTMLInputElement).value;
    const senha = (Object.values(event.target)[1] as HTMLInputElement).value;

    // setLoading(true);

    const result = await signIn('credentials', {
      login,
      senha,
      redirect: false,
    });

    // setLoading(false);
    // if (result?.error) {
    //   setError(true);

    //   return;
    // }

    router.replace('/admin');
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <LoginCard>
          <LoginTitle>Agenda de Churras</LoginTitle>
          <LoginField>
            <LoginFieldName>Login</LoginFieldName>
            <LoginFieldInput type="email" name="login" placeholder="e-mail" required />
          </LoginField>
          <LoginField>
            <LoginFieldName>Senha</LoginFieldName>
            <LoginFieldInput type="password" name="senha" placeholder="senha" required />
          </LoginField>
          <LoginFieldBtn type="submit">
            <label>Entrar</label>
          </LoginFieldBtn>
        </LoginCard>
      </form>
    </LoginContainer>
  );
}
