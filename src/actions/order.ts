"use server";

export const createOrder = async (data: {
  grandTotal: number;
  orderNumber: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  addressId: string;
  paymentMethod: string;
}) => {};
