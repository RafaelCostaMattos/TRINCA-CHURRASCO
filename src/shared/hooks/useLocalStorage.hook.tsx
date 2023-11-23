import { useEffect, useState } from 'react';
import { initList } from '../constants/list.constant';
import { EList } from '../enums/list.enum';
import { IBarbecue, IPerson } from '../interfaces/list.inteface';

export function useLocalStorageBarbecue<T>() {
  const [list, setList] = useState<IBarbecue[]>(initList);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let value = localStorage.getItem(EList.LOCALSTORAGE);
    if (value) {
      setList(JSON.parse(value));
    }
  }, [window]);

  const getBarbecueListByIndex = (index: number): IBarbecue | undefined => {
    if (typeof list[index] === 'undefined') return;

    const barbecue = list[index];

    return {
      ...barbecue,
      suggestedValueWithAhcool: isNaN(suggestedValueAhcool(barbecue.people, true))
        ? 0
        : suggestedValueAhcool(barbecue.people, true),
      suggestedValueWithoutAhcool: isNaN(suggestedValueAhcool(barbecue.people, false))
        ? 0
        : suggestedValueAhcool(barbecue.people, false),
    };
  };

  const suggestedValueAhcool = (p: IPerson[] | undefined, withAhcool: boolean): number => {
    if (!p) return 0;

    const people = p.filter(
      (data: IPerson) => (withAhcool ? data.alcoholicDrink : !data.alcoholicDrink) && !data.confirmed
    );

    const total = people.reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0);

    return total / people.length ?? 0;
  };

  const updateBarbecueLocalStorage = (barbecue: IBarbecue): void => {
    barbecue.total = barbecue.people
      .filter((data) => !data.confirmed)
      .reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0);

    let newList = list.map((data) => {
      if (data.title === barbecue.title) {
        return barbecue;
      }
      return data;
    });

    setList(newList);
    localStorage.setItem(EList.LOCALSTORAGE, JSON.stringify(newList));
  };

  const addNewBarbecueLocalStorage = (barbecue: IBarbecue): void => {
    setList([...list, barbecue]);
    localStorage.setItem(EList.LOCALSTORAGE, JSON.stringify([...list, barbecue]));
  };

  return {
    list,
    updateBarbecueLocalStorage,
    getBarbecueListByIndex,
    addNewBarbecueLocalStorage,
  };
}
