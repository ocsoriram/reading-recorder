import prisma from "./prisma";



export async function getAllReviews() {
  //読了日降順で取得
  try {
    const reviews = await prisma.reviews.findMany({
      orderBy: { read: 'desc' },
    });
    return reviews;
  } catch (error) {
    console.error("Prisma Error:", error);
    throw new Error("Failed to fetch reviews");
  }
}


//API経由で取得した書籍情報から必要な情報だけをオブジェクトに詰め替える
export function createBook(book) {
  const authors = book.volumeInfo.authors;
  const price = book.saleInfo.listPrice;
  const img = book.volumeInfo.imageLinks;
  return {
    id: book.id,
    title: book.volumeInfo.title,
    author: authors ? authors.join(',') :  '',
    price: price ? price.amount : 0,
    publisher: book.volumeInfo.publisher,
    pulished: book.volumeInfo.publishedDate,
    image: img ? img.smallThumbnail : '/vercel.svg',
  };
}

//引数keywordをキーにGoogle Books APIから書籍情報を検索する
export async function getBookByKeyword(keyword:string) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`);
  const result = await res.json();
  const books = [];
  //応答内容をオブジェクト配列に詰め替え
  for (const b of result.items) {
    books.push(createBook(b));
  }
  return books;
}