import { FunnelIcon } from "@phosphor-icons/react";

export function ButtonFilterSection({
    isOpenFilterSidebar,
    setIsOpenFilterSidebar,
}: {
    isOpenFilterSidebar: boolean;
    setIsOpenFilterSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section aria-label="Filtros de produtos" className="mb-4">
      <button
        type="button"
        className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
        aria-controls="filter-panel"
        aria-expanded={isOpenFilterSidebar}
        onClick={() => setIsOpenFilterSidebar(!isOpenFilterSidebar)}
      >
        <FunnelIcon size={24} />
        Filtros
      </button>
    </section>
  );
}
