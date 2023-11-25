'use client';
import styled from 'styled-components';
import { redirect } from 'next/navigation';
import { useBarbecueById } from '@/shared/hooks/useBarbecueById.hook';
import BarbecueDetailList from '@/shared/components/barbecue-detail-list';
import BarbecueDetailInfo from '@/shared/components/barbecue-detail-info';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding);
  border-radius: 2px;
  width: 100%;
  max-width: 50rem;
  gap: var(--gap-48);

  background: var(--background-00);
  justify-content: space-between;
  box-shadow: var(--box-shadow);
  margin: -50px 0 20px;
`;

export default function BarbecueItem({ params: { id } }: { params: { id: string } }) {
  const { barbecue, loading, updateBarbecueIndexLocalStorage } = useBarbecueById(Number(id));

  if (loading) return <p>Buscando informações...</p>;
  if (!barbecue) redirect('/');

  return (
    <Card>
      <>
        <BarbecueDetailInfo barbecue={barbecue} />
        {barbecue?.observation}
        <BarbecueDetailList barbecue={barbecue} id={Number(id)} update={updateBarbecueIndexLocalStorage} />
      </>
    </Card>
  );
}
