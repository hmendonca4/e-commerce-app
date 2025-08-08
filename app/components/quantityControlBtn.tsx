import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "~/store/slices/cartSlice";
import type { RootState } from "~/store/store";

type Props = {
  product: {
    id: string;
    title: string;
    price: number;
  };
};

export default function QuantityControl({ product }: Props) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleRemove = () => {
    if (quantity > 1) {
      dispatch(addToCart({ ...product, quantity: -1 }));
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  return (
    <div className="flex items-center gap-2 border border-black rounded-md">
      <button
        onClick={handleRemove}
        className="px-2 py-1 rounded text-lg"
        disabled={quantity === 0}
      >
        −
      </button>

      <span className="min-w-[24px] text-center">{quantity}</span>

      <button onClick={handleAdd} className="px-2 py-1 rounded text-lg">
        +
      </button>
    </div>
  );
}
