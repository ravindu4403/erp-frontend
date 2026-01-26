import { useEffect, useState } from "react";
import {
  createCustomer,
  getCustomers,
  type Customer,
  getUserId,
} from "../api/customers";
import api from "../api/axios";

interface CreateEditCustomerProps {
  goBack: () => void;
}

const CreateEditCustomer = ({ goBack }: CreateEditCustomerProps) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address: "",
    telephone: "",
    email: "",
    description: "",
  });

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD CUSTOMERS ---------------- */
  const loadCustomers = async () => {
    try {
      const res = await getCustomers(1, 10);
      setCustomers(res.data.data);
    } catch (err) {
      console.error("Failed to load customers", err);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (editingId) {
        // UPDATE
        await api.patch(`/pos/customer/${editingId}`, {
          first_name: form.first_name,
          last_name: form.last_name,
          address: form.address,
          telephone: form.telephone,
          description: form.description,
          updated_by: getUserId(),
        });
      } else {
        // CREATE
        await createCustomer({
          first_name: form.first_name,
          last_name: form.last_name,
          address: form.address,
          telephone: form.telephone,
          description: form.description,
        });
      }

      setForm({
        first_name: "",
        last_name: "",
        address: "",
        telephone: "",
        email: "",
        description: "",
      });
      setEditingId(null);
      loadCustomers();
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EDIT CUSTOMER ---------------- */
  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setForm({
      first_name: customer.first_name,
      last_name: customer.last_name,
      address: customer.address || "",
      telephone: customer.telephone || "",
      email: "",
      description: customer.description || "",
    });
  };

  return (
   <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
  {/* TOP BAR */}
  <div className="w-350 bg-[#D0D0D0] rounded-full flex items-center justify-between px-4 sm:px-6 py-2 sm:py-10 mb-4 sm:mb-6">
    <button onClick={goBack} className="flex items-center gap-2 font-medium">
      <img src="/Polygon.png" className="w-8 h-8 sm:w-15 sm:h-15" alt="Back" />
      <span className="text-[32px]">POS</span>
    </button>

    <span className="font-bold text-[45px] text-center">
      Create / Edit Customer
    </span>

    <button className="opacity-50 flex items-center gap-2">
      <span className="text-[32px]">POS</span>
      <img src="/Polygon 2.png" className="w-8 h-8 sm:w-15 sm:h-15" alt="POS" />
    </button>
  </div>

  {/* FORM */}
  <div className="w-350 h-150 bg-[#D0D0D0] rounded-2xl p-4 sm:p-6 mb-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <input
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="First Name"
        className="h-20 rounded-full px-4 text-[30px] bg-white"
      />
      <input
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        className="h-20 rounded-full px-4 text-[30px] bg-white"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        rows={4}
        className="rounded-xl px-4 py-3 text-[30px] bg-white"
      />
      <div className="flex flex-col gap-4">
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="h-20 rounded-full px-4 text-[30px] bg-white mt-2"
        />
        <input
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          placeholder="Phone"
          className="h-20 rounded-full px-4 text-[30px] bg-white mt-2"
        />
      </div>
    </div>

    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Description"
      rows={3}
      className="w-full rounded-xl px-4 py-3 text-[30px] bg-white"
    />

    <div className="flex justify-end">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="sm:w-45 h-15 mt-4  bg-gradient-to-b from-[#0E7A2A] to-[#064C18] text-white rounded-full text-[25px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {editingId ? "UPDATE" : "ADD"}
      </button>
    </div>
  </div>

  {/* TABLE CONTAINER */}
  <div className="w-360   bg-[#2F2F2F] rounded-xl p-4 sm:p-6">
    {/* TABLE SCROLL AREA */}
    <div className="overflow-x-auto">
      <div className="overflow-y-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px]">
        <table className="min-w-full text-gray-200 text-[28px]">
          <thead className="bg-[#3A3A3A] sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left">First</th>
              <th className="px-3 py-2 text-left">Last</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Created</th>
              <th className="px-3 py-2 text-left">Credit</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                onClick={() => handleEdit(c)}
                className="hover:bg-[#3B3B3B] cursor-pointer border-b border-[#444] last:border-b-0"
              >
                <td className="px-3 py-2 truncate max-w-[80px]">{c.first_name || "-"}</td>
                <td className="px-3 py-2 truncate max-w-[80px]">{c.last_name || "-"}</td>
                <td className="px-3 py-2 truncate max-w-[120px] sm:max-w-[150px]">{c.address || "-"}</td>
                <td className="px-3 py-2 truncate max-w-[100px]">{c.telephone || "-"}</td>
                <td className="px-3 py-2 truncate max-w-[120px]"></td>
                <td className="px-3 py-2 truncate max-w-[120px] sm:max-w-[150px]">{c.description || "-"}</td>
                <td className="px-3 py-2">
                  {c.created_at
                    ? new Date(c.created_at).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2 text-right font-mono">0.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
};

export default CreateEditCustomer;
