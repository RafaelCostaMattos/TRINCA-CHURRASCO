'use client';
import Image from 'next/image';
import styled from 'styled-components';
import { ReactNode } from 'react';

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
  gap: var(--gap-24);
  justify-content: center;
`;

export default function UILayout({ children }: { children: ReactNode }) {
  return (
    <UIContainer>
      <UIImage>
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
