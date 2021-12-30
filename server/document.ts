export interface IDocument<T = any> {
  _id: string;
  name: string;
  content: T;
  cover: string;
}

export type DocumentModel = Omit<IDocument, "_id">;
