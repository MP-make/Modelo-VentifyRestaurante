// types/index.ts

// Los 3 modos de operación de tu app
export type AppMode = 'delivery' | 'waiter' | 'menu';

export interface Product {
  id: string;
  title: string;       // Mapeado desde 'name' de Ventify
  price: number;
  image: string;       // Mapeado desde 'imageUrl'
  category: string;
  description?: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  notes?: string;      // Ej: "Sin mayonesa" (Importante para meseros/delivery)
}

// Estructura para enviar el pedido a Ventify
export interface OrderPayload {
  customerName: string;
  phone?: string;
  address?: string;
  tableNumber?: string; // Exclusivo para modo 'waiter'
  type: 'DELIVERY' | 'DINE_IN';
  items: {
    productId: string;
    quantity: number;
  }[];
  total: number;
}