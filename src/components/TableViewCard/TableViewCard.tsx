'use client';
import { Plus } from 'lucide-react';
import { TableViewCardProps } from './TableViewCardTypes';
import { cn } from '@@/src/helpers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateTableModal } from '../Modals/CreateTableModal/CreateTableModal';
import { useAppDispatch } from '@@/src/lib';
import { createTable } from '@@/src/lib/features';

const TableViewCard = ({
  isEmpty = true,
  name = 'Пустая таблица',
  tableData,
}: TableViewCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const cardClickHandler = () => {
    if (isEmpty) {
      setIsModalOpen(true);
    } else {
      tableData && dispatch(createTable(tableData));
      router.push('/table');
    }
  };

  return (
    <>
      <div className='w-fit'>
        <div
          onClick={cardClickHandler}
          className={cn(
            'w-[130px] h-[170px] border border-accent rounded-[20px] flex justify-center bg-slate-200 p-3 hover:brightness-95 cursor-pointer transition-all ease-in-out duration-300 group',
            isEmpty ? 'items-center' : 'items-start',
          )}
        >
          {isEmpty ? (
            <Plus
              className='group-hover:scale-125 transition-all ease-in-out duration-300'
              size={50}
              color='orange'
            />
          ) : (
            <div className='text-accent'>Sheet</div>
          )}
        </div>
        <div className='mt-2'>
          {isEmpty ? (
            <div className='w-full text-center text-accent font-bold'>Пустая таблица</div>
          ) : (
            <div className='w-full text-center text-accent font-bold'>{name}</div>
          )}
        </div>
      </div>
      {isModalOpen && <CreateTableModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export { TableViewCard };
