"use client";
import { useAuthStore } from '@/lib/stores/auth';

export default function Footer() {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <footer className="bg-gradient-to-b from-stone-800 to-stone-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-stone-400 text-sm">
            © 2026 Ventify Restaurante. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}