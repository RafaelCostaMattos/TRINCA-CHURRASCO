import styled from 'styled-components';
import { IBarbecue, IPerson } from '@/shared/interfaces/list.inteface';
import { useState } from 'react';
import DialogAddParticipation from '../dialogs/add-participation';
import BarbecueDetailListItem from '../barbecue-detail-list-item';

interface IParticipationList {
  barbecue: IBarbecue;
  id: number;
  update: (list: IBarbecue) => void;
}

const DashboardItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-10);
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

export default function BarbecueDetailList({ barbecue, update }: IParticipationList) {
  const [open, setOpen] = useState<boolean>(false);

  const calcTotal = () => barbecue.people.reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0);

  const handleAdd = (person: IPerson) => {
    update({
      ...barbecue,
      people: [person, ...(barbecue.people ?? [])],
      total: [person, ...(barbecue.people ?? [])].reduce(
        (accumulator: number, data: IPerson) => accumulator + data.value,
        0
      ),
    });
    handleCloseDialog();
  };

  const handleRemove = (index: number) => {
    const newPersonList = barbecue.people.filter((p, i) => i !== index);
    update({
      ...barbecue,
      people: newPersonList,
      total: newPersonList.reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0),
    });
    handleCloseDialog();
  };

  const handleConfirm = (index: number) => {
    barbecue.people[index].confirmed = !barbecue.people[index].confirmed;
    barbecue.total = calcTotal();
    update(barbecue);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <DashboardItemList>
        <AddParticipantCard onClick={() => setOpen(true)}>
          <label>Adicionar participante</label>
        </AddParticipantCard>
        <ul>
          {barbecue?.people &&
            barbecue?.people.map((data: IPerson, i: number) => (
              <li key={i} style={{ listStyleType: 'none', margin: 16 }}>
                <BarbecueDetailListItem
                  data={data}
                  handleConfirm={() => handleConfirm(i)}
                  handleRemove={() => handleRemove(i)}
                />
              </li>
            ))}
        </ul>
      </DashboardItemList>
      <DialogAddParticipation isOpen={open} onClose={handleCloseDialog} onSubmit={handleAdd} />
    </>
  );
}
