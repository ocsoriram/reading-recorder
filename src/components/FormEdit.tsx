'use client';

import { addReview, removeReview } from '../lib/actions';

export default function FormEdit({
  src: { id, read, memo },
}: {
  src: { id: string; read: string; memo: string };
}) {
  return (
    <form action={addReview}>
      {/* 書籍情報の編集フォーム */}
      {/* 書籍IDは隠しフィールドとして保持 */}
      <input type='hidden' name='id' defaultValue={id} />
      <div className='mb-3'>
        <label htmlFor='read' className='font-bold'>
          読了日：
        </label>
        <input
          type='date'
          id='read'
          name='read'
          className='block bg-gray-100 boader-2 border-gray-600 rounded focus:bg-white focus:outline-none focus:border-red-500'
          defaultValue={read}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='memo' className='font-bold'>
          感想：
        </label>
        <textarea
          name='memo'
          id='memo'
          rows={3}
          className='block bg-gray-100 border-2 border-gray-600 w-full rounded focus:bg-white focus:outline-none focus:border-red-500'
          defaultValue={memo}
        ></textarea>
      </div>
      <button
        type='submit'
        className='bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-blue-500'
      >
        登録
      </button>
      <button
        type='submit'
        className='bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-red-500'
        formAction={removeReview}
      >
        削除
      </button>
    </form>
  );
}
