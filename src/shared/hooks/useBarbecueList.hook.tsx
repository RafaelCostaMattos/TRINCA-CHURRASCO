import { useEffect, useState } from 'react';
import { EList } from '../enums/list.enum';
import { IBarbecue } from '../interfaces/list.inteface';

export function useBarbecueList<T>(initList: IBarbecue[]) {
  const [list, setList] = useState<IBarbecue[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let value = localStorage.getItem(EList.LOCALSTORAGE);
    if (value) {
      setList(JSON.parse(value));
    } else {
      setList(initList);
      localStorage.setItem(EList.LOCALSTORAGE, JSON.stringify(initList));
    }
    setLoading(false);
  }, []);

  const updateBarbecueLocalStorage = (newList: IBarbecue[]): void => {
    setList(newList);
    localStorage.setItem(EList.LOCALSTORAGE, JSON.stringify(newList));
  };

  return {
    list,
    loading,
    updateBarbecueLocalStorage,
  };
}
