import { useEffect, useState } from "react";
import { getCustomers, type Customer } from "../api/customers";
import Pagination from "../components/Pagination";

interface AddCustomerProps {
  onClose: () => void;
  onSelect: (customer: Customer) => void;
}

const ITEMS_PER_PAGE = 10;

const AddCustomer = ({ onClose, onSelect }: AddCustomerProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomers(currentPage, ITEMS_PER_PAGE);

      setCustomers(res.data.data);
      setTotalPages(Math.ceil(res.data.total / res.data.limit));
    } catch (e) {
      console.error("Error loading customers:", e);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  // Reload when page changes
  useEffect(() => {
    loadCustomers();
  }, [currentPage]);

  // Reset page & debounce search
  useEffect(() => {
    setCurrentPage(1);
    const delay = setTimeout(loadCustomers, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const handleSelect = () => {
    if (!selected) return;
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[1600px] h-[1000px] bg-[#D9D9D9] rounded-3xl p-10 shadow-2xl">

        {/* Search */}
        <div className="flex items-center bg-white rounded-full px-10 py-5 mb-10">
          <img
            src="/add-customer-search.png"
            alt="Search Customer"
            className="w-16 h-16 mr-5"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Customer..."
            className="w-full h-25 outline-none bg-transparent text-[42px] placeholder:text-gray-500"
          />
        </div>

        {/* Table */}
        <div className="h-[650px] bg-[#BFBABA] rounded-3xl overflow-hidden border-2 border-black/30">
          <div className="grid grid-cols-5 bg-[#9FA8DA] font-semibold text-black text-[42px]">
            <div className="p-8 border-r-2 border-b-2 border-black/30 text-center">#</div>
            <div className="p-8 border-r-2 border-b-2 border-black/30 text-center">Customer Name</div>
            <div className="p-8 border-r-2 border-b-2 border-black/30 text-center">Address</div>
            <div className="p-8 border-r-2 border-b-2 border-black/30 text-center">Phone</div>
            <div className="p-8 border-b-2 border-black/30 text-center">Description</div>
          </div>

          <div className="h-[500px] overflow-y-auto bg-white/30">
            {loading && (
              <div className="text-center py-20 text-[42px] text-gray-600">Loading...</div>
            )}

            {!loading && customers.length === 0 && (
              <div className="text-center py-20 text-[42px] text-gray-600">
                No customers found
              </div>
            )}

            {customers.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className={`grid grid-cols-5 cursor-pointer text-[38px]
                  ${
                    selected?.id === c.id
                      ? "bg-green-300"
                      : "hover:bg-white/40"
                  }`}
              >
                <div className="p-8 border-r-2 border-b-2 border-black/20 text-center">
                  {i + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                </div>
                <div className="p-8 border-r-2 border-b-2 border-black/20 text-center">
                  {c.first_name} {c.last_name}
                </div>
                <div className="p-8 border-r-2 border-b-2 border-black/20 text-center">
                  {c.address || "-"}
                </div>
                <div className="p-8 border-r-2 border-b-2 border-black/20 text-center">
                  {c.telephone || "-"}
                </div>
                <div className="p-8 border-b-2 border-black/20 text-center truncate">
                  {c.description || "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-10">
          {/* Pagination */}
          <div className="flex justify-center text-black">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-10">
            <button
              onClick={onClose}
              className="px-16 h-20 bg-gray-300 rounded-full text-[35px] hover:bg-gray-400 transition-colors min-w-[180px]"
            >
              Cancel
            </button>

            <button
              disabled={!selected}
              onClick={handleSelect}
              className="px-16 h-20 bg-gradient-to-b from-[#05522B] to-[#023618] text-white rounded-full text-[35px] disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#06622B] hover:to-[#034618] transition-all min-w-[180px]"
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