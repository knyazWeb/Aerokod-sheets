'use client';
import { useEffect, useMemo, useState } from 'react';
import { Cell } from '../Cell/Cell';
import { TableProps } from './TableTypes';
import { Button } from '../Button/Button';
import { useAppDispatch } from '@@/src/lib';
import { deleteColumns, deleteRows } from '@@/src/lib/features';
import { cn } from '@@/src/helpers';
import toast from 'react-hot-toast';

const Table = ({
  tableData,
  isColDeleteMode = false,
  isRowDeleteMode = false,
}: TableProps) => {
  const { rows, columns, data } = tableData;
  console.log(tableData);
  const dispatch = useAppDispatch();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);

  const isShowApplyButton = useMemo(() => {
    return Boolean(selectedColumns.length || selectedRows.length);
  }, [selectedColumns, selectedRows]);

  const deleteHandler = () => {
    if (selectedRows.length > 0) {
      dispatch(deleteRows({ rows: selectedRows }));
      setSelectedRows([]);
    }
    if (selectedColumns.length > 0) {
      dispatch(deleteColumns({ columns: selectedColumns }));
      setSelectedColumns([]);
    }

    toast.success('Строки/колонки успешно удалены');
  };

  useEffect(() => {
    if (!isColDeleteMode) {
      setSelectedColumns([]);
    }
    if (!isRowDeleteMode) {
      setSelectedRows([]);
    }
  }, [isColDeleteMode, isRowDeleteMode]);

  return (
    <div className='w-fit overflow-auto'>
      {isShowApplyButton && (
        <div className='w-full flex justify-center mb-5 fixed left-1/2 -translate-x-1/2 top-16'>
          <Button
            onClick={deleteHandler}
            className='text-base px-3 py-1 bg-red-500'
          >
            Применить
          </Button>
        </div>
      )}
      <div
        className={cn(
          'grid border border-black overflow-hidden',
          data.length === 0 ? 'hidden' : '',
        )}
        style={{
          gridTemplateColumns: `repeat(${columns}, 100px)`,
          gridTemplateRows: `repeat(${rows}, 60px)`,
        }}
      >
        {data.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            return (
              <Cell
                isColDeleteMode={isColDeleteMode}
                isRowDeleteMode={isRowDeleteMode}
                setSelectedRows={setSelectedRows}
                setSelectedColumns={setSelectedColumns}
                backgroundColor={cell.backgroundColor}
                key={`${rowIndex}-${colIndex}-${cell.backgroundColor}-${cell.value}`}
                row={rowIndex}
                col={colIndex}
                selected={
                  selectedRows.includes(rowIndex) || selectedColumns.includes(colIndex)
                }
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export { Table };
