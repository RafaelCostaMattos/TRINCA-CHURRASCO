import { IPerson } from '@/shared/interfaces/list.inteface';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import styled from 'styled-components';

interface IDialogAddParticipation {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (person: IPerson) => void;
}

const DialogForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap-16);
    width: 100%;

    > div {
      margin: 8px;
    }
  }
`;

export default function DialogAddParticipation({ isOpen, onClose, onSubmit }: IDialogAddParticipation) {
  const [form, setForm] = useState<IPerson>({
    name: '',
    value: 0,
    alcoholicDrink: true,
    confirmed: false,
  });

  const onChangeFormField = (field: string, value: any) => {
    console.log(value);
    setForm({ ...form, [field]: value });
  };

  const handleAddPerson = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle>Adicionar participante</DialogTitle>
      <DialogContent>
        <DialogForm onSubmit={handleAddPerson}>
          <div>
            <TextField
              required
              autoFocus
              margin="dense"
              label="Nome"
              type="text"
              variant="outlined"
              onChange={(e) => onChangeFormField('name', e.target.value)}
            />
            <CurrencyFormat
              required
              customInput={TextField}
              placeholder="Contribuição"
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'R$ '}
              onValueChange={(values) => onChangeFormField('value', values.floatValue)}
            />
            <FormControlLabel
              control={
                <Switch defaultChecked={form.alcoholicDrink} onChange={(e, c) => onChangeFormField('alcohol', c)} />
              }
              label="Com bêbida alcoolica"
            />
          </div>
          <div>
            <DialogActions>
              <Button onClick={onClose}>Cancelar</Button>
              <Button type="submit" variant="contained">
                Contribuir
              </Button>
            </DialogActions>
          </div>
        </DialogForm>
      </DialogContent>
    </Dialog>
  );
}
