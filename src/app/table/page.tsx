'use client';
import { TableEditor } from '@@/src/components/TableEditor/TableEditor';
import { useAppSelector } from '@@/src/lib';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function TablePage() {
  const tableData = useAppSelector((state) => state.table.table);
  const router = useRouter();

  useEffect(() => {
    if (!tableData.name && !tableData.data.length) {
      router.push('/');
    }
  }, [tableData, router]);

  if (!tableData.name && !tableData.data.length) {
    return null;
  }
  return (
    <section>
      <Toaster position='bottom-right' />
      <TableEditor />
    </section>
  );
}
