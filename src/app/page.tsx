import { TableView } from '../components';

export default function HomePage() {
  return (
    <section>
      <div className='w-full text-center mb-10'>
        <h1 className='text-accent'>Aerokod Sheets</h1>
      </div>
      <TableView />
    </section>
  );
}
