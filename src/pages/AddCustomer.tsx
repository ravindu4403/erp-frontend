interface AddCustomerProps {
  onClose: () => void;
}

const AddCustomer = ({ onClose }: AddCustomerProps) => {
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
          <span className="mr-2">👤</span>
          <input
            type="text"
            placeholder="Search Customer..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* TABLE */}
        <div className="bg-[#BFBABA] rounded-[10px] overflow-hidden">
          {/* HEADER */}
          <div className="grid grid-cols-5 bg-[#9FA8DA] text-[10px] font-semibold text-black px-2 py-2">
            <div>#</div>
            <div>Customer Name</div>
            <div>Address</div>
            <div>Phone</div>
            <div>Email</div>
          </div>

          {/* BODY */}
          <div className="h-32 overflow-y-auto text-[10px]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-5 px-2 py-2 border-b border-black/20"
              >
                <div>{i + 1}</div>
                <div>Customer {i + 1}</div>
                <div>Colombo</div>
                <div>077123456{i}</div>
                <div>test{i}@mail.com</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-black/60">◀ 2 / 2 ▶</span>

          <button className="px-6 h-9 bg-gradient-to-b from-[#0E7A2A] to-[#064C18] text-white rounded-full font-medium">
            Select
          </button>
        </div>

        {/* TITLE */}
        <div className="absolute -bottom-6 left-0 right-0 text-center text-black/40 font-bold">
          Add Customer
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
