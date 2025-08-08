import { LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import Paginator from "~/components/paginator";
import ProductItem from "~/components/product-item";
import SortBy from "~/components/select";

interface ProductPayload {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  barcode: string;
  qrCode: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const sort = url.searchParams.get("sort") || "title";
  const orderBy = url.searchParams.get("orderBy") || "asc";
  const categoriesParam = url.searchParams.get("categories");
  const selectedCategories = categoriesParam ? categoriesParam.split(",") : [];

  const limit = 20;
  const start = (page - 1) * limit;

  // Build the URL to fetch data from
  const apiUrl =
    selectedCategories.length > 0
      ? `https://dummyjson.com/products/category/${selectedCategories.join(
          ","
        )}?limit=${limit}&skip=${start}&order=${orderBy}&sortBy=${sort}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${start}&order=${orderBy}&sortBy=${sort}`;

  // Replace the fetch with your internal API or database call
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Response("Failed to load products", { status: response.status });
  }

  const products: ProductPayload = await response.json();

  const categoriesResponse = await fetch(
    "https://dummyjson.com/products/categories"
  );
  const categories: { slug: string; name: string; url: string }[] =
    await categoriesResponse.json();

  const total = products.total;
  const end = page * limit < total ? page * limit : total;
  const totalPages = Math.ceil(total / limit);
  return json({
    products: products.products,
    page,
    sort: sort + "_" + orderBy,
    totalPages,
    total,
    start,
    end,
    categories,
    selectedCategories,
  });
}

export default function Shop() {
  const {
    products,
    page,
    sort,
    totalPages,
    total,
    end,
    start,
    categories,
    selectedCategories,
  } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const toggleCategory = (value: string) => {
    const current = new Set(selectedCategories);
    current.has(value) ? current.delete(value) : current.add(value);

    const newParams = new URLSearchParams(searchParams);
    const newCategories = Array.from(current).join(",");

    if (newCategories) {
      newParams.set("categories", newCategories);
    } else {
      newParams.delete("categories");
    }

    navigate(`?${newParams.toString()}`);
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-8 p-8">
      <div className="md:col-span-3 col-span-1">
        <div className="flex items-center justify-between gap-4 mb-4">
          <SortBy currentSort={sort} />
          <p>{`Showing ${start + 1} - ${end} of ${total}`}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {products.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))}
        </div>
        <Paginator currentPage={page} totalPages={totalPages} />
      </div>
      <div className="col-span-1">
        <p>Categories</p>
        {categories.map((opt) => (
          <label key={opt.slug} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(opt.slug)}
              onChange={() => toggleCategory(opt.slug)}
              className="form-checkbox w-4 h-4"
            />
            {opt.name}
          </label>
        ))}
      </div>
    </div>
  );
}
