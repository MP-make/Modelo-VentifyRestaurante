"use client";
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/stores/auth';

export default function Footer() {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <footer className="bg-gradient-to-b from-stone-800 to-stone-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Ventify Restaurante</h3>
            <p className="text-stone-400">
              Ventify Restaurante es tu restaurante favorito para pedidos en línea. Disfruta de una experiencia culinaria excepcional con nuestro servicio de delivery rápido y eficiente.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/delivery" className="text-stone-400 hover:text-amber-400 transition-colors">Delivery</Link></li>
              <li><Link href="/menu" className="text-stone-400 hover:text-amber-400 transition-colors">Menú</Link></li>
              <li><Link href="/waiter" className="text-stone-400 hover:text-amber-400 transition-colors">Mesero</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Cuenta</h3>
            {!isLoggedIn ? (
              <ul className="space-y-2">
                <li><Link href="/login" className="text-stone-400 hover:text-amber-400 transition-colors">Iniciar Sesión</Link></li>
                <li><Link href="/register" className="text-stone-400 hover:text-amber-400 transition-colors">Registrarse</Link></li>
              </ul>
            ) : (
              <ul className="space-y-2">
                <li><Link href="/profile" className="text-stone-400 hover:text-amber-400 transition-colors">Mi Perfil</Link></li>
                <li><Link href="/orders" className="text-stone-400 hover:text-amber-400 transition-colors">Mis Pedidos</Link></li>
                <li>
                  <button
                    onClick={logout}
                    className="text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Métodos de Pago</h3>
            <div className="flex space-x-4">
              <div className="bg-white/90 p-1.5 rounded-lg">
                <Image
                  src="/icono-yape.png"
                  alt="Yape"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="bg-white/90 p-1.5 rounded-lg">
                <Image
                  src="/icono-plin.png"
                  alt="Plin"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-700 mt-8 pt-8 text-center">
          <p className="text-stone-500">
            © 2024 Ventify Restaurante. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}