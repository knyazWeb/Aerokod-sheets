import { Table } from '@@/src/lib/features/table/tableTypes';

export const loadTablesFromLocalStorage = (): Table[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  return JSON.parse(localStorage.getItem('tables') || '[]');
};
