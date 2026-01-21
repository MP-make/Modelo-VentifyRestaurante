"use client";
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/lib/api/ventify';
import { Product } from '@/types';
import { ProductCard } from '@/components/shared/ProductCard';
import { CartDrawer } from '@/components/shared/CartDrawer';
import { MenuGrid } from '@/components/delivery/MenuGrid';
import { useUIStore } from '@/lib/stores/ui';
import HeroCarousel from '@/components/delivery/HeroCarousel';

export default function DeliveryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { isCartOpen, setIsCartOpen } = useUIStore();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const menuProducts = products.filter(p => p.category !== 'Bebidas');
  const bebidas = products.filter(p => p.category === 'Bebidas');

  if (products.length === 0) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Nuestra Carta
        </h2>
        <MenuGrid products={menuProducts} />
      </div>

      {/* Cart Drawer */}
      <CartDrawer visible={isCartOpen} onClose={() => setIsCartOpen(false)} bebidas={bebidas} />
    </div>
  );
}