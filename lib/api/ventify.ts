// lib/api/ventify.ts
import { Product, OrderPayload } from '@/types';

// --- FUNCIÓN 1: OBTENER PRODUCTOS (GET) ---
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return [];
    }

    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// --- FUNCIÓN 2: ENVIAR PEDIDO (POST) ---
export const createOrder = async (payload: OrderPayload): Promise<any> => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'No se pudo enviar el pedido');
    }

    const result = await response.json();
    console.log("✅ Pedido creado exitosamente:", result);
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};