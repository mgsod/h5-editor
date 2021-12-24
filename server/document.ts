export interface IDocument {
  _id: string;
  name: string;
  content: string;
}

export type DocumentModel = Omit<IDocument, "_id">;
