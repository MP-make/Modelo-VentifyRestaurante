"use client";
import Image from "next/image";
import { Utensils, Clock, Truck, Star } from "lucide-react";

export default function PresentacionSection() {
  return (
    <section id="presentacion" className="relative py-12 md:py-16 section-cream bg-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header de la sección */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-amber-100/80 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-200/50">
            <Star className="w-4 h-4 fill-amber-600 text-amber-600" />
            BIENVENIDOS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Conoce <span className="gradient-text">Ventify</span> Restaurante
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Te presentamos lo mejor de nuestra cocina, preparada con amor y los ingredientes más frescos
          </p>
        </div>

        {/* Contenedor principal - Personaje presentando platillos */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
          
          {/* Imagen de platillos (izquierda/fondo) */}
          <div className="relative w-full lg:w-2/3 h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-warm transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/fondo_de_platillos.jpg"
              alt="Nuestros deliciosos platillos"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/40 to-transparent" />
            
            {/* Texto sobre la imagen */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Platillos que Enamoran
              </h3>
              <p className="text-white/80 max-w-md">
                Cada plato es una experiencia única preparada con ingredientes selectos
              </p>
            </div>
            
            {/* Badge flotante */}
            <div className="absolute top-6 right-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-5 py-3 rounded-full shadow-lg">
              <p className="font-bold text-lg">🔥 +50 platillos</p>
            </div>
          </div>

          {/* Personaje presentando (superpuesto a la derecha) */}
          <div className="relative lg:absolute lg:right-0 lg:-bottom-8 w-[280px] md:w-[350px] lg:w-[400px] h-[350px] md:h-[450px] lg:h-[550px] z-10">
            <Image
              src="/personaje presentando_sinfondo.png"
              alt="Chef presentando"
              fill
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
            
            {/* Burbuja de diálogo */}
            <div className="absolute -top-4 -left-4 md:top-4 md:-left-8 glass-effect rounded-2xl p-4 shadow-soft max-w-[200px] transform -rotate-3 animate-bounce-slow border border-white/50">
              <p className="text-stone-700 font-semibold text-sm">
                ¡Te invito a probar nuestros deliciosos platillos! 🍽️
              </p>
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white/90 transform rotate-45" />
            </div>
          </div>
        </div>

        {/* Características - Cards flotantes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="group card-elegant p-6">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-warm">
              <Utensils className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-xl text-stone-800 mb-2">Ingredientes Frescos</h3>
            <p className="text-stone-500">Seleccionamos los mejores ingredientes para garantizar calidad en cada plato</p>
          </div>
          
          <div className="group card-elegant p-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-xl text-stone-800 mb-2">Preparación Rápida</h3>
            <p className="text-stone-500">Tu pedido listo en minutos, sin perder la calidad ni el sabor</p>
          </div>
          
          <div className="group card-elegant p-6">
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-xl text-stone-800 mb-2">Delivery Express</h3>
            <p className="text-stone-500">Llevamos tus platillos favoritos hasta la puerta de tu casa</p>
          </div>
        </div>
      </div>
    </section>
  );
}
