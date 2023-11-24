import { useEffect, useState } from 'react';
import { EList } from '../enums/list.enum';
import { IBarbecue } from '../interfaces/list.inteface';

export function useBarbecueList<T>(initList: IBarbecue[]) {
  const [list, setList] = useState<IBarbecue[]>(initList);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let value = localStorage.getItem(EList.LOCALSTORAGE);
    if (value) {
      setList(JSON.parse(value));
    } else {
      localStorage.setItem(EList.LOCALSTORAGE, JSON.stringify(initList));
    }
  }, [window]);

  const updateBarbecueLocalStorage = (newList: IBarbecue[]): void => {
    setList(newList);
    localStorage.setItem(EList.LOCALSTORAGE, JSON.stringify(newList));
  };

  return {
    list,
    updateBarbecueLocalStorage,
  };
}
