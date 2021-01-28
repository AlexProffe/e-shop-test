import { Product } from './Product';

export interface Wishlist {
  uid?: string;
  items?: Product[];
  id?: string;
}
