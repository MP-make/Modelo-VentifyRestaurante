"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchProducts } from '@/lib/api/ventify';
import { Product } from '@/types';
import { ProductCard } from '@/components/shared/ProductCard';
import { CartDrawer } from '@/components/shared/CartDrawer';
import { useUIStore } from '@/lib/stores/ui';
import { useCartStore } from '@/lib/stores/cart';
import { ArrowLeft, ShoppingBag, Search, BookOpen, UtensilsCrossed, Beer, Drumstick, LayoutGrid } from 'lucide-react';

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { isCartOpen, setIsCartOpen } = useUIStore();
  const { items } = useCartStore();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  // Obtener categorías únicas
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filtrar productos
  const filteredProducts = products
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Icono por categoría
  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('bebida')) return Beer;
    if (lower.includes('platillo') || lower.includes('comida')) return UtensilsCrossed;
    if (lower.includes('fritura') || lower.includes('snack')) return Drumstick;
    return LayoutGrid;
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const bebidas = products.filter(p => p.category === 'Bebidas');

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header fijo */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Volver */}
            <Link href="/" className="flex items-center gap-2 text-stone-600 hover:text-amber-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Volver</span>
            </Link>

            {/* Título */}
            <h1 className="text-xl md:text-2xl font-bold text-stone-800">
              🍽️ Menú Completo
            </h1>

            {/* Carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-amber-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Buscador */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-stone-100 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filtros de categoría */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Todos
            </button>
            {categories.map(category => {
              const Icon = getCategoryIcon(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-white text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-sm">
                <div className="h-48 bg-stone-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-stone-200 rounded w-3/4" />
                  <div className="h-3 bg-stone-100 rounded w-1/2" />
                  <div className="h-6 bg-amber-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-stone-700 mb-2">No se encontraron productos</h3>
            <p className="text-stone-500">Intenta con otra búsqueda o categoría</p>
          </div>
        ) : (
          <>
            <p className="text-stone-500 mb-4">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  mode="delivery"
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer visible={isCartOpen} onClose={() => setIsCartOpen(false)} bebidas={bebidas} />
    </div>
  );
}