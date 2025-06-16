export function CategorySection({
  isOpenFilterSidebar,
  filter,
  categories,
  handleCategoryFilter,
  handleClearFilter,
}: {
  isOpenFilterSidebar: boolean;
  filter: string;
  categories: string[];
  handleCategoryFilter: (category: string) => void;
  handleClearFilter: () => void;
}) {
  return (
    <section
      id="filter-panel"
      aria-labelledby="filter-title"
      className={`${
        isOpenFilterSidebar ? "block" : "hidden"
      } bg-white text-black p-4 rounded-md border border-solid border-gray-300 shadow-lg w-full max-w-sm`}
    >
      <p id="filter-title" className="text-sm font-semibold mb-2">
        Categorias
      </p>
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            type="button"
            onClick={handleClearFilter}
            className={`px-3 py-1 rounded border ${
              filter === ""
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Todos
          </button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => handleCategoryFilter(category)}
              className={`px-3 py-1 rounded border ${
                filter === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
