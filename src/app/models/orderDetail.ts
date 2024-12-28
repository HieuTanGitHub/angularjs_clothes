  import { Product } from './product';

  export interface OrderDetailType {
    orderId: string;
    productId: string;
    productPrice: number;
    productName: string;
    quantity: number;
    product?: Product;
  }
