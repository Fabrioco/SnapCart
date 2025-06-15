import { AddressType } from "./addressType";
import { ProductType } from "./productType";
import { UserType } from "./userType";

export type OrderType = {
  id: number;
  userId: number;
  addressId: number;
  paymentId: string;
  total: number;
  orderStatus: string;
  createdAt: string;
  items: [
    {
      id: number;
      productId: number;
      quantity: number;
      price: number;
      orderId: number;
    }
  ];
};

export type OrderUserAddress = OrderType & {
  user: UserType;
  address: AddressType;
  products: ProductType[];
};
