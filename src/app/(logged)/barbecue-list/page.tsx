'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { IBarbecue } from '@/shared/interfaces/list.inteface';
import { useState } from 'react';
import { useBarbecueList } from '@/shared/hooks/useBarbecueList.hook';
import DialogAddBarbecue from '@/shared/components/dialogs/add-barbecue';
import { initList } from '@/shared/constants/list.constant';
import BarbecueListCard from '@/shared/components/barbecue-list-card';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding);
  border-radius: 2px;
  width: 282px;
  gap: var(--gap-48);

  background: var(--background-00);
  justify-content: space-between;
  box-shadow: var(--box-shadow);
  margin: -44px 0 20px;

  cursor: pointer;
`;

const CardAdd = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-8);
  justify-content: center;
  align-items: center;

  > label {
    font-size: 21px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const IconAdd = styled.div`
  background: #ffd836;
  width: 90px;
  height: 90px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BarbecueList() {
  const router = useRouter();
  const { list, loading, updateBarbecueLocalStorage } = useBarbecueList(initList);
  const [open, setOpen] = useState<boolean>(false);

  if (loading) return <p>Buscando informações...</p>;
  if (!list) return;

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleItem = (id: number) => {
    router.push(`/barbecue-list/${id}`);
  };

  const handleAddBarbecue = (barbecua: IBarbecue) => {
    updateBarbecueLocalStorage([...list, barbecua]);
    handleCloseDialog();
  };

  return (
    <>
      {list.map((data: IBarbecue, i: number) => (
        <BarbecueListCard key={i} data={data} onSelect={() => handleItem(i)} />
      ))}
      <Card onClick={() => setOpen(true)}>
        <CardAdd>
          <IconAdd>
            <Image src="/images/icon_bbq.svg" alt="icon-money" width={40} height={44} priority />
          </IconAdd>
          <label>Adicionar Churrasco</label>
        </CardAdd>
      </Card>
      <DialogAddBarbecue isOpen={open} onClose={handleCloseDialog} onSubmit={handleAddBarbecue} />
    </>
  );
}
