import { useNavigate, useSearchParams } from "@remix-run/react";

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "title_asc", label: "Name (A-Z)" },
  { value: "title_desc", label: "Name (Z-A)" },
  { value: "price_asc", label: "Price (Low to High)" },
  { value: "price_desc", label: "Price (High to Low)" },
];

type Props = {
  currentSort: string;
};

export default function SortBy({ currentSort }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value.split("_");
    const sort = newSort[0];
    const orderBy = newSort[1];
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    params.set("orderBy", orderBy);
    params.set("page", "1"); // reset page to 1 when sort changes
    navigate(`?${params.toString()}`);
  };

  return (
    <select
      value={currentSort || ""}
      onChange={handleChange}
      className="border p-2 rounded"
    >
      <option value="" disabled>
        Sort by
      </option>
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
