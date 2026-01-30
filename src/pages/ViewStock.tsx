import { useState, useEffect } from "react";
import api from "../api/axios"; // make sure this is your axios instance
import Pagination from "../components/Pagination";

interface ViewStockProps {
  goBack: () => void; // Function to navigate back to the main menu
}

interface Stock {
  id: number;
  name: string;
  other_name?: string;
  type_name?: string;
  category_name?: string;
  sub_category_name?: string;
  sku?: string;
  description?: string;
  rack?: string;
  outlet_name?: string;
  origin?: string;
  buy_price?: number;
  retail_price?: number;
  stock_price?: number;
  quantity?: number;
  unit?: string;
  created_at?: string;
  status?: string;
}

// API call
const getStocks = async (take = 20, skip = 0, name = "") => {
  return api.get("/store/stocks", { params: { take, skip, name } });
};

// Unify page state
const ViewStock = ({ goBack }: ViewStockProps) => {
  // Unify page state
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const take = 20;

  const loadStocks = async (pageNumber: number, searchQuery = search) => {
    try {
      setLoading(true);

      // When searching, load more rows in a single request so we can filter by item name / SKU / description.
      const query = (searchQuery || "").trim();
      const effectiveTake = query ? 500 : take;
      const skip = query ? 0 : (pageNumber - 1) * take;

      const res = await getStocks(effectiveTake, skip, query);

      // Normalize common backend response shapes:
      // - { data: [...], total: number }
      // - { data: { data: [...], total: number } }
      const raw = res.data?.data ?? res.data;
      const list = raw?.data ?? raw ?? [];
      const totalCount =
        raw?.total ??
        raw?.meta?.total ??
        raw?.pagination?.total ??
        raw?.count ??
        (Array.isArray(list) ? list.length : 0);

      // Client-side search across multiple fields (name, sku, description)
      const q = query.toLowerCase();
      const filtered = q
        ? (Array.isArray(list) ? list : []).filter((s: any) => {
            const name = s?.item?.name ?? s?.name ?? "";
            const sku = s?.item?.sku ?? s?.sku ?? "";
            const desc = s?.item?.description ?? s?.description ?? "";

            return (
              String(name).toLowerCase().includes(q) ||
              String(sku).toLowerCase().includes(q) ||
              String(desc).toLowerCase().includes(q)
            );
          })
        : (Array.isArray(list) ? list : []);

      setStocks(filtered);
      setTotal(query ? filtered.length : totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStocks(1, search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadStocks(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(total / take) || 1;

  const isSearching = (search || "").trim().length > 0;
  const displayedStocks = isSearching
    ? stocks.slice((currentPage - 1) * take, currentPage * take)
    : stocks;

  return (
    <div className="w-[1200px] h-[1920px] bg-black flex flex-col items-center p-10 mx-auto overflow-hidden">

      {/* TOP BAR */}
      <div className="w-full shrink-0 bg-[#D9D9D9] rounded-full flex items-center justify-between px-6 py-8 mb-10">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-[29px] text-black"
        >
          <img src="/Polygon.png" className="w-12 h-12" alt="Back" />
          Main menu
        </button>

        <span className="font-bold text-[48px] text-black">
          View Stock
        </span>

        <button className="flex items-center gap-2 text-[29px] text-black opacity-50">
          Main menu
          <img src="/Polygon 2.png" className="w-12 h-12" alt="Next" />
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="w-full max-w-[1100px] bg-white rounded-full flex items-center px-8 py-5 mb-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] border-2 border-white/20">
        <img src="/search.png" alt="Search" className="w-12 h-12 mr-6 opacity-60" />
        <input
          type="text"
          placeholder="Search items by name..."
          className="w-full bg-transparent outline-none text-[35px] text-black placeholder:text-gray-400 font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE CONTAINER */}
      <div className="w-full flex-1 flex flex-col items-center overflow-hidden mb-8">
        <div className="w-full max-w-[1100px] h-full overflow-x-auto border border-white/20 rounded-[30px] bg-[#2F2F2F] shadow-2xl flex flex-col">

          {/* HEADER */}
          <div className="min-w-[2800px] bg-[#243A9B] text-white text-[32px] font-bold grid grid-cols-17 sticky top-0">
            {[
              "Name", "Sinhala Name", "Type", "Category", "Sub Category", "SKU",
              "Description", "Rack", "Outlet", "Origin",
              "Buying Price", "Retail Price", "Wholesale Price",
              "Quantity", "Unit", "Created At", "Status"
            ].map((h, i) => (
              <div key={i} className="px-4 py-6 border-r border-white/20 truncate text-center">
                {h}
              </div>
            ))}
          </div>

          {/* BODY */}
          <div className="min-w-[2800px] flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full text-white text-[40px]">
                Loading stocks...
              </div>
            ) : stocks.length === 0 ? (
              <div className="flex items-center justify-center h-full text-white/50 text-[40px]">
                No stocks found used
              </div>
            ) : (
              displayedStocks.map((stock, idx) => (
                <div key={stock.id || idx} className="grid grid-cols-17 bg-[#3A3A3A] border-b border-white/10 hover:bg-white/5 text-[28px] text-white">
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.name}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.other_name || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.type_name || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.category_name || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.sub_category_name || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.sku || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.description || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.rack || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.outlet_name || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{(stock as any)["item.origin"] || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">LKR {stock.buy_price || "0"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">LKR {stock.retail_price || "0"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">LKR {stock.stock_price || "0"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.quantity || "0"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.unit || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.created_at?.split("T")[0] || "-"}</div>
                  <div className="px-4 py-4 border-r border-white/10 truncate text-center">{stock.status || "-"}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="shrink-0 mb-8 scale-[1.5]  text-white">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ViewStock;

