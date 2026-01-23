// components/shared/ProductCard.tsx
"use client";
import Image from 'next/image';
import { Plus, ShoppingCart, Eye } from 'lucide-react';
import { Product, AppMode } from '@/types';
import { useProductActions } from '@/lib/hooks/useProductActions';

interface ProductCardProps {
  product: Product;
  mode: AppMode;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = ({ product, mode, onQuickView }: ProductCardProps) => {
  const { handleAddToCart } = useProductActions();

  // Verificar stock
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Imagen con badge de stock */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <Image 
          src={product.image || '/placeholder.png'} 
          alt={product.title} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badge de stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
              Agotado
            </span>
          </div>
        )}

        {/* Badge de Menú del Día */}
        {product.isMenuDelDia && mode === 'waiter' && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg">
            🍽️ Menú del Día
          </div>
        )}

        {/* Badge de Featured */}
        {product.featured && mode === 'delivery' && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg">
            ⭐ Destacado
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Categoría */}
        <span className="text-xs text-stone-500 font-medium mb-1">{product.category}</span>
        
        {/* Título */}
        <h3 className="font-bold text-lg text-stone-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.title}
        </h3>
        
        {/* Descripción */}
        {product.description && (
          <p className="text-sm text-stone-600 line-clamp-2 mb-3">{product.description}</p>
        )}
        
        {/* Footer con precio y acción */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-stone-100">
          <div>
            <span className="text-2xl font-black text-orange-600">S/ {product.price.toFixed(2)}</span>
            {/* Mostrar precio mínimo si hay descuento disponible */}
            {product.minPrice && product.minPrice < product.price && mode === 'waiter' && (
              <p className="text-xs text-stone-500">Desde S/ {product.minPrice.toFixed(2)}</p>
            )}
          </div>

          {/* Botones según modo */}
          {!isOutOfStock && (
            <>
              {/* MODO DELIVERY: Botón flotante naranja */}
              {mode === 'delivery' && (
                <button 
                  onClick={() => handleAddToCart(product, 'delivery')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg transition-all active:scale-95 group-hover:scale-110"
                  title="Agregar al carrito"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}

              {/* MODO WAITER: Botón verde rápido */}
              {mode === 'waiter' && (
                <button 
                  onClick={() => handleAddToCart(product, 'waiter')}
                  className="bg-green-600 hover:bg-green-700 text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 font-bold text-xl"
                  title="Agregar a comanda"
                >
                  +
                </button>
              )}

              {/* MODO MENU: Solo vista */}
              {mode === 'menu' && (
                <button
                  onClick={() => onQuickView?.(product)}
                  className="flex items-center gap-2 text-stone-600 hover:text-orange-600 font-medium text-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Ver más
                </button>
              )}
            </>
          )}

          {/* Si está agotado */}
          {isOutOfStock && (
            <span className="text-xs text-red-500 font-bold px-3 py-1 bg-red-50 rounded-full">
              Sin stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};