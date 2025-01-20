'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinkedBookDetails from '../../../components/LinkedBookDetails';
import { BookWithReview } from '../../../types/common';

type BookRouteParams = { keyword?: string[] };

export default function BookResult({ params }: { params: BookRouteParams }) {
  const [books, setBooks] = useState<BookWithReview[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const keyword = params.keyword?.[0] || 'React';

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `/api?keyword=${keyword}&page=${page}&limit=10`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setBooks((prevBooks) => [...prevBooks, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('書籍の取得に失敗しました:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [keyword]);

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchBooks}
      hasMore={hasMore}
      loader={
        <div className='flex justify-center'>
          <div className='animate-spin h-10 w-10 mt-5 border-4 border-blue-500 rounded-full border-t-transparent'></div>
        </div>
      }
      endMessage={
        <p className='text-center mt-4 text-gray-500'>
          すべての書籍を表示しました
        </p>
      }
    >
      {books.map((b, i) => (
        <LinkedBookDetails book={b} index={i} key={b.id} />
      ))}
    </InfiniteScroll>
  );
}
