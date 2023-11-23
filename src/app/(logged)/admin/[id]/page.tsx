'use client';
import Image from 'next/image';
import styled from 'styled-components';
import { IBarbecue, IPerson } from '@/shared/interfaces/list.inteface';
import CurrencyFormat from 'react-currency-format';
import { useEffect, useState } from 'react';
import DialogAddParticipation from '@/shared/components/dialogs/add-participation';
import { useLocalStorageBarbecue } from '@/shared/hooks/useLocalStorage.hook';
import { redirect } from 'next/navigation';

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

const CheckboxDisplay = styled.label``;

const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 2px solid;
  background: ${(props) => (props.checked ? 'var(--background-01)' : 'transparent')};
  border-color: ${(props) => (props.checked ? 'var(--background-01)' : '#998220')};
  border-radius: 50%;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
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

export default function DashboardItem({ params: { id } }: { params: { id: string } }) {
  const { list, updateBarbecueLocalStorage, getBarbecueListByIndex } = useLocalStorageBarbecue();

  const [open, setOpen] = useState<boolean>(false);
  const [barbecue, setBarbecue] = useState<IBarbecue | undefined>(getBarbecueListByIndex(Number(id)));

  if (!barbecue) redirect('/');

  useEffect(() => {
    setBarbecue(getBarbecueListByIndex(Number(id)));
  }, [list]);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleAddPersion = (person: IPerson) => {
    updateBarbecueLocalStorage({ ...barbecue, people: [person, ...(barbecue.people ?? [])] });
    handleCloseDialog();
  };

  const handlePerson = (name: string) => {
    if (barbecue.people === undefined) return;

    const peopleRefresh = barbecue.people.map((data: IPerson) => {
      if (data.name === name) {
        return { ...data, confirmed: !data.confirmed };
      }

      return data;
    });
    updateBarbecueLocalStorage({ ...barbecue, people: peopleRefresh });
  };

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
                <label>Sugestão de preço com bebida:</label>
                <SuggestedWithAlcohol />
              </div>

              <div>
                <label>Sugestão de preço sem bebida:</label>
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
                <label>{barbecue.total}</label>
              </div>
            </CardSuggested>
          </CardValues>
        </CardInfo>
        <DashboardItemList>
          <AddParticipantCard onClick={() => setOpen(true)}>
            <label>Adicionar participante</label>
          </AddParticipantCard>
          <ul>
            {barbecue?.people &&
              barbecue?.people.map((data: IPerson, i: number) => (
                <li key={i} style={{ listStyleType: 'none', margin: 16 }}>
                  <ParticipantItem>
                    <div>
                      <HiddenCheckbox checked={data.confirmed} onChange={() => handlePerson(data.name)} />
                      <StyledCheckbox checked={data.confirmed} onClick={() => handlePerson(data.name)} />

                      <label>{data.name}</label>
                    </div>
                    <div>
                      <CurrencyFormat
                        value={data.value}
                        displayType={'text'}
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={'R$ '}
                        renderText={(value: string) => (
                          <label
                            style={{
                              textDecorationLine: data.confirmed ? 'line-through' : 'none',
                            }}
                          >
                            {value}
                          </label>
                        )}
                      />
                    </div>
                  </ParticipantItem>
                  <Divider />
                </li>
              ))}
          </ul>
        </DashboardItemList>
      </Card>
      <DialogAddParticipation isOpen={open} onClose={handleCloseDialog} onSubmit={handleAddPersion} />
    </>
  );
}
