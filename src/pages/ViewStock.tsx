interface ViewStockProps {
  goBack: () => void;
}

const ViewStock = ({ goBack }: ViewStockProps) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">

      {/* TOP BAR - Responsive */}
      <div className="w-full max-w-6xl lg:max-w-7xl bg-[#D9D9D9] rounded-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 sm:py-3 mb-4 sm:mb-6">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm sm:text-base font-medium text-black"
        >
          <img src="/Polygon.png" className="w-4 h-4 sm:w-5 sm:h-5" alt="Back" />
          Main menu
        </button>

        <span className="font-bold text-[16px] sm:text-xl lg:text-2xl text-black">
          View Stock
        </span>

        <button className="flex items-center gap-2 text-sm sm:text-base font-medium text-black opacity-50">
          Main menu
          <img src="/Polygon 2.png" className="w-4 h-4 sm:w-5 sm:h-5" alt="Next" />
        </button>
      </div>

      {/* TABLE CONTAINER - Horizontal scroll for many columns */}
      <div className="w-full max-w-6xl lg:max-w-7xl overflow-x-auto">
        <div className="min-w-[1200px] bg-[#2F2F2F] rounded-xl sm:rounded-2xl overflow-hidden">

          {/* HEADER - 14 columns with responsive text */}
          <div className="grid grid-cols-14 text-[8px] sm:text-[10px] lg:text-xs bg-[#304FFE] text-white px-2 sm:px-3 py-2 sm:py-3 font-semibold">
            <div className="truncate px-1">Name</div>
            <div className="truncate px-1">Sinhala Name</div>
            <div className="truncate px-1">Type</div>
            <div className="truncate px-1">Category</div>
            <div className="truncate px-1">Sub Category</div>
            <div className="truncate px-1">SKU</div>
            <div className="truncate px-1">Description</div>
            <div className="truncate px-1">Rack</div>
            <div className="truncate px-1">Outlet</div>
            <div className="truncate px-1">Origin</div>
            <div className="truncate px-1">Buying Price</div>
            <div className="truncate px-1">Retail Price</div>
            <div className="truncate px-1">Wholesale Price</div>
            <div className="truncate px-1">Quantity</div>
          </div>

          {/* BODY - Responsive height */}
          <div className="h-[50vh] sm:h-[60vh] overflow-y-auto text-[8px] sm:text-[10px] lg:text-xs text-white">
            
            {/* SAMPLE ROWS - Added color coding for better readability */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`grid grid-cols-14 px-2 sm:px-3 py-2 sm:py-3 border-b border-white/10 hover:bg-white/5 transition-colors ${
                  i === 0 ? 'bg-[#3A3A3A]' : ''
                }`}
              >
                <div className="truncate px-1 font-medium">BEN 10 {i > 0 ? i + 1 : ''}</div>
                <div className="truncate px-1">-</div>
                <div className="truncate px-1">
                  <span className="px-1 py-0.5 rounded bg-blue-900/50">TOY</span>
                </div>
                <div className="truncate px-1">Action Figure</div>
                <div className="truncate px-1">Cartoon</div>
                <div className="truncate px-1 font-semibold text-blue-300">TAC457{i}</div>
                <div className="truncate px-1">789652-7{i}</div>
                <div className="truncate px-1">
                  <span className="px-1 py-0.5 rounded bg-gray-700">R{i + 1}</span>
                </div>
                <div className="truncate px-1">S3F{i + 1}</div>
                <div className="truncate px-1">CHINA</div>
                <div className="truncate px-1 text-red-300">100{i}</div>
                <div className="truncate px-1 text-green-300">150{i}</div>
                <div className="truncate px-1 text-yellow-300">120{i}</div>
                <div className="truncate px-1">
                  <span className={`px-2 py-1 rounded-full text-[7px] sm:text-[9px] ${
                    i < 3 ? 'bg-red-500/20 text-red-300' : 
                    i < 6 ? 'bg-yellow-500/20 text-yellow-300' : 
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {i < 3 ? 'LOW' : i < 6 ? 'MED' : 'HIGH'}
                  </span>
                </div>
              </div>
            ))}

            {/* EMPTY ROWS */}
            {[...Array(4)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="grid grid-cols-14 px-2 sm:px-3 py-3 border-b border-white/5"
              >
                {Array.from({ length: 14 }).map((_, j) => (
                  <div key={j} className="truncate px-1">&nbsp;</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAGINATION - Responsive */}
      <div className="w-full max-w-6xl lg:max-w-7xl flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-white/80 mt-3 sm:mt-4">
        <button className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full">
          ◀
        </button>
        <span className="font-medium">
          Page <span className="font-bold">2</span> of <span className="font-bold">2</span>
        </span>
        <button className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full">
          ▶
        </button>
      </div>

      {/* FOOTER INFO */}
      <div className="w-full max-w-6xl lg:max-w-7xl mt-3 sm:mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-[10px] sm:text-xs text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
            <span>High Stock (&gt;50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
            <span>Medium Stock (10-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
            <span>Low Stock (&lt;10)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStock;