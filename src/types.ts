export type Destination = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: "hotel" | "tour" | "flight";
};

export type Service = {
  icon: string;
  title: string;
  description: string;
};
