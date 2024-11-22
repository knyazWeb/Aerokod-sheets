import { Table } from '@@/src/lib/features/table/tableTypes';

export type TableProps = {
  tableData: Table;
  isRowDeleteMode?: boolean;
  isColDeleteMode?: boolean;
};
