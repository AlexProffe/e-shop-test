export interface Product {
  title: string;
  description: string;
  count: number;
  price: number;
  id?: string;
  image?: string;
  sale?: number;
  options?: [];
  date?: Date;
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  collectionName?: string;
  products?: Product[];
  total?: number;
}
