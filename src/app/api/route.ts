import { getBooksByKeyword } from '@/lib/getter';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword') || 'React';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const books = await getBooksByKeyword(keyword, page, limit);
    return Response.json(books);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
