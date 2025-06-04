export type OrderType = {
    id: number;
    userId: number;
    addressId: number;
    paymentId: string;  
    total: number;
    orderStatus: string;
    createdAt: string;
};