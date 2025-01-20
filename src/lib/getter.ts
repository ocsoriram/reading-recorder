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
  if (!book?.volumeInfo) {
    throw new Error('無効な書籍データです');
  }

  const authors = book.volumeInfo?.authors || [];
  const price = book.saleInfo?.listPrice;
  const img = book.volumeInfo?.imageLinks;

  return {
    id: book.id || '',
    title: book.volumeInfo.title || '不明なタイトル',
    author: authors.length > 0 ? authors.join(',') : '不明な著者',
    price: price?.amount || 0,
    publisher: book.volumeInfo.publisher || '不明な出版社',
    published: book.volumeInfo.publishedDate || '不明な出版日',
    image: img?.smallThumbnail || '/vercel.svg',
  };
}

//引数keywordをキーにGoogle Books APIから書籍情報を検索する
export async function getBooksByKeyword(
  keyword: string,
  page: number = 1,
  limit: number = 10
): Promise<BookWithReview[]> {
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Books APIキーが設定されていません');
    }

    const startIndex = (page - 1) * limit;
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=${limit}&startIndex=${startIndex}&printType=books&key=${apiKey}`
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Google Books APIエラー詳細:', errorData);
      throw new Error(
        `API エラー: ${res.status} - ${JSON.stringify(errorData)}`
      );
    }

    const result = (await res.json()) as GoogleBooksApiResponse;

    if (!result || !result.items) {
      return [];
    }

    return result.items.map((b) => createBook(b));
  } catch (error) {
    console.error('書籍検索エラー:', error);
    throw new Error('書籍の検索に失敗しました');
  }
}

export async function getBookById(id: string) {
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Books APIキーが設定されていません');
    }

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
    );

    if (!res.ok) {
      throw new Error(`API エラー: ${res.status}`);
    }

    const result = await res.json();

    if (!result || !result.volumeInfo) {
      throw new Error('書籍情報が見つかりませんでした');
    }

    return createBook(result);
  } catch (error) {
    console.error('書籍取得エラー:', error);
    throw new Error('書籍情報の取得に失敗しました');
  }
}

export async function getReviewById(id: string) {
  return await prisma.reviews.findUnique({
    where: {
      id,
    },
  });
}

export async function getReviewsByPage(page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;
    const reviews = await prisma.reviews.findMany({
      orderBy: { read: 'desc' },
      take: limit,
      skip: skip,
    });

    const total = await prisma.reviews.count();

    return {
      reviews,
      hasMore: skip + reviews.length < total,
    };
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to fetch reviews');
  }
}
