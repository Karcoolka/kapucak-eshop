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

  const { orderitems, ...rest } = order;
  const orderForTable: Order = {
    ...rest,
    shippingAddress: order.shippingAddress as ShippingAddress,
    itemsPrice: String(order.itemsPrice ?? ''),
    shippingPrice: String(order.shippingPrice ?? ''),
    taxPrice: String(order.taxPrice ?? ''),
    totalPrice: String(order.totalPrice ?? ''),
    orderItems: orderitems ?? [],
  };

  return <OrderDetailsTable order={orderForTable} />;

};

export default OrderDetailsPage;