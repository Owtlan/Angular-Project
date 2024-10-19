export interface Order {
  userId: string;
  items: any[]; // Списък с игри
  total: number; // Общата сума на поръчката
  street: string;
  phone: string;
  name: string;
  email: string;
  createdAt: Date;
  }
  