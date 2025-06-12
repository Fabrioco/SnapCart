import { AddressType } from "./addressType";
import { UserType } from "./userType";

export type OrderType = {
  id: number;
  userId: number;
  addressId: number;
  paymentId: string;
  total: number;
  orderStatus: string;
  createdAt: string;
};

export type OrderUserAddress = OrderType & {
  user: UserType;
  address: AddressType;
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
