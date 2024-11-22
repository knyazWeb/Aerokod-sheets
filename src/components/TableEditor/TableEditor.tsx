'use client';

import { useAppSelector } from '@@/src/lib';
import { Table } from '../Table/Table';
import { Button } from '../Button/Button';
import { useState } from 'react';
import { AddCellsModal } from '../Modals/AddCellsModal/AddCellsModal';
import { saveTableToLocalStorage } from '@@/src/helpers';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { File } from 'lucide-react';

const TableEditor = () => {
  const router = useRouter();
  const tableData = useAppSelector((state) => state.table.table);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRowDeleteMode, setIsRowDeleteMode] = useState<boolean>(false);
  const [isColDeleteMode, setIsColDeleteMode] = useState<boolean>(false);

  const handleRowDeleteMode = () => {
    setIsColDeleteMode(false);
    setIsRowDeleteMode((prev) => !prev);
  };

  const handleColDeleteMode = () => {
    setIsRowDeleteMode(false);
    setIsColDeleteMode((prev) => !prev);
  };

  const handleSaveTable = () => {
    saveTableToLocalStorage(tableData);
  };

  const addHandler = () => {
    setIsModalOpen(true);
  };

  const modalAddHandler = () => {
    setIsModalOpen(false);
    toast.success('Колонки/строки успешно добавлены');
  };

  const saveHandler = () => {
    handleSaveTable();
    toast.success('Таблица успешно сохранена');
  };

  const exitHandler = () => {
    router.push('/');
  };

  return (
    <>
      <div className='fixed top-0 left-0 z-50 mt-5 ml-[50px] w-full flex justify-start items-center gap-5'>
        <div className='t2 flex items-center gap-2'>
          <File size={30} />
          {tableData.name}
        </div>
        <Button
          onClick={handleRowDeleteMode}
          className='text-base py-1 px-3'
        >
          {isRowDeleteMode
            ? 'Выход из режима удаления строки'
            : 'Включить режим удаления строки'}
        </Button>
        <Button
          onClick={handleColDeleteMode}
          className='text-base py-1 px-3'
        >
          {isColDeleteMode
            ? 'Выход из режима удаления столбца'
            : 'Включить режим удаления столбца'}
        </Button>
        <Button
          onClick={addHandler}
          className='text-base py-1 px-3'
        >
          Добавить колонки/столбцы
        </Button>
        <Button
          onClick={saveHandler}
          className='text-base py-1 px-3'
        >
          Сохранить
        </Button>
        <Button
          onClick={exitHandler}
          className='text-base py-1 px-3'
        >
          Выйти
        </Button>
      </div>
      <div className='pt-[100px] pl-[50px] w-[90vw] overflow-auto'>
        <Table
          isColDeleteMode={isColDeleteMode}
          isRowDeleteMode={isRowDeleteMode}
          tableData={tableData}
        />
      </div>
      {isModalOpen && <AddCellsModal onClose={modalAddHandler} />}
    </>
  );
};

export { TableEditor };
