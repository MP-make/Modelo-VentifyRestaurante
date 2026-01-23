"use client";
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/cart';

export default function WaiterPage() {
  const router = useRouter();
  const setTable = useCartStore((state) => state.setTable);

  const handleTableSelect = (tableId: number) => {
    setTable(tableId.toString());
    router.push(`/waiter/${tableId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Seleccionar Mesa
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((tableId) => (
            <button
              key={tableId}
              onClick={() => handleTableSelect(tableId)}
              className="bg-white hover:bg-blue-50 border-2 border-gray-300 hover:border-blue-500 rounded-lg p-6 text-2xl font-bold text-gray-700 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Mesa {tableId}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}