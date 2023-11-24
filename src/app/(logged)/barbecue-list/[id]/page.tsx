'use client';
import Image from 'next/image';
import styled from 'styled-components';
import { IPerson } from '@/shared/interfaces/list.inteface';
import CurrencyFormat from 'react-currency-format';
import { useState } from 'react';
import DialogAddParticipation from '@/shared/components/dialogs/add-participation';
import { redirect } from 'next/navigation';
import { useBarbecueById } from '@/shared/hooks/useBarbecueById.hook';
import Checkbox from '@/shared/components/checkbox';
import { Button } from '@mui/material';

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

const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gar-8);

  > label {
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    color: var(--text-black);
  }

  > span {
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const CardValues = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--gap-24);

  align-items: center;
`;

const CardTotal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--gap-10);

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

const CardSuggested = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--gap-10);

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

const DashboardItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-10);
`;

const ParticipantItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--gap-18);

    > label {
      font-size: 21px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;

const Divider = styled.div`
  opacity: 0.5;
  background: #e5c231;
  width: 100%;
  height: 1px;
`;

const AddParticipantCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-item: center;
  box-shadow: var(--box-shadow);
  padding: var(--padding) 8px;
  margin-bottom: 28px;
  cursor: pointer;

  > label {
    font-size: 21px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
  }
`;

const Payed = styled.label`
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: green;
`;

export default function DashboardItem({ params: { id } }: { params: { id: string } }) {
  const { barbecue, loading, updateBarbecueIndexLocalStorage } = useBarbecueById(Number(id));

  const [open, setOpen] = useState<boolean>(false);

  if (loading) return;
  if (!barbecue) redirect('/');

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleAdd = (person: IPerson) => {
    updateBarbecueIndexLocalStorage({ ...barbecue, people: [person, ...(barbecue.people ?? [])] });
    handleCloseDialog();
  };

  const handleRemove = (index: number) => {
    updateBarbecueIndexLocalStorage({ ...barbecue, people: barbecue.people.filter((p, i) => i !== index) });
    handleCloseDialog();
  };

  const handleConfirm = (index: number) => {
    barbecue.people[index].confirmed = !barbecue.people[index].confirmed;
    barbecue.total = calcTotal();
    updateBarbecueIndexLocalStorage(barbecue);
  };

  const calcTotal = () => barbecue.people.reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0);

  const calcRemianing = () =>
    barbecue.people
      .filter((data) => !data.confirmed)
      .reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0);

  const SuggestedWithAlcohol = () => {
    return (
      <>
        <CurrencyFormat
          value={barbecue.suggestedValueWithAhcool}
          displayType={'text'}
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale={true}
          prefix={'R$ '}
          renderText={(value: string) => <label>{value}</label>}
        />
      </>
    );
  };

  const SuggestedWithOutAlcohol = () => {
    return (
      <>
        <CurrencyFormat
          value={barbecue.suggestedValueWithoutAhcool}
          displayType={'text'}
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale={true}
          prefix={'R$ '}
          renderText={(value: string) => <label>{value}</label>}
        />
      </>
    );
  };

  const TotalValue = () => {
    return (
      <>
        <CurrencyFormat
          value={calcTotal()}
          displayType={'text'}
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale={true}
          prefix={'R$ '}
          renderText={(value: string) => <label>{value}</label>}
        />
      </>
    );
  };

  const TotalRemaning = () => {
    return (
      <>
        <CurrencyFormat
          value={calcRemianing()}
          displayType={'text'}
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale={true}
          prefix={'R$ '}
          renderText={(value: string) => <label>{value}</label>}
        />
      </>
    );
  };

  return (
    <>
      <Card>
        <CardInfo>
          <CardText>
            <label>{barbecue.date}</label>
            <span>{barbecue.title}</span>
          </CardText>
          <CardValues>
            <CardTotal>
              <div>
                <label>Sugestão com bebida:</label>
                <SuggestedWithAlcohol />
              </div>

              <div>
                <label>Sugestão sem bebida:</label>
                <SuggestedWithOutAlcohol />
              </div>
            </CardTotal>
            <CardSuggested>
              <div>
                <Image src="/images/icon_people.svg" alt="icon-money" width={20} height={20} priority />
                <label>{barbecue.people.length}</label>
              </div>

              <div>
                <Image src="/images/icon_money.svg" alt="icon-money" width={20} height={20} priority />
                <TotalValue />
              </div>
              <div>
                <Image src="/images/icon_money.svg" alt="icon-money" width={20} height={20} priority />
                <TotalRemaning />
              </div>
            </CardSuggested>
          </CardValues>
        </CardInfo>
        {barbecue.observation}
        <DashboardItemList>
          <AddParticipantCard onClick={() => setOpen(true)}>
            <label>Adicionar participante</label>
          </AddParticipantCard>
          <ul>
            {barbecue?.people &&
              barbecue?.people.map((data: IPerson, i: number) => (
                <li key={i} style={{ listStyleType: 'none', margin: 16 }}>
                  <ParticipantItem>
                    <Checkbox data={data} onClick={() => handleConfirm(i)} />
                    <div>
                      {data.confirmed && <Payed>Pago</Payed>}
                      <CurrencyFormat
                        value={data.value}
                        displayType={'text'}
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={'R$ '}
                        type="text"
                        renderText={(formattedValue: string) => (
                          <label
                            style={{
                              textDecorationLine: data.confirmed ? 'line-through' : 'none',
                            }}
                          >
                            {formattedValue}
                          </label>
                        )}
                      />
                      <Button variant="text" color="error" onClick={() => handleRemove(i)}>
                        Remover
                      </Button>
                    </div>
                  </ParticipantItem>
                  <Divider />
                </li>
              ))}
          </ul>
        </DashboardItemList>
      </Card>

      <DialogAddParticipation isOpen={open} onClose={handleCloseDialog} onSubmit={handleAdd} />
    </>
  );
}
