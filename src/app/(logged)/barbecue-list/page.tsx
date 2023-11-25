'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { IBarbecue } from '@/shared/interfaces/list.inteface';
import { useState } from 'react';
import { useBarbecueList } from '@/shared/hooks/useBarbecueList.hook';
import DialogAddBarbecue from '@/shared/components/dialogs/add-barbecue';
import { initList } from '@/shared/constants/list.constant';
import { NumericFormat } from 'react-number-format';

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

const CardText = styled.div`
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

const CardValues = styled.div`
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

export default function Dashboard() {
  const router = useRouter();
  const { list, updateBarbecueLocalStorage } = useBarbecueList(initList);
  const [open, setOpen] = useState<boolean>(false);

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
        <Card key={i} onClick={() => handleItem(i)}>
          <CardText>
            <label>{data.date}</label>
            <span>{data.title}</span>
          </CardText>
          <CardValues>
            <div>
              <Image src="/images/icon_people.svg" alt="icon-money" width={20} height={20} priority />
              <label>{data.people.length}</label>
            </div>

            <div>
              <Image src="/images/icon_people.svg" alt="icon-money" width={20} height={20} priority />
              <NumericFormat
                value={data.total}
                displayType={'text'}
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '}
                renderText={(value: string) => <label>{value}</label>}
              />
            </div>
          </CardValues>
        </Card>
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
