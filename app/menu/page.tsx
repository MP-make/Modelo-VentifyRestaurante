import { fetchProducts } from '@/lib/api/ventify';
import { ProductCard } from '@/components/shared/ProductCard';

export default async function MenuPage() {
  const products = await fetchProducts();

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Nuestra Carta
        </h1>

        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-gray-200 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  mode="menu"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}