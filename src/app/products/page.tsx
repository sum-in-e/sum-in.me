import ProductList from '@/src/features/products/containers/ProductList';

export default async function ProductsPage() {
  return (
    <section className="w-full">
      <h2 className="text-4xl mb-10 font-bold">Products</h2>
      <ProductList />
    </section>
  );
}
