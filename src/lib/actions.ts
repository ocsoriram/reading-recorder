'use server';

import { redirect } from 'next/navigation';
import { getBookById } from './getter';
import prisma from './prisma';

export async function addReview(data: FormData) {
  const bookId = data.get('id')?.toString();
  if (!bookId) throw new Error('Book ID is required');

  const book = await getBookById(bookId);
  const input = {
    title: book.title,
    author: book.author,
    price: Number(book.price),
    publisher: book.publisher || '',
    published: book.published || '',
    image: book.image,
    read: new Date(data.get('read')?.toString() || new Date().toISOString()),
    memo: data.get('memo')?.toString() || '',
  };

  //新規データであれば登録。既存データなら更新。
  await prisma.reviews.upsert({
    update: input,
    create: { ...input, id: bookId },
    where: { id: bookId },
  });

  redirect('/');
}

export async function removeReview(data: FormData) {
  const id = data.get('id')?.toString();
  if (!id) throw new Error('ID is required');

  await prisma.reviews.delete({
    where: { id },
  });
  redirect('/');
}
