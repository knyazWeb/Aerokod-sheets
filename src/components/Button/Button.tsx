'use client';

import { cn } from '@@/src/helpers';
import { ButtonProps } from './ButtonTypes';

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'w-fit px-7 py-2 flex font-bold justify-center items-center text-white bg-accent rounded-[15px] hover:bg-opacity-90 disabled:bg-slate-400 duration-200 ease-in-out transition-all cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
