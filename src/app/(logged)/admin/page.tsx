'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { IBarbecue } from '@/shared/interfaces/list.inteface';
import DialogAddBarbecue from '@/shared/components/dialogs/add-barbecue';
import { useState } from 'react';
import { useLocalStorageBarbecue } from '@/shared/hooks/useLocalStorage.hook';

const DashboardImage = styled.div`
  width: 100vw;
  height: 35%;
`;

const DashboardList = styled.div`
  background: var(--background-00);

  display: flex;
  flex-flow: column wrap;
  flex-direction: row;
  max-width: 100%;
  gap: var(--gap-24);
  justify-content: center;
`;

const DashboardCard = styled.div`
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

const DashboardCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gar-8);

  > label {
    color: var(--text-black);
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }

  > span {
    font-size: 21px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const DashboardCardValues = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: row;
    gap: 12px;

    align-items: center;

    > label {
      font-size: 21px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;

const DashboardCardAdd = styled.div`
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

const DashboardIconAdd = styled.div`
  background: #ffd836;
  width: 90px;
  height: 90px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Dashboard() {
  const router = useRouter();
  const { list, addNewBarbecueLocalStorage } = useLocalStorageBarbecue();
  const [open, setOpen] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleItem = (id: number) => {
    router.push(`/admin/${id}`);
  };

  const handleAddBarbecue = (barbecua: IBarbecue) => {
    console.log(barbecua);
    addNewBarbecueLocalStorage(barbecua);
    handleCloseDialog();
  };

  return (
    <>
      {list.map((data: IBarbecue, i: number) => (
        <DashboardCard key={i} onClick={() => handleItem(i)}>
          <DashboardCardText>
            <label>{data.date}</label>
            <span>{data.title}</span>
          </DashboardCardText>
          <DashboardCardValues>
            <div>
              <Image src="/images/icon_people.svg" alt="icon-money" width={20} height={20} priority />
              <label>{data.people.length}</label>
            </div>

            <div>
              <Image src="/images/icon_people.svg" alt="icon-money" width={20} height={20} priority />
              <label>{data.total}</label>
            </div>
          </DashboardCardValues>
        </DashboardCard>
      ))}
      <DashboardCard onClick={() => setOpen(true)}>
        <DashboardCardAdd>
          <DashboardIconAdd>
            <Image src="/images/icon_bbq.svg" alt="icon-money" width={40} height={44} priority />
          </DashboardIconAdd>
          <label>Adicionar Churrasco</label>
        </DashboardCardAdd>
      </DashboardCard>
      <DialogAddBarbecue isOpen={open} onClose={handleCloseDialog} onSubmit={handleAddBarbecue} />
    </>
  );
}
