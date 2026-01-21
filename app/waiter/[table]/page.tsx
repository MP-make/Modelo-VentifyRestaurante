import { fetchProducts } from '@/lib/api/ventify';
import { WaiterMenu } from '@/components/waiter/WaiterMenu';
import { OrderPanel } from '@/components/waiter/OrderPanel';

interface PageProps {
  params: {
    tableId: string;
  };
}

export default async function TablePage({ params }: PageProps) {
  const products = await fetchProducts();

  return (
    <div className="h-screen flex">
      {/* Catalog Column - 70% */}
      <div className="flex-1 bg-gray-50">
        <WaiterMenu products={products} />
      </div>

      {/* Order Column - Fixed Width */}
      <div className="w-80">
        <OrderPanel tableId={params.tableId} />
      </div>
    </div>
  );
}