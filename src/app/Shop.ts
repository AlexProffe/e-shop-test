import { Product } from './Product';

export interface Shop {
  cart: Product[];
  id?: string;
  status: string;
  userID: string;
}
