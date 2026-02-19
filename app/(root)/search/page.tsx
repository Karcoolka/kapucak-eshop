import Pagination from "@/components/shared/header/pagination";
import ProductCard from "@/components/shared/product/product-card";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import { Product } from "@/types";
import Link from "next/link";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $100",
    value: "51-100",
  },
  {
    name: "$101 to $200",
    value: "101-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
  {
    name: "$501 to $1000",
    value: "501-1000",
  },
];

const toProduct = (p: Record<string, unknown>): Product =>
  ({
    ...p,
    price: String(p.price ?? ""),
    rating: Number(p.rating ?? 0),
  }) as Product;

const ratings = [4, 3, 2, 1];

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
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  // Get products
  const products = await getAllProducts({
    category,
    query: q,
    price,
    rating,
    page: Number(page),
    sort,
  });

  const productList = (products!.data as Record<string, unknown>[]).map(
    toProduct,
  );

  const categories = await getAllCategories();

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <aside className="shrink-0 md:w-52 mr-2">
        {/* Category Links */}
        <div className="text-xl mt-3 mb-2">Department</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${
                  ("all" === category || "" === category) && "font-bold"
                }`}
                href={getFilterUrl({ c: "all" })}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={`${x.category === category && "font-bold"}`}
                  href={getFilterUrl({ c: x.category })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Links */}
        <div>
          <div className="text-xl mt-8 mb-2">Price</div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`  ${"all" === price && "font-bold"}`}
                href={getFilterUrl({ p: "all" })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`${p.value === price && "font-bold"}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Rating Links */}
        <div>
          <div className="text-xl mt-8 mb-2">Customer Review</div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ r: "all" })}
                className={`  ${"all" === rating && "font-bold"}`}
              >
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`${r.toString() === rating && "font-bold"}`}
                >
                  {`${r} stars & up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {productList.length === 0 && <div>No product found</div>}
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products!.totalPages! > 1 && (
          <Pagination page={page} totalPages={products!.totalPages} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;

// return (
//     <div className="space-y-6 py-6">
//       <header className="space-y-1">
//         <h1 className="h1-bold">Products</h1>
//         {productList.length > 0 && (
//           <p className="text-muted-foreground text-sm">
//             Showing {productList.length} product
//             {productList.length === 1 ? "" : "s"}
//           </p>
//         )}

//         <div className="flex gap-2">
//         URL: {
//   getFilterUrl({ c: "Men's Dress Shirts" })
// }
//         </div>

//       </header>
//       {productList.length === 0 ? (
//         <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 px-4 py-12 text-center">
//           <p className="text-muted-foreground">
//             No products match your search.
//           </p>
//           <p className="mt-1 text-sm text-muted-foreground">
//             Try a different query or category.
//           </p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {productList.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//           {products!.totalPages > 1 && (
//             <div className="flex justify-center pt-4">
//               <Pagination page={page} totalPages={products!.totalPages} />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
