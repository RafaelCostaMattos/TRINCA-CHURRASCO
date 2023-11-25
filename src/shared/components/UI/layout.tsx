'use client';
import Image from 'next/image';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UIContainer = styled.div`
  width: 100vw;

  background: var(--background-00);

  display: flex;
  flex-direction: column;
`;

const UITitle = styled.div`
  position: absolute;
  top: 10%;
  left: 43%;

  > label {
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

const UIBtnLogout = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;

  > button {
    background: var(--text-black);
    border-radius: var(--border-radius-18);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
    border: none;
    padding: 0.8rem 7rem;
    cursor: pointer;
  }
`;

const UIImage = styled.div`
  width: 100vw;
  height: 30vh;
`;

const UIChildren = styled.div`
  background: var(--background-00);

  display: flex;
  flex-flow: column wrap;
  flex-direction: row;
  max-width: 100%;
  gap: var(--gap-36);
  justify-content: center;
`;

export default function UILayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  async function logout() {
    await signOut({
      redirect: false,
    });

    router.replace('/');
  }

  return (
    <UIContainer>
      <UIImage>
        <UIBtnLogout>
          <button onClick={logout}>Sair</button>
        </UIBtnLogout>
        <UITitle>
          <label>Agenda de Churras</label>
        </UITitle>
        <Image
          src="/images/background_yellow_header.svg"
          alt="background"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          priority
        />
      </UIImage>
      <UIChildren>{children}</UIChildren>
    </UIContainer>
  );
}
