import LinkedBookDetails from '../../../components/LinkedBookDetails';
import { getBooksByKeyword } from '../../../lib/getter';

type SearchParams = { keyword?: string[] };

export default async function BookResult({ params }: { params: SearchParams }) {
  const searchParams = await params;
  const keyword = searchParams.keyword?.[0] || 'React';

  const books = await getBooksByKeyword(keyword);

  return (
    <>
      {books.map((b, i) => (
        <LinkedBookDetails book={b} index={i} key={b.id} />
      ))}
    </>
  );
}
