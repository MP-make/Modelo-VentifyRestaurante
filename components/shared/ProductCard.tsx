// components/shared/ProductCard.tsx
"use client";
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product, AppMode } from '@/types';
import { useCartStore } from '@/lib/stores/cart'; // Asumiendo que crearás este store
import { useToastStore } from '@/lib/stores/toast';

interface Props {
  product: Product;
  mode: AppMode; // <--- ESTA ES LA CLAVE
}

export const ProductCard = ({ product, mode }: Props) => {
  const { addItem } = useCartStore(); // Tu estado global
  const { addToast } = useToastStore();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    addToast(`✅ ${product.title} agregado`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
      {/* Imagen Común */}
      <div className="relative aspect-square w-full">
        <Image 
          src={product.image || '/placeholder.png'} 
          alt={product.title} 
          fill 
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-black text-orange-600">S/ {product.price}</span>

          {/* --- LÓGICA CAMALEÓNICA --- */}
          
          {/* MODO 1: CLIENTE EN CASA (Delivery) */}
          {mode === 'delivery' && (
            <button 
              onClick={() => handleAddToCart(product)}
              className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors active:scale-95"
            >
              <Plus size={20} />
            </button>
          )}

          {/* MODO 2: MESERO (Velocidad) */}
          {mode === 'waiter' && (
            <button 
              onClick={() => handleAddToCart(product)}
              className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg active:scale-95"
            >
              +
            </button>
          )}

          {/* MODO 3: CARTA QR (Solo ver) */}
          {mode === 'menu' && (
            <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-gray-100 rounded">
              Disponible
            </span>
          )}
          
        </div>
      </div>
    </div>
  );
};