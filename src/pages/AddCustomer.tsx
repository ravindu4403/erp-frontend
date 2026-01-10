import { useEffect, useState } from "react";
import { getCustomers} from "../api/customers";

// Props for AddCustomer modal
interface AddCustomerProps {
  onClose: () => void;
  onSelect: (customer: Customer) => void;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  description?: string;
}

const AddCustomer = ({ onClose, onSelect }: AddCustomerProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch customers from API
const loadCustomers = async () => {
  try {
    setLoading(true);

    const res = await getCustomers(currentPage, 10);

    const mapped = res.data.data.map((c: any) => ({
      id: c.id,
      firstName: c.first_name,
      lastName: c.last_name,
      phone: c.telephone,
      address: c.address,
      description: c.description,
    }));

    setCustomers(mapped);
    setTotalPages(Math.ceil(res.data.total / res.data.limit));

  } catch (e) {
    console.error("Error loading customers:", e);
    alert("Failed to load customers");
  } finally {
    setLoading(false);
  }
};


  // SEARCH DELAY with page reset
  useEffect(() => {
    setCurrentPage(1); // Reset to first page on new search
    const delay = setTimeout(loadCustomers, 400);
    return () => clearTimeout(delay);
  }, [search]);

  // Load customers when page changes
  useEffect(() => {
    loadCustomers();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleSelect = () => {
    if (selected) {
      onSelect(selected);
      onClose(); // Close modal after selection
    }
  };

  // Calculate starting index for numbering
  const getItemNumber = (index: number) => {
    return index + 1 + (currentPage - 1) * 10;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl lg:max-w-4xl bg-[#D9D9D9] rounded-xl p-4 sm:p-6 shadow-2xl">

        {/* SEARCH */}
        <div className="flex items-center bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-3">
          <img
            src="/add-customer-search.png"
            alt="Search Customer"
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Customer..."
            className="w-full outline-none text-sm sm:text-base bg-transparent placeholder:text-gray-500"
          />
        </div>

        {/* TABLE */}
        <div className="bg-[#BFBABA] rounded-xl sm:rounded-2xl overflow-hidden border border-black/30">
          {/* HEADER */}
          <div className="grid grid-cols-5 bg-[#9FA8DA] text-xs sm:text-sm font-semibold text-black">
            <div className="p-3 sm:p-4 border-r border-b border-black/30 text-center sm:text-left">
              #
            </div>
            <div className="p-3 sm:p-4 border-r border-b border-black/30">
              Customer Name
            </div>
            <div className="p-3 sm:p-4 border-r border-b border-black/30">
              Address
            </div>
            <div className="p-3 sm:p-4 border-r border-b border-black/30">
              Phone
            </div>
            <div className="p-3 sm:p-4 border-b border-black/30">
              Description
            </div>
          </div>

          {/* BODY */}
          <div className="h-64 overflow-y-auto bg-white/30">
            {loading && (
              <div className="text-center py-6">Loading...</div>
            )}

            {!loading && customers.length === 0 && (
              <div className="text-center py-6">No customers found</div>
            )}

            {customers.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className={`grid grid-cols-5 text-xs sm:text-sm cursor-pointer
                  ${selected?.id === c.id ? "bg-green-300" : "hover:bg-white/40"}`}
              >
                <div className="p-3 border-r border-b border-black/20 text-center sm:text-left">
                  {i + 1 + (currentPage - 1) * 10}
                </div>

                <div className="p-3 border-r border-b border-black/20">
                  {c.firstName} {c.lastName}
                </div>

                <div className="p-3 border-r border-b border-black/20">
                  {c.address || "-"}
                </div>

                <div className="p-3 border-r border-b border-black/20">
                  {c.phone || "-"}
                </div>

                <div className="p-3 border-b border-black-20 truncate">
                  {c.description || "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 sm:gap-0">
          {/* Pagination */}
          <div className="flex items-center">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded-full text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ◀
            </button>
            <span className="text-sm sm:text-base font-medium text-black mx-3">
              Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
            </span>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded-full text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ▶
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="px-5 sm:px-6 h-9 sm:h-11 bg-gray-300 text-black rounded-full font-medium text-sm sm:text-base hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={!selected}
              onClick={handleSelect}
              className="px-5 sm:px-6 h-9 sm:h-11 sm:w-35 bg-[#05522B] text-white rounded-full font-medium text-sm sm:text-base hover:bg-[#0E8A2A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;