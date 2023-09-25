import ProductItem from '@/src/features/products/components/ProductItem';

const ProductList = () => {
  return (
    <ul>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
};

export default ProductList;

const products = [
  {
    id: 0,
    name: 'Linkloud',
    description:
      '나중에 볼 링크를 간편하게 저장하고 관리할 수 있도록 도와주는 서비스',
    url: 'https://linkloud.xyz',
    path: '/products/linkloud',
    duration: '2023 - present',
  },
];
