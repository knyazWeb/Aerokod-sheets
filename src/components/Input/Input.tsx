import { InputProps } from './InputTypes';

const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className='w-full h-12 border border-accent rounded-[10px] p-3 active:outline-none focus:outline-none focus:border-red-500'
      {...props}
    />
  );
};

export { Input };
