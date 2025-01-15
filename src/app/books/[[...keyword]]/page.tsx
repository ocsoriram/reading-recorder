import LinkedBookDetails from '../../../components/LinkedBookDetails';
import { getBooksByKeyword } from '../../../lib/getter';

type BookRouteParams = { keyword?: string[] };

export default async function BookResult({
  params,
}: {
  params: BookRouteParams;
}) {
  const keyword = params.keyword?.[0] || 'React';

  const books = await getBooksByKeyword(keyword);

  return (
    <>
      {books.map((b, i) => (
        <LinkedBookDetails book={b} index={i} key={b.id} />
      ))}
    </>
  );
}
