import styled from 'styled-components';
import { IBarbecue, IPerson } from '@/shared/interfaces/list.inteface';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';

interface IBarbecueDetailInfo {
  barbecue: IBarbecue;
}

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
export default function BarbecueDetailInfo({ barbecue }: IBarbecueDetailInfo) {
  const calcTotal = () => barbecue.people.reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0);

  const calcRemianing = () =>
    barbecue.people
      .filter((data) => !data.confirmed)
      .reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0);

  const SuggestedPrice = ({ value }: { value: number | undefined }) => {
    return (
      <>
        <NumericFormat
          value={value}
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
    <CardInfo>
      <CardText>
        <label>{barbecue.date}</label>
        <span>{barbecue.title}</span>
      </CardText>
      <CardValues>
        <CardTotal>
          <div>
            <label>Sugestão com bebida:</label>
            <SuggestedPrice value={barbecue.suggestedValueWithAhcool} />
          </div>

          <div>
            <label>Sugestão sem bebida:</label>
            <SuggestedPrice value={barbecue.suggestedValueWithoutAhcool} />
          </div>
        </CardTotal>
        <CardSuggested>
          <div>
            <Image src="/images/icon_people.svg" alt="icon-money" width={20} height={20} priority />
            <label>{barbecue.people.length}</label>
          </div>

          <div>
            <Image src="/images/icon_money.svg" alt="icon-money" width={20} height={20} priority />
            <SuggestedPrice value={calcTotal()} />
          </div>
          <div>
            <Image src="/images/icon_money.svg" alt="icon-money" width={20} height={20} priority />
            <SuggestedPrice value={calcRemianing()} />
          </div>
        </CardSuggested>
      </CardValues>
    </CardInfo>
  );
}
