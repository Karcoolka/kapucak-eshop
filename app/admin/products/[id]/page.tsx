import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductForm from '@/components/shared/admin/product-form';
import { getProductById } from '@/lib/actions/product.actions';
import { Product } from '@/types';

export const metadata: Metadata = {
  title: 'Update product',
};

const UpdateProductPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const raw = await getProductById(id);

  if (!raw) return notFound();

  const product: Product = {
    ...raw,
    price: String(raw.price ?? ''),
    rating: Number(raw.rating ?? 0),
  };

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h1 className='h2-bold'>Update Product</h1>
      <ProductForm type='Update' product={product} productId={product.id} />
    </div>
  );
};

export default UpdateProductPage;