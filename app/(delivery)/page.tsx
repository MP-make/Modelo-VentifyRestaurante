"use client";
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/lib/api/ventify';
import { Product } from '@/types';
import { CartDrawer } from '@/components/shared/CartDrawer';
import { useUIStore } from '@/lib/stores/ui';
import Footer from '@/components/shared/Footer';

// Componentes de Landing Page
import HeroBanner from '@/components/landing/HeroBanner';
import PresentacionSection from '@/components/landing/PresentacionSection';
import ProductosDestacados from '@/components/landing/ProductosDestacados';
import ContactoSection from '@/components/landing/ContactoSection';

export default function DeliveryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isCartOpen, setIsCartOpen } = useUIStore();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const bebidas = products.filter(p => p.category === 'Bebidas');

  return (
    <div className="min-h-screen">
      {/* 1. Hero Banner Principal */}
      <HeroBanner />

      {/* 2. Sección de Presentación (Platillos + Personaje) */}
      <PresentacionSection />

      {/* 3. Productos Destacados / Lo más vendido */}
      <ProductosDestacados products={products} />

      {/* 4. Información de Contacto */}
      <ContactoSection />

      {/* 5. Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer visible={isCartOpen} onClose={() => setIsCartOpen(false)} bebidas={bebidas} />
    </div>
  );
}