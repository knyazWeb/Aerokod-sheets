export type Cell = {
  value: string;
  backgroundColor?: string;
};

export type Data = Cell[][];

export type Table = {
  rows: number;
  columns: number;
  data: Data;
  name: string;
};

export interface TableState {
  table: Table;
}

export const initialState: TableState = {
  table: {
    rows: 0,
    columns: 0,
    data: [],
    name: '',
  },
};
