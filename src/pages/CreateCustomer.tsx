import { useState } from "react";
import { createCustomer } from "../api/customers";

interface CreateCustomerProps {
  onClose: () => void;
  onCreated?: (customer: any) => void;

}

const CreateCustomer = ({ onClose, onCreated }: CreateCustomerProps) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName) {
      alert("First name and last name are required");
      return;
    }

    try {
      setLoading(true);

      const res = await createCustomer(form);

      // ✅ pass created customer back
      onCreated?.(res.data);

      onClose();
    } catch (err) {
      alert("Failed to create customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL - Same size as RecallInvoice and AddCustomer */}
      <div className="relative w-full max-w-2xl lg:max-w-3xl bg-[#D9D9D9] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">

        {/* FORM - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">

          {/* First Name */}
          <div>
            <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full h-8 sm:h-10 rounded-full px-3 sm:px-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">Last Name</label>
            <input
              type="text"
              name="lastName"
  value={form.lastName}
  onChange={handleChange}
              className="w-full h-8 sm:h-10 rounded-full px-3 sm:px-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">Address</label>
            <textarea
            name="address"
  value={form.address}
  onChange={handleChange}
              className="w-full h-14 sm:h-20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">Email</label>
            <input
              type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
              className="w-full h-8 sm:h-10 rounded-full px-3 sm:px-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">Phone</label>
            <input
              type="text"
  name="phone"
  value={form.phone}
  onChange={handleChange}
              className="w-full h-8 sm:h-10 rounded-full px-3 sm:px-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">Description</label>
            <textarea
             name="description"
  value={form.description}
  onChange={handleChange}
              className="w-full h-16 sm:h-24 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        </div>

        {/* FOOTER - Same layout as other modals */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-3 sm:gap-0">
          {/* Title - Same style as RecallInvoice */}
          <div className="text-center sm:text-left">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-transparent">
                Create Customer
              </span>
            </div>
          </div>

          {/* Action Buttons - Same as RecallInvoice */}
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="px-5 sm:px-6 h-9 sm:h-11 bg-gradient-to-b from-gray-400 to-gray-600 text-white rounded-full font-medium text-sm sm:text-base hover:opacity-90 transition-opacity"
            >
              Cancel
            </button>
            <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 sm:px-8 h-9 sm:h-11 bg-gradient-to-b from-[#0E7A2A] to-[#064C18] text-white rounded-full font-medium text-sm sm:text-base hover:from-[#0E8A2A] hover:to-[#065C18] transition-all flex items-center gap-2"
            >
              {loading ? "Saving..." : "ADD +"}
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;