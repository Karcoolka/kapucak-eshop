import Pagination from "@/components/shared/header/pagination";
import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";
import { Product } from "@/types";

const toProduct = (p: Record<string, unknown>): Product =>
  ({ ...p, price: String(p.price ?? ""), rating: Number(p.rating ?? 0) }) as Product;

const SearchPage = async (props: {
    searchParams: Promise<{
      q?: string;
      category?: string;
      price?: string;
      rating?: string;
      sort?: string;
      page?: string;
    }>;
  }) => {
    const {
      q = 'all',
      category = 'all',
      price = 'all',
      rating = 'all',
      sort = 'newest',
      page = '1',
    } = await props.searchParams;
  
    // Get products
const products = await getAllProducts({
    category,
    query: q,
    price,
    rating,
    page: Number(page),
    sort,
  });

  const productList = (products!.data as Record<string, unknown>[]).map(toProduct);

  return (
    <div className="space-y-6 py-6">
      <header className="space-y-1">
        <h1 className="h1-bold">Products</h1>
        {productList.length > 0 && (
          <p className="text-muted-foreground text-sm">
            Showing {productList.length} product{productList.length === 1 ? "" : "s"}
          </p>
        )}
      </header>

      {productList.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 px-4 py-12 text-center">
          <p className="text-muted-foreground">No products match your search.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different query or category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {products!.totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination page={page} totalPages={products!.totalPages} />
            </div>
          )}
        </>
      )}
    </div>
  );
  };
  
  export default SearchPage;