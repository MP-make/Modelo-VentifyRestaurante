"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Phone, MapPin, Mail, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/cart';
import { createOrder } from '@/lib/api/ventify';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: false, phone: false, address: false, email: false, paymentMethod: false });

  const subtotal = getTotal();
  const igv = subtotal * 0.18;
  const delivery = 5;
  const total = subtotal + igv + delivery;

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items.length, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    // Validation
    const newErrors = {
      name: !customerName.trim(),
      phone: !phone.trim(),
      address: !address.trim(),
      email: !email.trim(),
      paymentMethod: !paymentMethod,
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.phone || newErrors.address || newErrors.email || newErrors.paymentMethod) {
      return;
    }

    setIsSubmitting(true);
    const payload = {
      customerName,
      phone,
      address,
      email,
      paymentMethod,
      notes,
      type: 'DELIVERY' as const,
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      total: total,
    };

    try {
      await createOrder(payload);
      clearCart();
      alert('Pedido confirmado exitosamente. Te contactaremos pronto.');
      // Optionally redirect to home
      // router.push('/');
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Error al confirmar el pedido. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Form - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Finalizar Pedido</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                    <input
                      id="name"
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: false });
                      }}
                      className={`peer w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-transparent text-gray-900 ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-10 top-3 text-gray-900 font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-orange-600 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-sm"
                    >
                      Nombre Completo
                    </label>
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>}
                </div>
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: false });
                      }}
                      className={`peer w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-transparent text-gray-900 ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-10 top-3 text-gray-900 font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-orange-600 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-sm"
                    >
                      Teléfono
                    </label>
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>}
                </div>
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                    <textarea
                      id="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors({ ...errors, address: false });
                      }}
                      rows={4}
                      className={`peer w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-transparent resize-none text-gray-900 ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="address"
                      className="absolute left-10 top-3 text-gray-900 font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-orange-600 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-sm"
                    >
                      Dirección de Entrega
                    </label>
                  </div>
                  {errors.address && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>}
                </div>
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: false });
                      }}
                      className={`peer w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-transparent text-gray-900 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-10 top-3 text-gray-900 font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-orange-600 peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-sm"
                    >
                      Correo Electrónico
                    </label>
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>}
                </div>
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-900 mb-2">Método de Pago</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                    <select
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: false });
                      }}
                      className={`peer w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 ${
                        errors.paymentMethod ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Selecciona método de pago</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="tarjeta">Tarjeta</option>
                      <option value="yape">Yape</option>
                    </select>
                  </div>
                  {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>}
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-900 mb-2">Notas adicionales (opcional)</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-gray-900"
                    placeholder="Ej: Sin cebolla, extra salsa, etc."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition mt-6 disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirmando...' : 'Confirmar Pedido'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Ticket - 1/3 width, sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-xl sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Ticket de Compra</h3>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-900 font-semibold">{item.title}</span>
                    <span className="text-gray-600">x{item.quantity}</span>
                    <span className="text-gray-900 font-bold">S/ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span className="text-gray-900 font-bold">S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>IGV (18%):</span>
                  <span className="text-gray-900 font-bold">S/ {igv.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery:</span>
                  <span className="text-gray-900 font-bold">S/ {delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2 text-gray-900">
                  <span>Total:</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}