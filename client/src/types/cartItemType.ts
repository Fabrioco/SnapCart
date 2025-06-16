import { ProductType } from "./productType";

export type CartItemType = {
  id: number;
  productId: number;
  quantity: number;
  userId: number;
};

export type CartItemTypeWithProduct = CartItemType & {
  product: ProductType;
};
