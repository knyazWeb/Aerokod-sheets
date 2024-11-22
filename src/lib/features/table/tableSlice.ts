import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, initialState } from './tableTypes';

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    createTable: (
      state,
      action: PayloadAction<{
        rows: number;
        columns: number;
        name: string;
        data: Cell[][];
      }>,
    ) => {
      const { rows, columns, name, data } = action.payload;

      state.table.rows = rows;
      state.table.columns = columns;
      state.table.name = name;

      state.table.data = data;
    },
    addRows: (state, action: PayloadAction<{ rows: number }>) => {
      const { rows } = action.payload;

      for (let i = 0; i < rows; i++) {
        state.table.data.push(
          Array.from({ length: state.table.columns }, () => ({
            value: '',
            backgroundColor: '#ffffff',
          })),
        );
      }

      state.table.rows += rows;
    },
    addColumns: (state, action: PayloadAction<{ columns: number }>) => {
      const { columns } = action.payload;

      state.table.data.forEach((row) => {
        for (let i = 0; i < columns; i++) {
          row.push({
            value: '',
            backgroundColor: '#ffffff',
          });
        }
      });

      state.table.columns += columns;
    },
    deleteRows: (state, action: PayloadAction<{ rows: number[] }>) => {
      const { rows } = action.payload;

      state.table.data = state.table.data.filter(
        (_, rowIndex) => !rows.includes(rowIndex),
      );
      state.table.data = state.table.data.filter((row) => row.length > 0);
      state.table.rows = state.table.data.length;
    },
    deleteColumns: (state, action: PayloadAction<{ columns: number[] }>) => {
      const { columns } = action.payload;

      state.table.data = state.table.data.map((row) =>
        row.filter((_, colIndex) => !columns.includes(colIndex)),
      );
      state.table.data = state.table.data.filter((row) => row.length > 0);
      state.table.columns = state.table.data[0]?.length || 0;
      state.table.rows = state.table.data.length;
    },
    updateCell: (
      state,
      action: PayloadAction<{
        row: number;
        col: number;
        value: string;
        backgroundColor: string;
      }>,
    ) => {
      const { row, col, value, backgroundColor } = action.payload;

      state.table.data[row][col].value = value;
      state.table.data[row][col].backgroundColor = backgroundColor;
    },
  },
});

export const { createTable, addColumns, addRows, deleteColumns, deleteRows, updateCell } =
  tableSlice.actions;

export default tableSlice.reducer;
