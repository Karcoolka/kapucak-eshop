'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';
import { Plus } from 'lucide-react';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(`${item.name} added to the cart`, {
      action: {
        label: 'Go to cart',
        onClick: () => router.push('/cart'),
      },
    });
  };

  return <Button className='w-full' type='button' onClick={ handleAddToCart }>    
    <Plus/>Add To Cart</Button>;
};

export default AddToCart;