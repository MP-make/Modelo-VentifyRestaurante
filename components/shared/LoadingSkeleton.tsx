// components/shared/LoadingSkeleton.tsx
export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Imagen skeleton */}
          <div className="h-48 bg-gray-200"></div>
          
          {/* Contenido skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}