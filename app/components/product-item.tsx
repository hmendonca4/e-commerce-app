import { Link } from "@remix-run/react";
import { Product } from "~/routes/shop";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="w-[336px]">
      <div className="h-[336px] bg-neutral-400"></div>
      <div>{product.title}</div>
      <div>{product.price}$</div>
    </Link>
  );
}
