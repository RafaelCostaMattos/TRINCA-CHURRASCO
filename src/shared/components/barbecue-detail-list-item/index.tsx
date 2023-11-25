import styled from 'styled-components';
import Checkbox from '../checkbox';
import { IPerson } from '@/shared/interfaces/list.inteface';
import { Button } from '@mui/material';
import { NumericFormat } from 'react-number-format';

interface IParticipationItem {
  data: IPerson;
  handleConfirm: () => void;
  handleRemove: () => void;
}

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

const Payed = styled.label`
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: green;
`;

export default function BarbecueDetailListItem({ data, handleConfirm, handleRemove }: IParticipationItem) {
  return (
    <>
      <ParticipantItem>
        <Checkbox data={data} onClick={handleConfirm} />
        <div>
          {data.confirmed && <Payed>Pago</Payed>}
          <NumericFormat
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
          <Button variant="text" color="error" onClick={handleRemove}>
            Remover
          </Button>
        </div>
      </ParticipantItem>
      <Divider />
    </>
  );
}
