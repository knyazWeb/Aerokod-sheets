'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <h2>Something went wrong!</h2>
      <button
        className='text-accent font-bold text-xl hover:brightness-90 duration-200 ease-in-out transition-all'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
