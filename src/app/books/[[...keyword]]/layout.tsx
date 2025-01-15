'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

//「/books/keyword」配下に適用されるレイアウト
export default function BooksLayout({ children }: LayoutProps) {
  const router = useRouter();
  const txtKeyword = useRef<HTMLInputElement>(null);
  //[検索]ボタンクリック時に「books/keyword」へリダイレクト
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = txtKeyword.current?.value;
    if (keyword) {
      console.log('Navigating to:', `/books/${keyword}`); // デバッグログ
      router.push(`/books/${keyword}`);
    }
  };

  return (
    <>
      <form className='mt-2 mb-4' onSubmit={handleSubmit}>
        <input
          type='text'
          ref={txtKeyword}
          className='bg-gray-100 text-black border border-gray-600 rounded mr-2 px-2 py-2 focus:bg-white focus:outline-none focus:border-red-500'
        />
        <button
          type='submit'
          className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500'
        >
          検索
        </button>
      </form>
      <hr />
      {children}
    </>
  );
}
