export interface IBarbecue {
  date: string;
  title: string;
  total: number;
  observation?: string;
  people: IPerson[] | [];
  suggestedValueWithAhcool?: number;
  suggestedValueWithoutAhcool?: number;
}

export interface IPerson {
  name: string;
  confirmed: boolean;
  alcoholicDrink: boolean;
  value: number;
}

export interface ILocalStorageHook {
  list: IBarbecue[];
  updateBarbecueLocalStorage: (value: IBarbecue) => void;
  addNewBarbecueLocalStorage: (value: IBarbecue) => void;
  getBarbecueListByIndex: (id: number) => IBarbecue;
}
