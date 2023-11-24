import { IPerson } from '@/shared/interfaces/list.inteface';
import styled from 'styled-components';

export interface ICheckbox {
  data: IPerson;
  onClick: () => void;
}

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

export default function Checkbox({ data, onClick }: ICheckbox) {
  return (
    <div>
      <HiddenCheckbox defaultChecked={data.confirmed} onChange={() => null} />
      <StyledCheckbox checked={data.confirmed} defaultChecked={data.confirmed} onClick={() => onClick()} />

      <label>{data.name}</label>
    </div>
  );
}
