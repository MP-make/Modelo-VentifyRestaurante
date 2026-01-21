// lib/api/ventify.ts
import { Product, OrderPayload } from '@/types';

// 1. LEER TUS VARIABLES DE ENTORNO REALES
const API_URL = process.env.NEXT_PUBLIC_VENTIFY_API_URL;      // https://ventify.com.pe
const ACCOUNT_ID = process.env.NEXT_PUBLIC_VENTIFY_ACCOUNT_ID; // Tu ID acct_...
const API_KEY = process.env.NEXT_PUBLIC_VENTIFY_API_KEY;      // Tu API Key larga

// --- FUNCIÓN 1: OBTENER PRODUCTOS (GET) ---
export const fetchProducts = async (): Promise<Product[]> => {
  // Validación de seguridad
  if (!API_URL || !ACCOUNT_ID || !API_KEY) {
    console.error("❌ FALTAN VARIABLES DE ENTORNO EN .ENV.LOCAL");
    return [];
  }

  // Endpoint real de Ventify
  const endpoint = `${API_URL}/api/public/stores/${ACCOUNT_ID}/products?active=true`;

  try {
    console.log(`📡 Consultando Ventify: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY // Autenticación real
      },
      cache: 'no-store' // Importante para no guardar caché vieja
    });

    if (!response.ok) {
      console.error(`❌ Error HTTP: ${response.status} ${response.statusText}`);
      return [];
    }

    const json = await response.json();
    const ventifyProducts = json.data || [];

    console.log(`✅ ¡ÉXITO! Se encontraron ${ventifyProducts.length} productos.`);

    // MAPEO: Convertir formato Ventify -> Formato Restaurante
    return ventifyProducts.map((item: any) => ({
      id: item.id,
      title: item.name,           // Ventify dice 'name', tu app usa 'title'
      price: item.price,
      image: item.imageUrl || 'https://via.placeholder.com/300?text=Sin+Foto', // Ventify dice 'imageUrl'
      category: item.category || 'Otros',
      description: item.description || '',
      stock: item.stock || 0,
    }));

  } catch (error) {
    console.error('❌ Error fatal al conectar con Ventify:', error);
    return [];
  }
};

// --- FUNCIÓN 2: ENVIAR PEDIDO (POST) ---
export const createOrder = async (payload: OrderPayload): Promise<any> => {
  if (!API_URL || !ACCOUNT_ID || !API_KEY) return { success: false };

  const endpoint = `${API_URL}/api/public/stores/${ACCOUNT_ID}/sale-requests`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo enviar el pedido`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
};