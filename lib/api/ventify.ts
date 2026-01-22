// lib/api/ventify.ts
import { Product, OrderPayload } from '@/types';

// Variables de entorno (solo disponibles en el cliente con NEXT_PUBLIC_)
const API_URL = process.env.NEXT_PUBLIC_VENTIFY_API_URL;
const ACCOUNT_ID = process.env.NEXT_PUBLIC_VENTIFY_ACCOUNT_ID;
const API_KEY = process.env.NEXT_PUBLIC_VENTIFY_API_KEY;

// Solo mostrar logs en desarrollo
const isDev = process.env.NODE_ENV === 'development';

// --- FUNCIÓN 1: OBTENER PRODUCTOS (GET) ---
export const fetchProducts = async (): Promise<Product[]> => {
  if (!API_URL || !ACCOUNT_ID || !API_KEY) {
    return [];
  }

  // Verificar si son valores placeholder
  const isPlaceholder = 
    ACCOUNT_ID?.includes('tu_account') || 
    ACCOUNT_ID?.includes('_de_ventify') ||
    API_KEY?.includes('tu_api') ||
    API_KEY?.includes('_de_ventify');
    
  if (isPlaceholder) {
    return [];
  }

  const endpoint = `${API_URL}/api/public/stores/${ACCOUNT_ID}/products?active=true`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return [];
    }

    const json = await response.json();
    const ventifyProducts = json.data || [];

    // MAPEO: Convertir formato Ventify -> Formato Restaurante
    return ventifyProducts.map((item: any) => ({
      id: item.id,
      title: item.name,
      price: item.price,
      image: item.imageUrl || 'https://via.placeholder.com/300?text=Sin+Foto',
      category: item.category || 'Otros',
      description: item.description || '',
      stock: item.stock || 0,
      featured: item.isFeatured || false, // Campo de Ventify para destacados
    }));

  } catch (error) {
    return [];
  }
};

// --- FUNCIÓN 2: ENVIAR PEDIDO (POST) ---
export const createOrder = async (payload: OrderPayload): Promise<any> => {
  if (!API_URL || !ACCOUNT_ID || !API_KEY) {
    throw new Error('Configuración no disponible');
  }

  const endpoint = `${API_URL}/api/public/stores/${ACCOUNT_ID}/sale-requests`;

  // Formatear payload para Ventify API - campos en raíz
  const ventifyPayload = {
    customerName: payload.customerName,
    customerPhone: payload.phone || '',
    customerEmail: payload.email || '',
    customerAddress: payload.address || '',
    type: payload.type,
    tableNumber: payload.tableNumber,
    notes: payload.notes || '',
    items: payload.items.map(item => ({
      productId: item.productId,
      name: item.name || '',
      quantity: item.quantity,
      unitPrice: item.price || 0,
      subtotal: (item.price || 0) * item.quantity,
    })),
    total: payload.total,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(ventifyPayload),
    });

    const responseData = await response.json().catch(() => ({}));

    // DEBUG temporal - ver respuesta de Ventify
    console.log('🔍 Ventify Response:', response.status, responseData);
    console.log('🔍 Payload enviado:', JSON.stringify(ventifyPayload, null, 2));

    if (!response.ok) {
      throw new Error(responseData.message || responseData.error || JSON.stringify(responseData) || 'No se pudo enviar el pedido');
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};