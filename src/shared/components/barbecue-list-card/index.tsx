import { IBarbecue } from '@/shared/interfaces/list.inteface';
import styled from 'styled-components';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';

interface IBarbecueListCard {
  data: IBarbecue;
  onSelect: () => void;
}

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

export default function BarbecueListCard({ data, onSelect }: IBarbecueListCard) {
  return (
    <Card onClick={onSelect}>
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
  );
}
