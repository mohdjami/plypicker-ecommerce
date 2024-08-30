export interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  department: string;
}

export interface ProductsProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  category: string;
  search: string;
}
export interface User {
  _id: string;
  email: string;
  roles: string[];
}

export interface UserResponse {
  user: User;
}

export interface IRequests {
  _id: string;
  submissionId: {
    _id: string;
    productId: string;
    userId: string;
    updatedFields: {
      name: string;
    };
    status: string;
    createdAt: string;
    __v: number;
  };
  status: string;
  __v: number;
}
