export interface Image {
  id: string;
  url: string;
}
export interface Product {
  _id: string;
  name: string;
  price: number;

  images: Image[];
}
