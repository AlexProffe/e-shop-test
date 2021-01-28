import { Product } from './Product';

export interface User {
  name?: string;
  displayName?: string;
  photoURL?: string;
  email?: string;
  uid?: string;
  cart?: Product[];
  balance?: number;
}
