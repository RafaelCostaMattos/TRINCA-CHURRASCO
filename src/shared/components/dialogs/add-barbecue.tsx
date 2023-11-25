import { IBarbecue } from '@/shared/interfaces/list.inteface';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

interface IDialogAddBarbecue {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (person: IBarbecue) => void;
}

const DialogForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
  align-items: center;

  // > div {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   gap: var(--gap-16);
  //   width: 100%;

  //   > div {
  //     margin: 8px;
  //   }
  // }
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--gap-16);
  align-items: center;
  width: 100%;
`;

export default function DialogAddBarbecue({ isOpen, onClose, onSubmit }: IDialogAddBarbecue) {
  const [form, setForm] = useState<IBarbecue>({
    date: '',
    title: '',
    observation: '',
    total: 0,
    people: [],
  });

  const onChangeFormField = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddPerson = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle>Adicionar churrasco</DialogTitle>
      <DialogContent>
        <DialogForm onSubmit={handleAddPerson}>
          <FormDiv>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
                <DatePicker
                  label="Data do churrasco"
                  onChange={(value: any) => onChangeFormField('date', dayjs(value.$d).format('DD/MM/YY'))}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              label="Nome"
              type="Titulo"
              variant="outlined"
              onChange={(e) => onChangeFormField('title', e.target.value)}
            />
          </FormDiv>
          <FormDiv>
            <TextField
              required
              rows={4}
              multiline
              fullWidth
              label="Observação"
              variant="outlined"
              onChange={(e) => onChangeFormField('observation', e.target.value)}
            />
          </FormDiv>

          <div>
            <DialogActions>
              <Button onClick={onClose}>Cancelar</Button>
              <Button type="submit" variant="contained">
                Adicionar
              </Button>
            </DialogActions>
          </div>
        </DialogForm>
      </DialogContent>
    </Dialog>
  );
}
