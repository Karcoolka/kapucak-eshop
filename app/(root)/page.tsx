import { ProductCarousel } from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts, getFeaturedProducts } from "@/lib/actions/product.actions";
import { Product } from "@/types";

const toProduct = (p: Record<string, unknown>): Product =>
  ({ ...p, price: String(p.price ?? ''), rating: Number(p.rating ?? 0) }) as Product;

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  const featuredProductsData = (featuredProducts as Record<string, unknown>[]).map(toProduct);
  const latestProductsData = (latestProducts as Record<string, unknown>[]).map(toProduct);

  return (
    <div>
      {featuredProductsData.length > 0 && <ProductCarousel data={featuredProductsData} />}
      <ProductList title="Newest Arrivals" data={latestProductsData} />
    </div>
  );
};

export default HomePage;