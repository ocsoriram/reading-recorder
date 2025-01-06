import { reviews } from "@prisma/client";
import Link from "next/link";
import BookDetails from "./BookDetails";


type BookDetailsProps = {
    index?: number,
    book: reviews,
  };

export default function LinkedBookDetails({index,book}: BookDetailsProps) {
  //BookDetailsコンポーネントにリンクを付与
  return (
    <Link href={`edit/${book.id}`}>
      <div className="hover:bg-green-50">
        <BookDetails index={index} book={book}/>
      </div>
    </Link>
    );
}