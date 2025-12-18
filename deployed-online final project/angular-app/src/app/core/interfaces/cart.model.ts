export interface Cart {
  _id: string;
  userId: any;
  products: [
    {
      productId: any;
      quantity: number;
    }
  ];
  totalPrice: number;
}
