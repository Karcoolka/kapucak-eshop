import { getOrderById } from '@/lib/actions/order.actions';
import { notFound } from 'next/navigation';
import OrderDetailsTable from './order-details-table';
import { Order, ShippingAddress } from '@/types';

export const metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const { orderItems, user, ...rest } = order as any;
  const orderForTable: Order = {
    ...rest,
    user: user,
    shippingAddress: order.shippingAddress as ShippingAddress,
    itemsPrice: String(order.itemsPrice ?? ''),
    shippingPrice: String(order.shippingPrice ?? ''),
    taxPrice: String(order.taxPrice ?? ''),
    totalPrice: String(order.totalPrice ?? ''),
    orderItems: orderItems ?? [],
  };

  return <OrderDetailsTable order={orderForTable} />;

};

export default OrderDetailsPage;