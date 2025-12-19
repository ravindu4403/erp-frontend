interface CreateEditCustomerProps {
  goBack: () => void;
}

const CreateEditCustomer = ({ goBack }: CreateEditCustomerProps) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">

      {/* Top Bar */}
      <div className="w-full max-w-md bg-[#D9D9D9] rounded-full flex items-center justify-between px-4 py-2 mb-4">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <img src="/Polygon.png" alt="Back" className="w-4 h-4" />
          POS
        </button>

        <span className="font-bold text-[15px]">Create / Edit Customer</span>

        <button className="flex items-center gap-2 text-sm font-medium opacity-50">
          POS
          <img src="/Polygon 2.png" alt="Next" className="w-4 h-4" />
        </button>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-[#D9D9D9] rounded-[20px] p-4 mb-4">

        <div className="grid grid-cols-2 gap-3 mb-3">
          <input placeholder="First Name" className="rounded-full px-4 py-2 text-sm" />
          <input placeholder="Last Name" className="rounded-full px-4 py-2 text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <textarea
            placeholder="Address"
            className="rounded-[10px] px-4 py-2 text-sm col-span-1 h-20"
          />
          <div className="flex flex-col gap-3">
            <input placeholder="Email" className="rounded-full px-4 py-2 text-sm" />
            <input placeholder="Phone" className="rounded-full px-4 py-2 text-sm" />
          </div>
        </div>

        <textarea
          placeholder="Description"
          className="rounded-[10px] px-4 py-2 text-sm w-full h-24 mb-3"
        />

        <button className="w-24 h-9 bg-gradient-to-b from-[#0E7A2A] to-[#064C18] text-white rounded-full font-medium ml-auto block">
          ADD
        </button>
      </div>

      {/* Table Placeholder */}
      <div className="w-full max-w-md bg-[#2F2F2F] rounded-[10px] h-64"></div>
    </div>
  );
};

export default CreateEditCustomer;
