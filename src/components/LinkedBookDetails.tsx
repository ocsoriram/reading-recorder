import Link from 'next/link';
import type { BookDetailsProps } from '../types/common';
import BookDetails from './BookDetails';

export default function LinkedBookDetails({ index, book }: BookDetailsProps) {
  //BookDetailsコンポーネントにリンクを付与
  return (
    <Link href={`edit/${book.id}`}>
      <div className='hover:bg-green-300 dark:hover:bg-green-900 transition-colors duration-900'>
        <BookDetails index={index} book={book} />
      </div>
    </Link>
  );
}
