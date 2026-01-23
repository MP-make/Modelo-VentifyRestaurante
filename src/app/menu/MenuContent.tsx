"use client";
import { useState } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/shared/ProductCard';
import { CartDrawer } from '@/components/shared/CartDrawer';
import { useUIStore } from '@/lib/stores/ui';
import { useCartStore } from '@/lib/stores/cart';
import { Search, BookOpen, UtensilsCrossed, Beer, Drumstick, LayoutGrid, ShoppingBag } from 'lucide-react';

interface MenuContentProps {
  initialProducts: Product[];
}

export default function MenuContent({ initialProducts }: MenuContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { isCartOpen, setIsCartOpen } = useUIStore();
  const { items } = useCartStore();

  const categories = Array.from(new Set(initialProducts.map(p => p.category)));

  const filteredProducts = initialProducts
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('bebida')) return Beer;
    if (lower.includes('platillo') || lower.includes('comida')) return UtensilsCrossed;
    if (lower.includes('fritura') || lower.includes('snack')) return Drumstick;
    return LayoutGrid;
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const bebidas = initialProducts.filter(p => p.category === 'Bebidas');

  return (
    <>
      {/* Barra de búsqueda y filtros */}
      <div className="sticky top-[73px] z-30 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Buscador */}
          <div className="relative mb-4">
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
          <div className="flex gap-2 overflow-x-auto pb-2">
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
      </div>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {filteredProducts.length === 0 ? (
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

      {/* Botón flotante de carrito */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-2xl transition-all transform hover:scale-110"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <CartDrawer visible={isCartOpen} onClose={() => setIsCartOpen(false)} bebidas={bebidas} />
    </>
  );
}