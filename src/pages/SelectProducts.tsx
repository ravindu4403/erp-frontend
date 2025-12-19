interface SelectProductsProps {
  onClose: () => void;
}

const SelectProducts = ({ onClose }: SelectProductsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-[90%] max-w-md bg-[#D9D9D9] rounded-[20px] p-4 shadow-xl">

        {/* SEARCH */}
        <div className="flex items-center bg-white rounded-full px-3 py-2 mb-3">
          <span className="mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* TABLE */}
        <div className="bg-[#4B4B4B] rounded-[10px] overflow-hidden">
          {/* HEADER */}
          <div className="grid grid-cols-5 bg-[#2F2F2F] text-[10px] font-semibold text-white px-2 py-2">
            <div>#</div>
            <div>SKU</div>
            <div>Description</div>
            <div>Item Name</div>
            <div>Outlet</div>
          </div>

          {/* ROWS */}
          <div className="h-28 overflow-y-auto text-[10px] text-white">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`grid grid-cols-5 px-2 py-2 border-b border-white/10 ${
                  i === 2 ? "bg-[#3F5FA9]" : ""
                }`}
              >
                <div>{i}</div>
                <div>{i === 1 ? "TYP5398" : "TYP7896"}</div>
                <div>879652-78</div>
                <div>{i === 1 ? "BEN 10 Watch" : "BEN 10 Car"}</div>
                <div>{i === 1 ? "S3F1" : "S3F5"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center gap-2 text-xs mt-2 text-black/60">
          ◀ 2 / 2 ▶
        </div>

        {/* FORM */}
        <div className="mt-3 space-y-2 text-sm">

          <div className="flex items-center gap-2">
            <span className="font-semibold">Selected</span>
            <span className="text-blue-700 font-bold">TYP7896</span>
            <input
              type="text"
              placeholder="Add quantity"
              className="ml-auto w-28 px-2 py-1 rounded-full outline-none text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold w-28">Wholesale Price</span>
            <input
              type="text"
              value="12500"
              className="flex-1 px-2 py-1 rounded-full outline-none text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold w-28">Selling Price</span>
            <input
              type="text"
              value="12500"
              className="flex-1 px-2 py-1 rounded-full outline-none text-xs"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-black/40 font-bold">Select Products</span>

          <button className="px-6 h-9 bg-gradient-to-b from-[#0E7A2A] to-[#064C18] text-white rounded-full font-medium">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectProducts;
