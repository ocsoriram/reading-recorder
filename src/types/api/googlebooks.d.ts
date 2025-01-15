export type GoogleBooksApiResponse = {
  kind: string; // レスポンス全体の種類（通常 "books#volumes"）
  totalItems: number; // 検索結果の総数
  items?: Volume[]; // 検索結果の本のリスト（任意）
};

export type Volume = {
  kind: string; // 各アイテムの種類（通常 "books#volume"）
  id: string; // ボリュームの一意の識別子
  etag: string; // エンティティタグ（キャッシュのための識別子）
  selfLink: string; // このリソースを表すURL
  volumeInfo: VolumeInfo; // 本の詳細情報
  saleInfo?: SaleInfo; // 販売情報（任意）
  accessInfo?: AccessInfo; // アクセス情報（任意）
  searchInfo?: SearchInfo; // 検索情報（任意）
};

export type VolumeInfo = {
  title: string; // 本のタイトル
  authors?: string[]; // 著者名の配列（任意）
  publisher?: string; // 出版社名（任意）
  publishedDate?: string; // 発行日（任意）
  description?: string; // 本の説明（任意）
  industryIdentifiers?: IndustryIdentifier[]; // ISBNなどの識別子（任意）
  readingModes?: ReadingModes; // テキストと画像の可用性（任意）
  pageCount?: number; // ページ数（任意）
  printType?: string; // 印刷物の種類（例: "BOOK"）
  categories?: string[]; // カテゴリ（任意）
  averageRating?: number; // 平均評価（任意）
  ratingsCount?: number; // 評価数（任意）
  maturityRating?: string; // 成人向け指定（例: "NOT_MATURE"）
  allowAnonLogging?: boolean; // 匿名ユーザーによるレビューを許可するか（任意）
  contentVersion?: string; // コンテンツのバージョン（任意）
  imageLinks?: ImageLinks; // サムネイル画像などのリンク（任意）
  language?: string; // 本の言語（例: "en"）
  previewLink?: string; // プレビューURL（任意）
  infoLink?: string; // 詳細情報ページのURL（任意）
  canonicalVolumeLink?: string; // 正規化された本のURL（任意）
};

export type IndustryIdentifier = {
  type: string; // 識別子の種類（例: "ISBN_10", "ISBN_13"）
  identifier: string; // 識別子の値
};

export type ReadingModes = {
  text: boolean; // テキストモードが利用可能か
  image: boolean; // 画像モードが利用可能か
};

export type ImageLinks = {
  smallThumbnail: string; // 小サイズのサムネイル画像URL
  thumbnail: string; // サムネイル画像URL
};

export type SaleInfo = {
  country: string; // 販売地域の国コード
  saleability: string; // 販売可能性（例: "FOR_SALE"）
  isEbook: boolean; // 電子書籍かどうか
  listPrice?: Price; // リスト価格（任意）
  retailPrice?: Price; // 小売価格（任意）
  buyLink?: string; // 購入リンク（任意）
  offers?: Offer[]; // 特典情報（任意）
};

export type Price = {
  amount: number; // 金額
  currencyCode: string; // 通貨コード（例: "USD"）
};

export type Offer = {
  finskyOfferType: number; // 特典の種類
  listPrice: Price; // リスト価格
  retailPrice: Price; // 小売価格
};

export type AccessInfo = {
  country: string; // アクセス可能な国コード
  viewability: string; // 閲覧可能性（例: "PARTIAL"）
  embeddable: boolean; // 埋め込み可能かどうか
  publicDomain: boolean; // パブリックドメインかどうか
  textToSpeechPermission: string; // 音声読み上げの許可
  epub?: {
    isAvailable: boolean; // EPUBが利用可能か
    acsTokenLink?: string; // ACSトークンリンク（任意）
  };
  pdf?: {
    isAvailable: boolean; // PDFが利用可能か
    acsTokenLink?: string; // ACSトークンリンク（任意）
  };
  webReaderLink?: string; // ウェブリーダーのリンク（任意）
  accessViewStatus: string; // アクセスビューのステータス
  quoteSharingAllowed: boolean; // 引用共有が許可されているか
};

export type SearchInfo = {
  textSnippet: string; // 検索結果のスニペットテキスト
};
