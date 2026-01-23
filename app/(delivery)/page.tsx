"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchProducts } from '@/lib/api/ventify';
import { Product } from '@/types';
import { CartDrawer } from '@/components/shared/CartDrawer';
import { useUIStore } from '@/lib/stores/ui';
import Footer from '@/components/shared/Footer';
import { X } from 'lucide-react';

// Componentes de Landing Page
import HeroBanner from '@/components/landing/HeroBanner';
import ProductosDestacados from '@/components/landing/ProductosDestacados';
import PromocionesSection from '@/components/landing/PromocionesSection';
import ContactoSection from '@/components/landing/ContactoSection';

export default function DeliveryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const { isCartOpen, setIsCartOpen } = useUIStore();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // Auto-cerrar modal después de 5 segundos
    if (showWelcomeModal) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeModal]);

  const bebidas = products.filter(p => p.category === 'Bebidas');

  return (
    <div className="min-h-screen">
      {/* Modal de Bienvenida - DISEÑO CUADRADO */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full">
            {/* Botón cerrar */}
            <button 
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors z-20 shadow-lg"
            >
              <X className="w-6 h-6 text-stone-800" />
            </button>

            {/* Contenedor principal CUADRADO */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden aspect-square max-h-[90vh]">
              {/* Grid de 2 columnas equilibrado */}
              <div className="grid grid-cols-2 h-full">
                {/* Lado izquierdo: Contenido de texto */}
                <div className="relative flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-white to-amber-50/30">
                  {/* Badge BIENVENIDOS */}
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold shadow-md">
                      ⭐ BIENVENIDOS
                    </span>
                  </div>

                  {/* Título principal */}
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
                    Conoce <span className="text-orange-600">Ventify</span> Restaurante
                  </h2>
                  <p className="text-center text-stone-700 text-base mb-6">
                    Te presentamos lo mejor de nuestra cocina, preparada con amor y los ingredientes más frescos
                  </p>

                  {/* Tarjeta/Cartel con borde */}
                  <div className="relative mb-6">
                    {/* Badge "NUEVO" flotante */}
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse z-10">
                      ¡NUEVO!
                    </div>
                    
                    {/* Tarjeta con borde */}
                    <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-xl border-4 border-amber-200">
                      {/* Icono de tenedor y cuchillo */}
                      <div className="text-center mb-3">
                        <span className="text-4xl">🍽️</span>
                      </div>
                      
                      {/* Texto del cartel */}
                      <p className="text-xl md:text-2xl font-bold text-orange-800 text-center leading-tight">
                        ¡Te invito a probar nuestros deliciosos platillos! 🍕
                      </p>
                    </div>
                  </div>

                  {/* Texto adicional */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-1">
                      Platillos que Enamoran
                    </h3>
                    <p className="text-stone-600 text-sm">
                      Cada plato es una experiencia única
                    </p>
                  </div>

                  {/* Botón de acción */}
                  <button
                    onClick={() => setShowWelcomeModal(false)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    Explorar Menú
                  </button>
                </div>

                {/* Lado derecho: Personaje con fondo de comida */}
                <div className="relative bg-stone-100 overflow-hidden">
                  {/* Imagen de fondo de platillos */}
                  <div className="absolute inset-0">
                    <Image
                      src="/fondo_de_platillos.jpg"
                      alt="Platillos del restaurante"
                      fill
                      className="object-cover opacity-30"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-100/80 via-transparent to-amber-50/50"></div>
                  </div>

                  {/* Personaje animado encima */}
                  <div className="relative h-full flex items-end justify-center pb-8">
                    <div className="relative animate-bounce-slow">
                      <Image
                        src="/personaje presentando_sinfondo.png"
                        alt="Chef presentadora"
                        width={320}
                        height={400}
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Hero Banner Principal */}
      <HeroBanner />

      {/* 2. Productos Destacados / Lo más vendido */}
      <ProductosDestacados products={products} />

      {/* 3. Sección de Promociones (Ingredientes, Preparación, Delivery) */}
      <PromocionesSection />

      {/* 4. Información de Contacto */}
      <ContactoSection />

      {/* 5. Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer visible={isCartOpen} onClose={() => setIsCartOpen(false)} bebidas={bebidas} />
    </div>
  );
}