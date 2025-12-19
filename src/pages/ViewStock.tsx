interface ViewStockProps {
  goBack: () => void;
}

const ViewStock = ({ goBack }: ViewStockProps) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">

      {/* TOP BAR */}
      <div className="w-full max-w-5xl bg-[#D9D9D9] rounded-full flex items-center justify-between px-6 py-3 mb-4">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <img src="/Polygon.png" className="w-4 h-4" />
          Main menu
        </button>

        <span className="font-bold text-[16px]">View Stock</span>

        <button className="flex items-center gap-2 text-sm font-medium opacity-50">
          Main menu
          <img src="/Polygon 2.png" className="w-4 h-4" />
        </button>
      </div>

      {/* TABLE */}
      <div className="w-full max-w-5xl bg-[#2F2F2F] rounded-[6px] overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-14 text-[10px] bg-[#304FFE] text-white px-2 py-2 font-semibold">
          <div>Name</div>
          <div>Sinhala Name</div>
          <div>Type</div>
          <div>Category</div>
          <div>Sub Category</div>
          <div>SKU</div>
          <div>Description</div>
          <div>Rack</div>
          <div>Outlet</div>
          <div>Origin</div>
          <div>Buying Price</div>
          <div>Retail Price</div>
          <div>Wholesale Price</div>
          <div>Quantity</div>
        </div>

        {/* BODY */}
        <div className="h-[420px] overflow-y-auto text-[10px] text-white">
          <div className="grid grid-cols-14 px-2 py-2 border-b border-white/10">
            <div>BEN 10</div>
            <div>-</div>
            <div>TOY</div>
            <div>Action Figure</div>
            <div>Cartoon</div>
            <div>TAC4578</div>
            <div>789652-78</div>
            <div>R5</div>
            <div>S3F1</div>
            <div>CHINA</div>
            <div>1000</div>
            <div>1500</div>
            <div>1200</div>
            <div>105</div>
          </div>

          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-14 px-2 py-3 border-b border-white/5"
            >
              {Array.from({ length: 14 }).map((_, j) => (
                <div key={j}></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="w-full max-w-5xl text-xs text-white/60 mt-2">
        ◀ 2 / 2 ▶
      </div>
    </div>
  );
};

export default ViewStock;
