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
      isMenuDelDia: item.isMenuDelDia || false, // Campo de Ventify
      minPrice: item.minPrice || item.price * 0.5, // Precio mínimo (50% por defecto si no existe)
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

  // MAPEO EXACTO PARA VENTIFY (SEGÚN ROUTE.TS)
  const ventifyPayload = {
    // 1. Datos del Cliente (En la raíz, NO dentro de un objeto 'customer')
    customerName: payload.customer.name,
    customerEmail: payload.customer.email || "cliente@web.com", // Fallback si no hay email
    customerPhone: payload.customer.phone,

    // 2. Datos de Envío y Pago
    shippingAddress: {
      address: payload.customer.address || "Recojo en tienda"
    },
    preferredPaymentMethod: payload.paymentMethod || 'Efectivo', // 'Yape', 'Plin', etc.
    notes: payload.notes || '',

    // 3. Totales
    total: payload.total,
    subtotal: payload.total, // Por ahora igual al total (o calcula antes impuestos si aplica)

    // 4. ITEMS (Aquí estaba el error)
    items: payload.items.map(item => ({
      productId: item.id,
      productName: item.title,      // CORRECCIÓN: Backend espera 'productName', no 'name'
      quantity: item.quantity,
      price: item.price,            // CORRECCIÓN: Backend espera 'price', no 'unitPrice'
      sku: '',                      // Opcional
      notes: item.notes || ''       // Notas del item (sin mayonesa, etc)
    }))
  };

  console.log("🚀 Enviando a Ventify:", JSON.stringify(ventifyPayload, null, 2));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(ventifyPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("❌ Error Ventify:", errorData);
      throw new Error(`Error ${response.status}: ${errorData}`);
    }

    const result = await response.json();
    console.log("✅ Respuesta exitosa de Ventify:", result);
    return result;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
};