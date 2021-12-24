declare interface Product {
  _id: string;
  name: string;
  content: string;
}

declare type ProductModel = Omit<Product, "_id">;
