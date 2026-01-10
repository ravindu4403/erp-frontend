import { useEffect, useState } from "react";
import { getItems } from "../api/items";

interface SelectProductsProps {
  onClose: () => void;
  onAdd: (product: any) => void;
}

interface Item {
  id: number;
  sub_category_id: number;
  name: string;
  other_name: string;
  description: string;
  origin: string;
  sku: string;
  created_at: string;
}

const SelectProducts = ({ onClose, onAdd }: SelectProductsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState<string>("1");
  const [wholesalePrice, setWholesalePrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await getItems(search);
        console.log("Items API Response:", res.data);
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else if (res.data.data && Array.isArray(res.data.data)) {
          setItems(res.data.data);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Error fetching items:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [search]);

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
    // Set default selling price (you can adjust this logic)
    const price = Math.random() * 100 + 10; // Random price for demo
    setSellingPrice(price.toFixed(2));
  };

  const handleAddToInvoice = () => {
    if (!selectedItem) {
      alert("Please select an item first");
      return;
    }

    const qty = parseInt(quantity) || 1;
    const price = parseFloat(sellingPrice) || 0;

    const product = {
      id: selectedItem.id,
      sku: selectedItem.sku,
      name: selectedItem.name,
      description: selectedItem.description,
      unitPrice: price,
      qty: qty
    };

    // Call the parent's onAdd function
    onAdd(product);
    
    // Reset form
    setSelectedItem(null);
    setQuantity("1");
    setSellingPrice("");
    setWholesalePrice("");
    
    // Show success message (optional)
    alert("Product added to invoice!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl lg:max-w-4xl bg-[#D9D9D9] rounded-xl sm:rounded-xl p-4 sm:p-6 shadow-2xl">
        {/* SEARCH */}
        <div className="flex items-center bg-white rounded-[12px] px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
          <img
            src="./search-products.png"
            alt="Search"
            className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6"
          />
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full outline-none text-sm sm:text-base bg-transparent placeholder:text-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="bg-[#A0A0A0] rounded-xl sm:rounded-xl overflow-hidden ">
          {/* HEADER */}
          <div className="grid grid-cols-5 bg-[#2F2F2F] text-xs sm:text-sm font-semibold text-white px-3 sm:px-4 py-3 sm:py-4">
            <div className="text-center sm:text-left">#</div>
            <div className="text-center sm:text-left">SKU</div>
            <div className="text-center sm:text-left">Description</div>
            <div className="text-center sm:text-left">Item Name</div>
            <div className="text-center sm:text-left">Outlet</div>
          </div>

          {/* ROWS */}
          <div className="h-36 sm:h-48 overflow-y-auto">
            {loading && <div className="text-center py-6">Loading...</div>}

            {!loading && items.length === 0 && (
              <div className="text-center py-6">No items found</div>
            )}

            {!loading &&
              items.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  className={`grid grid-cols-5 text-xs sm:text-sm px-3 sm:px-4 py-3 sm:py-4 border-b border-white/10 hover:bg-white/10 transition-colors cursor-pointer ${selectedItem?.id === item.id ? 'bg-blue-100' : ''}`}
                >
                  <div className="text-center sm:text-left">{i + 1}</div>
                  <div className="text-center sm:text-left font-medium">{item.sku}</div>
                  <div className="text-center sm:text-left">{item.description}</div>
                  <div className="text-center sm:text-left">{item.name}</div>
                  <div className="text-center sm:text-left">{item.origin}</div>
                </div>
              ))}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center mt-2">
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

        {/* FORM - Responsive */}
        <div className="flex flex-col items-end mt-4">
          {/* Selected Product */}
          <div className="w-full sm:w-auto rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Selected:</span>
                <span className="text-blue-700 font-bold text-sm sm:text-base">
                  {selectedItem ? selectedItem.sku : "None"}
                </span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Add quantity"
                  className="w-full sm:w-45 bg-white px-3 sm:px-4 py-2 rounded-[14px] outline-none focus:ring-2 focus:ring-blue-500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Wholesale Price */}
          <div className="w-full sm:w-auto rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Wholesale Price:</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Enter wholesale price"
                  className="w-full sm:w-45 bg-white px-3 sm:px-4 py-2 rounded-[14px] outline-none focus:ring-2 focus:ring-blue-500"
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(e.target.value)}
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Selling Price */}
          <div className="w-full sm:w-auto rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Selling Price:</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Enter selling price"
                  className="w-full sm:w-45 bg-white px-3 sm:px-4 py-2 rounded-[14px] outline-none focus:ring-2 focus:ring-blue-500"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-4">
          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="px-6 sm:px-8 h-9 sm:h-11 bg-gradient-to-b from-[#F59B9B] via-[#ED654A] to-[#3B0202] text-white rounded-full font-medium text-sm sm:text-base hover:from-[#F5ABAB] hover:to-[#ED755A] transition-all flex items-center gap-2"
            >
              CANCEL
            </button>
            
            <button
              onClick={handleAddToInvoice}
              disabled={!selectedItem}
              className="px-6 sm:px-8 h-9 sm:h-11 bg-gradient-to-b from-[#0E7A2A] to-[#064C18] text-white rounded-full font-medium text-sm sm:text-base hover:from-[#0E8A2A] hover:to-[#065C18] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>ADD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProducts;