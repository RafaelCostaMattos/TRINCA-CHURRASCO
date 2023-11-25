import { useEffect, useState } from 'react';
import { IBarbecue, IPerson } from '../interfaces/list.inteface';
import { EList } from '../enums/list.enum';

export function useBarbecueById<T>(index: number) {
  const [list, setList] = useState<IBarbecue[]>([]);
  const [barbecue, setBarbecue] = useState<IBarbecue>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let value = localStorage.getItem(EList.LOCALSTORAGE);
    if (value && JSON.parse(value)[index]) {
      setList(JSON.parse(value));
      getBarbecueListByIndex(JSON.parse(value)[index]);
    }
    setLoading(false);
  }, [window]);

  const updateBarbecueIndexLocalStorage = (barbecue: IBarbecue): void => {
    const newList = list.map((data, i) => (i === index ? barbecue : data));
    setList(newList);
    getBarbecueListByIndex(barbecue);

    localStorage.setItem(EList.LOCALSTORAGE, JSON.stringify(newList));
  };

  const getBarbecueListByIndex = (barbecue: IBarbecue): IBarbecue | undefined => {
    if (typeof barbecue === 'undefined') return;

    setBarbecue({
      ...barbecue,
      suggestedValueWithAhcool: isNaN(suggestedValueAhcool(barbecue.people, true))
        ? 0
        : suggestedValueAhcool(barbecue.people, true),
      suggestedValueWithoutAhcool: isNaN(suggestedValueAhcool(barbecue.people, false))
        ? 0
        : suggestedValueAhcool(barbecue.people, false),
    });
  };

  const suggestedValueAhcool = (p: IPerson[] | undefined, withAhcool: boolean): number => {
    if (!p) return 0;

    const people = p.filter(
      (data: IPerson) => (withAhcool ? data.alcoholicDrink : !data.alcoholicDrink) && !data.confirmed
    );

    const total = people.reduce((accumulator: number, data: IPerson) => accumulator + data.value, 0);

    return total / people.length;
  };

  return {
    loading,
    barbecue,
    updateBarbecueIndexLocalStorage,
  };
}
