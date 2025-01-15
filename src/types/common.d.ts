// ... 既存のVolume型の定義 ...

// UIコンポーネント用に拡張したBook型
export type BookWithReview = {
  id: string;
  title: string;
  author: string;
  price: number;
  publisher: string | undefined;
  published: string | undefined;
  image: string;
  memo?: string;
  read?: Date;
};

// BookDetailsコンポーネントの型定義
export type BookDetailsProps = {
  index?: number;
  book: BookWithReview;
};
