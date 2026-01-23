import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import LoadingSkeleton from '@/components/shared/LoadingSkeleton';
import MenuContent from './MenuContent';

// Función Server Component para obtener productos
async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 } // Revalidar cada hora (ISR)
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function MenuPage() {
  // Fetch de productos en el servidor
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header estático */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 text-stone-600 hover:text-amber-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Volver</span>
            </Link>

            <h1 className="text-xl md:text-2xl font-bold text-stone-800">
              🍽️ Menú Completo
            </h1>

            {/* Placeholder para carrito (manejado en cliente) */}
            <div className="w-10 h-10"></div>
          </div>
        </div>
      </header>

      {/* Contenido con Suspense para streaming */}
      <Suspense fallback={<LoadingSkeleton />}>
        <MenuContent initialProducts={products} />
      </Suspense>
    </div>
  );
}