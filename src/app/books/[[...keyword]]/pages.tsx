import LinkedBookDetails from '../../components/LinkedBookDetails';
import { getBooksByKeyword } from '../../lib/getter';

//ルートパタメータkeywordを取得。規定値はReact
export default function BookResult({ params: { keyword = 'React' } }) {
  //与えられたキーワードで書籍情報を検索
  const books = await getBooksByKeyword(keyword);

  return (
    <>
      {books.map((b, i) => (
        <LinkedBookDetails book={b} index={i + 1} key={b.id} />
      ))}
    </>
  );
}
