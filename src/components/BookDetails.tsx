import { reviews } from "@prisma/client";
import Image from 'next/image';

type BookDetailsProps = {
  index?: number; // indexはオプショナル
  book: reviews
};

export default function BookDetails({ index, book }: BookDetailsProps) {
  return (
    <div className="flex w-full mb-4">
      {/* 書影を表示 */}
      <div>
        <Image src={book.image} alt={book.title} width={140} height={180} />
      </div>

      {/* 書籍情報をリスト表示 */}
      <div className="ml-4">
        <ul className="list-none text-black">
          {/* indexが指定された場合に連番を表示 */}
          {index !== undefined && <li>{index + 1}.</li>}
          <li>
            {book.title} ({book.price}円)
          </li>
          <li>{book.author}</li>
          <li>{book.publisher}</li>
          <li>{book.published} 発売</li>
        </ul>
      </div>
    </div>
  );
}