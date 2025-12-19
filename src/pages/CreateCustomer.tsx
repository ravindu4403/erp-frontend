interface CreateCustomerProps {
  onClose: () => void;
}

const CreateCustomer = ({ onClose }: CreateCustomerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-[90%] max-w-md bg-[#D9D9D9] rounded-[20px] p-4 shadow-xl">

        {/* FORM */}
        <div className="grid grid-cols-2 gap-3 text-sm">

          {/* First Name */}
          <div>
            <label className="text-xs font-medium">First Name</label>
            <input
              type="text"
              className="w-full h-8 rounded-full px-3 outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-xs font-medium">Last Name</label>
            <input
              type="text"
              className="w-full h-8 rounded-full px-3 outline-none"
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="text-xs font-medium">Address</label>
            <textarea
              className="w-full h-14 rounded-[12px] px-3 py-2 outline-none resize-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium">Email</label>
            <input
              type="email"
              className="w-full h-8 rounded-full px-3 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-medium">Phone</label>
            <input
              type="text"
              className="w-full h-8 rounded-full px-3 outline-none"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="text-xs font-medium">Description</label>
            <textarea
              className="w-full h-16 rounded-[12px] px-3 py-2 outline-none resize-none"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-black/40 font-bold">Create Customer</span>

          <button
            className="px-8 h-9 bg-gradient-to-b from-[#0E7A2A] to-[#064C18] 
            text-white rounded-full font-medium"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
