import { Dispatch } from 'react';

export type CellProps = {
  col: number;
  row: number;
  backgroundColor?: string;
  isRowDeleteMode?: boolean;
  isColDeleteMode?: boolean;
  setSelectedRows?: Dispatch<React.SetStateAction<number[]>>;
  setSelectedColumns?: Dispatch<React.SetStateAction<number[]>>;
  selected?: boolean;
};
