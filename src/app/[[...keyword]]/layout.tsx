'use client';

import { useRouter } from "next/router";
import { useRef } from "react";

//「/books/keyword」配下に適用されるレイアウト
export default function BooksLayout ({ children }) {
  const router = useRouter();
  const txtKeyword = useRef(null);
  //[検索]ボタンクリック時に「books/keyword」へリダイレクト
  const handleSearch = () => {
    router.push(`/books/${txtKeyword.current.value}`);
  } ;

  return (
    <>
    <form className="mt-2 mt-4">
      <input type="text" ref={txtKeyword} className="bg-gray-1000 text-black border border-gray-600 rounded mr-2 px-2 py-2 focus:bg-white focus:outline-none focus-border-red-500" />
      <button type="button" onClick={handleSearch} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blur-500">検索</button>
    </form>
    <hr />
    </>
  );
}