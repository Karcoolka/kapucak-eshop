import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import Rating from "./rating";

const ProductCard = ({ product }: { product: Product }) => {
  const imageSrc = product.images?.[0];

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <Link href={`/product/${product.slug}`} className="block aspect-square w-full overflow-hidden bg-muted">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </span>
        <Link href={`/product/${product.slug}`}>
          <h2 className="line-clamp-2 font-medium leading-tight hover:underline">
            {product.name}
          </h2>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <span className="text-sm font-medium text-destructive">Out of stock</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;