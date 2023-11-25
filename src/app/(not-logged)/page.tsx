'use client';

import { SyntheticEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background: var(--background-01);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8rem;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 800;
`;

const Card = styled.div`
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

const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: var(--gap-16);
`;

const FieldName = styled.h2`
  color: var(--text-grey);
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FieldInput = styled.input`
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

const FieldBtn = styled.button`
  background: var(--text-black);
  border-radius: var(--border-radius-18);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
  border: none;
  padding: 0.8rem 7rem;
  cursor: pointer;

  > label {
    cursor: pointer;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const login = (Object.values(event.target)[0] as HTMLInputElement).value;
    const senha = (Object.values(event.target)[1] as HTMLInputElement).value;

    setLoading(true);

    const result = await signIn('credentials', {
      login,
      senha,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError(true);

      return;
    }

    router.replace('/barbecue-list');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Card>
          <Title>Agenda de Churras</Title>
          <Field>
            <FieldName></FieldName>
            <FieldInput type="email" name="" placeholder="e-mail" required />
          </Field>
          <Field>
            <FieldName>Senha</FieldName>
            <FieldInput type="password" name="senha" placeholder="senha" required />
          </Field>
          <FieldBtn type="submit" disabled={loading}>
            <label>Entrar</label>
          </FieldBtn>
          {error && <label>{error}</label>}
        </Card>
      </form>
    </Container>
  );
}
