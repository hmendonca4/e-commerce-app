import { Link } from "@remix-run/react";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full justify-between h-16 items-center">
          {/* Left: Logo & Links */}
          <Link to="/" className="text-xl font-bold text-gray-800">
            The Online Store
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/shop" className="text-gray-600 hover:text-blue-600">
              Shop
            </Link>
            <Link to="/deals" className="text-gray-600 hover:text-blue-600">
              Deals
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
            <Link to="/account" className="text-gray-600 hover:text-blue-600">
              Account
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-gray-600 hover:text-blue-600">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-blue-600">
              <UserCircleIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-blue-600"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
