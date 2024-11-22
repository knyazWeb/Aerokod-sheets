'use client';

import { loadTablesFromLocalStorage } from '@@/src/helpers/LocalStorage/loadTablesFromLocalStorage';
import style from './TableView.module.css';
import { cn } from '@@/src/helpers';
import { TableViewCard } from '../TableViewCard/TableViewCard';
import { Table } from '@@/src/lib/features/table/tableTypes';
import { useEffect, useState } from 'react';

const TableView = () => {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    const tables = loadTablesFromLocalStorage();
    setTables(tables);
  }, []);

  return (
    <div className={cn('w-[80vw] mx-auto ', style.container)}>
      <TableViewCard isEmpty={true} />
      {tables.map((item, index) => {
        return (
          <TableViewCard
            isEmpty={false}
            key={index}
            name={item.name}
            tableData={item}
          />
        );
      })}
    </div>
  );
};

export { TableView };
