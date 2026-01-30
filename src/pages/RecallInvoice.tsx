import { useEffect, useMemo, useState } from "react";
import { getInvoices } from "../api/invoice";
import { getCustomers } from "../api/customers";
import Pagination from "../components/Pagination";

interface RecallInvoiceProps {
  onClose: () => void;
  onRecall: (invoiceId: number) => void;
}

const ITEMS_PER_PAGE = 10;

const RecallInvoice = ({ onClose, onRecall }: RecallInvoiceProps) => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Map customer_id -> customer name (used when invoice payload doesn't include customer details)
  const [customerMap, setCustomerMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const res = await getInvoices();
        const raw = res.data?.data ?? res.data ?? [];
        setInvoices(Array.isArray(raw) ? raw : []);
      } catch (err) {
        console.error("Error fetching invoices", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    // Best-effort: fetch customers once and build a lookup map.
    // (If the backend has pagination, we request a large page size.)
    const fetchCustomers = async () => {
      try {
        const res = await getCustomers(1, 1000, "");
        const raw = res.data?.data ?? res.data ?? [];
        const list = Array.isArray(raw) ? raw : raw?.data ?? [];
        const map: Record<number, string> = {};

        (Array.isArray(list) ? list : []).forEach((c: any) => {
          const id = Number(c?.id ?? c?.customer_id ?? c?.customerId);
          const name = c?.name ?? c?.full_name ?? c?.customer_name;
          if (Number.isFinite(id) && id > 0 && typeof name === "string" && name.trim()) {
            map[id] = name.trim();
          }
        });

        setCustomerMap(map);
      } catch (err) {
        console.warn("Could not fetch customers for recall list.", err);
      }
    };

    fetchCustomers();
  }, []);

  const getInvoiceCustomerId = (inv: any): number | null => {
    const id =
      inv?.customer_id ??
      inv?.customerId ??
      inv?.customer?.id ??
      inv?.customer?.customer_id ??
      inv?.customer?.customerId;

    const n = Number(id);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const getInvoiceCustomerName = (inv: any): string => {
    const direct =
      inv?.customer_name ??
      inv?.customer?.name ??
      inv?.customer?.full_name ??
      inv?.customer?.customer_name;

    if (typeof direct === "string" && direct.trim()) return direct.trim();

    const id = getInvoiceCustomerId(inv);
    if (id && customerMap[id]) return customerMap[id];

    // Final fallback (never show "undefined")
    return id ? `Customer ${id}` : "Unknown customer";
  };

  const allowedStatuses = useMemo(() => new Set(["PENDING", "ACTIVE"]), []);

  const filteredInvoices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return invoices
      .filter((inv) => {
        const status = String(inv?.status ?? "").toUpperCase();
        return allowedStatuses.has(status);
      })
      .filter((inv) => {
        if (!q) return true;
        const invoiceNo = String(inv?.invoice_no ?? inv?.invoiceNo ?? "").toLowerCase();
        const customerName = getInvoiceCustomerName(inv).toLowerCase();
        const createdBy = String(inv?.created_by?.name ?? inv?.created_by_name ?? inv?.createdBy ?? "").toLowerCase();
        return invoiceNo.includes(q) || customerName.includes(q) || createdBy.includes(q);
      });
  }, [invoices, searchQuery, allowedStatuses, customerMap]);

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);

  const paginatedInvoices = filteredInvoices.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[900px] max-w-[95%] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recall Invoice</h2>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
          >
            ✖
          </button>
        </div>

        <input
          type="text"
          placeholder="Search invoice..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />

        {loading ? (
          <p>Loading invoices...</p>
        ) : (
          <>
            <div className="overflow-auto max-h-[400px]">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Created At</th>
                    <th className="p-2 border">Invoice No</th>
                    <th className="p-2 border">Created By</th>
                    <th className="p-2 border">Customer</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((inv, index) => (
                    <tr key={inv.id} className="text-center hover:bg-gray-100">
                      <td className="p-2 border">
                        {(page - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="p-2 border">
                        {inv.created_at ? new Date(inv.created_at).toLocaleDateString() : "-"}
                      </td>
                      <td className="p-2 border text-blue-600 font-medium">
                        {inv.invoice_no ?? inv.invoiceNo ?? "-"}
                      </td>
                      <td className="p-2 border">
                        {inv.created_by?.name ?? inv.created_by_name ?? inv.createdBy ?? "Unknown"}
                      </td>
                      <td className="p-2 border">{getInvoiceCustomerName(inv)}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => onRecall(inv.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Recall
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedInvoices.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-3 text-center text-gray-500">
                        No pending/active invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecallInvoice;
