interface CreateEditCustomerProps {
  goBack: () => void;
}

const CreateEditCustomer = ({ goBack }: CreateEditCustomerProps) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">

      {/* Top Bar - Responsive */}
      <div className="w-full max-w-2xl bg-[#D9D9D9] rounded-full flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm sm:text-base md:text-[17px] font-medium text-black"
        >
          <img 
            src="/Polygon.png" 
            alt="Back" 
            className="w-4 h-4 sm:w-5 sm:h-5" 
          />
          POS
        </button>

        <span className="font-bold text-[15px] sm:text-xl md:text-[25px] text-black">
          Create / Edit Customer
        </span>

        <button className="flex items-center gap-2 text-sm sm:text-base md:text-[17px] font-medium text-black opacity-50">
          POS
          <img 
            src="/Polygon 2.png" 
            alt="Next" 
            className="w-4 h-4 sm:w-5 sm:h-5" 
          />
        </button>
      </div>

      {/* Form Card - Responsive */}
      <div className="w-full max-w-2xl bg-[#D9D9D9] rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6">

        {/* Name Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <input 
            placeholder="First Name" 
            className="w-full h-10 sm:h-14 rounded-full px-4 sm:px-6 py-2 outline-none text-sm sm:text-[16px] focus:ring-2 focus:ring-blue-500"
          />
          <input 
            placeholder="Last Name" 
            className="w-full h-10 sm:h-14 rounded-full px-4 sm:px-6 py-2 outline-none text-sm sm:text-[16px] focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address, Email, Phone - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Address */}
          <textarea
            placeholder="Address"
            className="rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 outline-none resize-none text-sm sm:text-[16px] h-32 sm:h-40 focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
          
          {/* Email & Phone */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <input 
              placeholder="Email" 
              className="w-full h-10 sm:h-14 rounded-full px-4 sm:px-6 py-2 outline-none text-sm sm:text-[16px] focus:ring-2 focus:ring-blue-500"
            />
            <input 
              placeholder="Phone" 
              className="w-full h-10 sm:h-14 rounded-full px-4 sm:px-6 py-2 outline-none text-sm sm:text-[16px] focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          className="rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 outline-none resize-none text-sm sm:text-[16px] w-full h-32 sm:h-40 mb-4 sm:mb-6 focus:ring-2 focus:ring-blue-500"
          rows={5}
        />

        {/* ADD Button - Larger on tablet */}
        <button className="w-24 sm:w-32 h-9 sm:h-12 bg-gradient-to-b from-[#0E7A2A] to-[#064C18] text-white rounded-full font-medium text-sm sm:text-base ml-auto block hover:from-[#0E8A2A] hover:to-[#065C18] transition-all">
          ADD
        </button>
      </div>

      {/* Table Placeholder - Responsive */}
      <div className="w-full max-w-2xl bg-[#2F2F2F] rounded-xl sm:rounded-2xl h-48 sm:h-64">
        {/* Optional: Add table content here if needed */}
        <div className="h-full flex items-center justify-center text-gray-400 text-sm sm:text-base">
          Customer List / Table Area
        </div>
      </div>
    </div>
  );
};

export default CreateEditCustomer;