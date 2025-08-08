import { TrashIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import CartQuantityControl from "~/components/quantityControlBtn";
import { removeFromCart } from "~/store/slices/cartSlice";
import { RootState } from "~/store/store";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <ul className="md:col-span-2 col-span-1 space-y-1 divide-y divide-gray-900">
            {cart.map((item) => (
              <li key={item.id} className="p-3 flex gap-4">
                <div className="w-[156px] h-[156px] bg-neutral-400"></div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                  </div>
                  <div className="flex gap-4">
                    <CartQuantityControl product={item} />
                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                      <TrashIcon className="w-5 h-5 inline-block" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 col-span-1 p-4 border border-black rounded h-[376px] justify-around">
            <h2 className="text-lg font-bold">Cart Summary</h2>
            <div className="divide-y divide-black space-y-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm">${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm">$20.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Total</p>
                  <p className="text-sm">${(total + 20).toFixed(2)}</p>
                </div>
                <button className="rounded p-2 bg-black text-white text-sm">
                  Check out
                </button>
                <button className="rounded p-2 bg-transparent text-black text-sm">
                  Or pay with PayPal
                </button>
              </div>
              <div className="py-2">
                <p className="text-xs text-gray-500">Promo code</p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 border border-gray-300 outline-none rounded py-1 px-4 text-sm hover:border-gray-900 focus:border-gray-900"
                    placeholder="Enter code"
                  />
                  <button className="bg-black text-sm text-white rounded py-1 px-4">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
