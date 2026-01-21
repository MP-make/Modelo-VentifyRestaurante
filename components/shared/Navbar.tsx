"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useSearchStore } from '@/lib/stores/search';
import { useCartStore } from '@/lib/stores/cart';
import { useUIStore } from '@/lib/stores/ui';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { query, setQuery } = useSearchStore();
  const { items } = useCartStore();
  const { setIsCartOpen } = useUIStore();

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">
              Ventify <span className="text-black">Restaurante</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors relative"
            >
              <div className="relative">
                <ShoppingBag size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
              <span>Carrito</span>
            </button>

            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors relative mb-4"
            >
              <div className="relative">
                <ShoppingBag size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
              <span>Carrito</span>
            </button>

            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}