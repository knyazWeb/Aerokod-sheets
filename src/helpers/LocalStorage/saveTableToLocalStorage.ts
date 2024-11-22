import { Table } from '@@/src/lib/features/table/tableTypes';

export const saveTableToLocalStorage = (table: Table) => {
  const existingTables = JSON.parse(localStorage.getItem('tables') || '[]');

  const tableIndex = existingTables.findIndex((t: Table) => t.name === table.name);

  if (tableIndex !== -1) {
    existingTables[tableIndex] = table;
  } else {
    existingTables.push(table);
  }

  localStorage.setItem('tables', JSON.stringify(existingTables));
};
