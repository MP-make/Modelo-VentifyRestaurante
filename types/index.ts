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
  featured?: boolean;  // Producto destacado en landing
}

export interface CartItem extends Product {
  quantity: number;
  notes?: string;      // Ej: "Sin mayonesa" (Importante para meseros/delivery)
}

// Estructura para enviar el pedido a Ventify
export interface OrderPayload {
  customerName: string;
  phone?: string;
  email?: string;       // Email del cliente
  address?: string;
  tableNumber?: string; // Exclusivo para modo 'waiter'
  notes?: string;       // Notas generales + info de pago
  type: 'DELIVERY' | 'DINE_IN';
  items: {
    productId: string;
    quantity: number;
    price?: number;     // Precio unitario del producto
    name?: string;      // Nombre del producto (para referencia)
  }[];
  total: number;
}