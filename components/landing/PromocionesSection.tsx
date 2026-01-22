"use client";
import Image from "next/image";
import { Percent, Gift, Clock, Sparkles } from "lucide-react";

// Puedes agregar más promociones aquí o cargarlas desde la API
const promociones = [
  {
    id: 1,
    titulo: "Menú del Día",
    descripcion: "Entrada + Plato de fondo + Bebida",
    precio: "S/ 15.00",
    precioAnterior: "S/ 22.00",
    imagen: "/menu del dia.jpeg",
    badge: "🔥 Popular",
    color: "from-amber-600 to-orange-700",
  },
  {
    id: 2,
    titulo: "Combo Familiar",
    descripcion: "4 platos + 4 bebidas + postre gratis",
    precio: "S/ 65.00",
    precioAnterior: "S/ 85.00",
    imagen: "/Fondo frituras.png",
    badge: "👨‍👩‍👧‍👦 Familiar",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: 3,
    titulo: "Happy Hour",
    descripcion: "2x1 en bebidas de 5pm a 7pm",
    precio: "2x1",
    precioAnterior: null,
    imagen: "/Fondo restaurante.png",
    badge: "🍹 2x1",
    color: "from-violet-600 to-purple-700",
  },
];

export default function PromocionesSection() {
  return (
    <section id="promociones" className="py-16 md:py-24 section-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-rose-100/80 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-rose-200/50">
            <Percent className="w-4 h-4" />
            OFERTAS ESPECIALES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Promociones <span className="text-rose-600">Irresistibles</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Aprovecha nuestras ofertas exclusivas y disfruta más por menos. 
            ¡No te las pierdas!
          </p>
        </div>

        {/* Grid de promociones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promociones.map((promo) => (
            <div
              key={promo.id}
              className="group relative card-elegant overflow-hidden"
            >
              {/* Imagen de fondo */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={promo.imagen}
                  alt={promo.titulo}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${promo.color} opacity-50`} />
                
                {/* Badge */}
                <div className="absolute top-4 right-4 glass-effect px-4 py-2 rounded-full">
                  <span className="font-bold text-stone-800">{promo.badge}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-stone-800 mb-2">
                  {promo.titulo}
                </h3>
                <p className="text-stone-600 mb-4">{promo.descripcion}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold gradient-text">
                      {promo.precio}
                    </span>
                    {promo.precioAnterior && (
                      <span className="text-lg text-stone-400 line-through ml-2">
                        {promo.precioAnterior}
                      </span>
                    )}
                  </div>
                  <button className="btn-primary">
                    ¡Lo quiero!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de oferta especial */}
        <div className="mt-16 relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 p-8 md:p-12 shadow-warm">
          {/* Patrón decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:24px_24px]" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Gift className="w-8 h-8 text-amber-200" />
                <span className="text-amber-200 font-bold text-lg">OFERTA LIMITADA</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                ¡Primera compra con 20% OFF!
              </h3>
              <p className="text-white/80 text-lg">
                Usa el código <span className="bg-white/20 px-3 py-1 rounded-lg font-mono font-bold">BIENVENIDO20</span> en tu primer pedido
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center glass-effect !bg-white/15 px-6 py-4 rounded-2xl !border-white/20">
                <Clock className="w-6 h-6 text-white mx-auto mb-1" />
                <p className="text-white/80 text-sm">Válido hasta</p>
                <p className="text-white font-bold text-lg">31 Enero</p>
              </div>
              <button className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Pedir Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
