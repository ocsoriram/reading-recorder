import LinkedBookDetails from '../components/LinkedBookDetails';
import { getAllReviews } from '../lib/getter';

//ルートセグメントコンフィグ。レイアウト/ページ単位の設定。ページを動的に処理するかを表す情報。
//これにより、レイアウト/ページの個別の設定施せる。
export const dynamic = 'force-dynamic';

export default async function Home() {
  const reviews = await getAllReviews();
  return (
    <>
      {/*取得したレビュー情報を元にリストを作成 */}
      {reviews.map((b, i) => (
        <LinkedBookDetails book={b} index={i} key={b.id} />
      ))}
    </>
  );
}
