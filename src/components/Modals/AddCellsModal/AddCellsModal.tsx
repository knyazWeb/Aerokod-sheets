'use client';

import { useState } from 'react';
import { ModalContainer } from '../../ModalContainer/ModalContainer';
import { AddCellsModalProps } from './AddCellsModalTypes';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { useAppDispatch } from '@@/src/lib';
import { addColumns, addRows } from '@@/src/lib/features';

const AddCellsModal = ({ onClose }: AddCellsModalProps) => {
  const dispatch = useAppDispatch();
  const [colsValue, setColsValue] = useState<string>('');
  const [rowsValue, setRowsValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rows = parseInt(rowsValue);
    const cols = parseInt(colsValue);

    dispatch(addRows({ rows }));
    dispatch(addColumns({ columns: cols }));
    onClose();
  };

  return (
    <ModalContainer onClose={onClose}>
      <div className='w-[500px] h-fit p-5 rounded-[20px] bg-white'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 items-center'
        >
          <Input
            value={rowsValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRowsValue(e.target.value)
            }
            type='number'
            placeholder='Кол-во строк'
            required
          />
          <Input
            value={colsValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setColsValue(e.target.value)
            }
            type='number'
            placeholder='Кол-во столбцов'
            required
          />
          <Button
            disabled={!rowsValue || !colsValue}
            type='submit'
          >
            Создать
          </Button>
        </form>
      </div>
    </ModalContainer>
  );
};

export { AddCellsModal };
