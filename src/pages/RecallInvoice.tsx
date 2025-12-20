interface RecallInvoiceProps {
  onClose: () => void;
}

const RecallInvoice = ({ onClose }: RecallInvoiceProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL - Responsive sizing */}
      <div className="relative w-full max-w-2xl lg:max-w-4xl bg-[#D9D9D9] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">

        {/* Search - Responsive */}
        <div className="flex items-center bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
          <span className="mr-2 sm:mr-3 text-lg sm:text-xl">🔍</span>
          <input
            type="text"
            placeholder="Search Invoice..."
            className="w-full outline-none text-sm sm:text-base bg-transparent placeholder:text-gray-500"
          />
        </div>

        {/* TABLE - Responsive */}
        <div className="bg-[#BFBABA] rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-5 bg-[#9FA8DA] text-xs sm:text-sm font-semibold text-black px-3 sm:px-4 py-3 sm:py-4">
            <div className="text-center sm:text-left">#</div>
            <div className="text-center sm:text-left">Created At</div>
            <div className="text-center sm:text-left">Invoice No</div>
            <div className="text-center sm:text-left">Created By</div>
            <div className="text-center sm:text-left">Created For</div>
          </div>

          {/* Rows - Increased height for tablet */}
          <div className="h-48 sm:h-64 overflow-y-auto">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-5 text-xs sm:text-sm px-3 sm:px-4 py-3 sm:py-4 border-b border-black/20 hover:bg-white/30 transition-colors"
              >
                <div className="font-medium text-center sm:text-left">{i + 1}</div>
                <div className="text-center sm:text-left">2024-03-{String(i + 1).padStart(2, '0')}</div>
                <div className="font-semibold text-blue-700 text-center sm:text-left">INV012{i + 1}</div>
                <div className="text-center sm:text-left">Cashier 0{i + 1}</div>
                <div className="text-center sm:text-left truncate">Customer Name {i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER - Responsive */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-3 sm:gap-0">
          {/* Pagination */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded-full text-black">
              ◀
            </button>
            <span className="text-sm sm:text-base font-medium text-black">
              Page <span className="font-bold">2</span> of <span className="font-bold">2</span>
            </span>
            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded-full text-black">
              ▶
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="px-5 sm:px-6 h-9 sm:h-11 bg-gradient-to-b from-gray-400 to-gray-600 text-white rounded-full font-medium text-sm sm:text-base hover:opacity-90 transition-opacity"
            >
              Cancel
            </button>
            <button className="px-5 sm:px-6 h-9 sm:h-11 bg-gradient-to-b from-[#0E7A2A] to-[#064C18] text-white rounded-full font-medium text-sm sm:text-base hover:from-[#0E8A2A] hover:to-[#065C18] transition-all">
              Recall Invoice
            </button>
          </div>
        </div>

        {/* TITLE */}
        <div className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-transparent">
              Recall Invoice
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecallInvoice;