import type { GoogleBooksApiResponse } from '../types/api/googlebooks';
import { Volume } from '../types/api/googlebooks';
import type { BookWithReview } from '../types/common';
import prisma from './prisma';

export async function getAllReviews() {
  //読了日降順で取得
  try {
    const reviews = await prisma.reviews.findMany({
      orderBy: { read: 'desc' },
    });
    return reviews;
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to fetch reviews');
  }
}

//API経由で取得した書籍情報から必要な情報だけをオブジェクトに詰め替える
export function createBook(book: Volume) {
  const authors = book.volumeInfo?.authors || [];
  const price = book.saleInfo?.listPrice;
  const img = book.volumeInfo?.imageLinks;
  return {
    id: book.id,
    title: book.volumeInfo.title,
    author: authors ? authors.join(',') : '',
    price: price ? price.amount : 0,
    publisher: book.volumeInfo.publisher,
    published: book.volumeInfo.publishedDate,
    image: img ? img.smallThumbnail : '/vercel.svg',
  };
}

//引数keywordをキーにGoogle Books APIから書籍情報を検索する
export async function getBooksByKeyword(
  keyword: string
): Promise<BookWithReview[]> {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books&key=${apiKey}`
  );
  const result = (await res.json()) as GoogleBooksApiResponse;
  return (result.items || []).map((b) => createBook(b));
}

export async function getBookById(id: string) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  const result = await res.json();
  return createBook(result);
}

export async function getReviewById(id: string) {
  return await prisma.reviews.findUnique({
    where: {
      id,
    },
  });
}
