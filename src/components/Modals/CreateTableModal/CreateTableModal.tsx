'use client';

import { useAppDispatch } from '@@/src/lib';
import { Button, Input, ModalContainer } from '../..';
import { CreateTableModalProps } from './CreateTableModalTypes';
import { useState } from 'react';
import { createTable } from '@/lib/features';
import { useRouter } from 'next/navigation';
import { saveTableToLocalStorage } from '@@/src/helpers';

const CreateTableModal = ({ onClose }: CreateTableModalProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [nameValue, setNameValue] = useState<string>('');
  const [colsValue, setColsValue] = useState<string>('5');
  const [rowsValue, setRowsValue] = useState<string>('5');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rows = parseInt(rowsValue);
    const cols = parseInt(colsValue);

    const table = {
      rows,
      columns: cols,
      name: nameValue,
      data: Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          value: '',
          backgroundColor: '#ffffff',
        })),
      ),
    };
    dispatch(createTable(table));
    saveTableToLocalStorage(table);

    onClose();
    router.push('/table');
  };

  return (
    <ModalContainer onClose={onClose}>
      <div className='w-[500px] h-[300px] p-5 rounded-[20px] bg-white'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 items-center'
        >
          <Input
            value={nameValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNameValue(e.target.value)
            }
            type='text'
            placeholder='Введите название таблицы'
            required
          />
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
            disabled={!rowsValue || !colsValue || !nameValue}
            type='submit'
          >
            Создать
          </Button>
        </form>
      </div>
    </ModalContainer>
  );
};

export { CreateTableModal };
