import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useDispatch } from "react-redux";
import { addToCart } from "~/store/slices/cartSlice";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.productId);
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return json({ product });
}

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-8 p-8">
      <div className="md:col-span-2 col-span-1 h-[542px] bg-neutral-400"></div>
      <div className="col-span-1 space-y-8 divide-y divide-gray-900">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-2xl font-bold">${product.price}</p>
          </div>
          <button
            onClick={handleAdd}
            className="w-full px-4 py-2 bg-black text-white"
          >
            Add to Cart
          </button>
        </div>
        <div className="pt-8">
          <h2>Product Details</h2>
          <p className="mt-2">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
