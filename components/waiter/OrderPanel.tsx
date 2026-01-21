"use client";
import { useCartStore } from '@/lib/stores/cart';
import { createOrder } from '@/lib/api/ventify';

interface OrderPanelProps {
  tableId: string;
}

export const OrderPanel = ({ tableId }: OrderPanelProps) => {
  const { items, updateQuantity, clearCart } = useCartStore();

  const handleSendOrder = async () => {
    if (items.length === 0) {
      alert('No hay items en la comanda');
      return;
    }

    const payload = {
      customerName: `Mesa ${tableId}`,
      tableNumber: tableId,
      type: 'DINE_IN' as const,
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      total: items.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    try {
      await createOrder(payload);
      clearCart();
      alert('Comanda enviada a cocina exitosamente');
    } catch (error) {
      console.error('Error enviando comanda:', error);
      alert('Error al enviar comanda. Intenta de nuevo.');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Table Header */}
      <div className="p-6 bg-green-600 text-white text-center">
        <h1 className="text-3xl font-bold">Mesa {tableId}</h1>
        <p className="text-sm opacity-90">Comanda Actual</p>
      </div>

      {/* Order Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">No hay items en la comanda</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">S/ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total and Send Button */}
      {items.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <div className="text-center mb-4">
            <p className="text-lg font-bold text-gray-800">
              Total: S/ {items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleSendOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-xl font-bold shadow-lg transition-colors"
          >
            ENVIAR COMANDA
          </button>
        </div>
      )}
    </div>
  );
};