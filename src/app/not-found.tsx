import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className='text-accent font-bold text-xl hover:brightness-90 duration-200 ease-in-out transition-all' href='/'>Return Home</Link>
    </div>
  );
}
