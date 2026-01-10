import { useEffect, useState } from "react";
import { getInvoices } from "../api/invoice";

interface RecallInvoiceProps {
  onClose: () => void;
}

interface Invoice {
  id: number;
  previous_invoice_id: number | null;
  customer_id: number;
  created_at: string;
  updated_at: string;
  created_user_id: number;
  status: string;
  paid_amount: number;
  total_amount: number;
  discount_type: string;
  discount_amount: number;
  next_box_number: number;
    // add this to match API
  created_user?: {
    username: string;
    first_name: string;
    last_name: string;
  };
}

const RecallInvoice = ({ onClose }: RecallInvoiceProps) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await getInvoices();
      console.log("Invoices API Response:", res.data);

      // Correct: extract the array from res.data.data
      if (Array.isArray(res.data.data)) {
        setInvoices(res.data.data);
      } else {
        console.error("API did not return an array:", res.data);
        setInvoices([]);
      }
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  fetchInvoices();
}, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl lg:max-w-4xl bg-[#D9D9D9] rounded-xl  p-4 sm:p-6 shadow-2xl">
        <div className="flex items-center bg-white rounded-full px-4 sm:px-6 py-2 sm:py-2 mb-4 sm:mb-3">
          <img
            src="/search.png"
            alt="Search"
            className="w-5 h-5 sm:mt-2 sm:w-5 sm:h-5 mr-2 sm:mr-3 "
          />
          <input
            type="text"
            placeholder="Search Invoice..."
            className="w-full outline-none text-sm sm:text-base bg-transparent placeholder:text-gray-500"
          />
        </div>

        <div className="bg-[#BFBABA] rounded-xl  overflow-hidden">
          <div className="grid grid-cols-5 bg-[#9FA8DA] text-xs sm:text-sm font-semibold text-black px-3 sm:px-4 py-3 sm:py-4">
            <div className="text-center sm:text-left">#</div>
            <div className="text-center sm:text-left">Created At</div>
            <div className="text-center sm:text-left">Invoice No</div>
            <div className="text-center sm:text-left">Created By</div>
            <div className="text-center sm:text-left">Created For</div>
          </div>

          <div className="h-48 sm:h-64 overflow-y-auto">
            {loading && <div className="text-center py-6">Loading...</div>}

            {!loading && invoices.length === 0 && (
              <div className="text-center py-6">No invoices found</div>
            )}

            {!loading &&
              invoices.map((inv, i) => (
                <div
                  key={inv.id}
                  className="grid grid-cols-5 text-xs sm:text-sm px-3 sm:px-4 py-3 sm:py-4 border-b border-black/20 hover:bg-white/30 transition-colors"
                >
                  <div className="font-medium text-center sm:text-left">{i + 1}</div>
                  <div className="text-center sm:text-left">{new Date(inv.created_at).toLocaleDateString()}</div>
                  <div className="font-semibold text-blue-700 text-center sm:text-left">INV{inv.id}</div>
                  <div className="text-center sm:text-left">{inv.created_user_id}</div>
                   <div className="text-center sm:text-left">
    {inv.created_user ? `${inv.created_user.first_name} ${inv.created_user.last_name}` : "-"}
  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-2 gap-3 sm:gap-0">
          <div className="flex items-center ">
            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded-full text-black">
              ◀
            </button>
            <span className="text-sm sm:text-base font-medium text-black">
              Page <span className="font-bold">1</span> of <span className="font-bold">1</span>
            </span>
            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded-full text-black">
              ▶
            </button>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <button className="px-5 sm:px-6 h-9 sm:h-11 bg-[#05522B] text-white rounded-full font-medium text-sm sm:text-base hover:from-[#0E8A2A] hover:to-[#065C18] transition-all">
              Recall Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecallInvoice;
