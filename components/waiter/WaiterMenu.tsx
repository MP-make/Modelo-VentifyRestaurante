"use client";
import { useState } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/shared/ProductCard';
import { Filter, Percent } from 'lucide-react';

interface WaiterMenuProps {
  products: Product[];
}

export const WaiterMenu = ({ products }: WaiterMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [menuFilter, setMenuFilter] = useState<'all' | 'menu' | 'carta'>('all');

  // Extract unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Filter products based on selected category AND menu type
  const filteredProducts = products
    .filter(product => !selectedCategory || product.category === selectedCategory)
    .filter(product => {
      if (menuFilter === 'menu') return product.isMenuDelDia === true;
      if (menuFilter === 'carta') return product.isMenuDelDia === false;
      return true; // 'all' shows everything
    });

  return (
    <div className="h-full flex flex-col">
      {/* Filter Bar */}
      <div className="p-4 border-b bg-white space-y-3">
        {/* Menu Type Filter */}
        <div className="flex items-center gap-2 justify-center">
          <Filter className="w-4 h-4 text-gray-500" />
          <button
            onClick={() => setMenuFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              menuFilter === 'all'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todo el Menú
          </button>
          <button
            onClick={() => setMenuFilter('menu')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              menuFilter === 'menu'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🍽️ Menú del Día
          </button>
          <button
            onClick={() => setMenuFilter('carta')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              menuFilter === 'carta'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📋 Carta Regular
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-center text-sm text-gray-500">
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Dense Products Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Filter className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-lg font-medium">No hay productos</p>
            <p className="text-sm">Cambia los filtros para ver más opciones</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                mode="waiter"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};