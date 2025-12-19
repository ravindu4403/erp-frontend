import { useState } from "react";
import RecallInvoice from "./RecallInvoice";
import CancelInvoiceConfirm from "./CancelInvoiceConfirm";
import AddCustomer from "./AddCustomer";
import CreateCustomer from "./CreateCustomer";
import SelectProducts from "./SelectProducts";
import SendInvoiceConfirm from "./SendInvoiceConfirm";



interface CreateInvoiceProps {
  goBack: () => void;
}



const CreateInvoice = ({ goBack }: CreateInvoiceProps) => {

const [showRecall, setShowRecall] = useState(false);
const [showCancelConfirm, setShowCancelConfirm] = useState(false);
const [showAddCustomer, setShowAddCustomer] = useState(false);
const [showCreateCustomer, setShowCreateCustomer] = useState(false);
const [showProducts, setShowProducts] = useState(false);
const [showSendConfirm, setShowSendConfirm] = useState(false);




  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 ">
      
      {/* Top Bar - EXACT SAME as PosMainMenu */}
      <div className="w-full max-w-md bg-[#D9D9D9] rounded-full flex items-center justify-between px-4 py-2 mb-3">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <img
            src="/Polygon.png"
            alt="Back"
            className="w-4 h-4"
          />
          POS
        </button>
        <span className="font-bold text-[15px] text-black">Create New Invoice</span>
        <button className="flex items-center gap-2 text-sm font-medium text-black opacity-50">
     POS
          <img
            src="/Polygon 2.png"
            alt="Next"
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* Main Content - Adjusted for max-w-md like main menu */}
      <div className="w-full max-w-md ">
        
<div className="w-full flex justify-between mb-3">
  <button 
   onClick={() => setShowRecall(true)}
  className="w-[48%] h-11 bg-gradient-to-b from-[#9BF5AD] via-[#4AED80] to-[#053E0A] text-white rounded-full font-medium text-[15px]">
    Recall Invoice
  </button>

  <button 
   onClick={() => setShowCancelConfirm(true)}
   className="w-[48%] h-11 bg-gradient-to-b from-[#F59B9B] via-[#ED654A] to-[#3B0202] text-white rounded-full font-medium text-[15px]">
    Cancel  Invoice
  </button>
</div>
          
        {/* Recall Invoice Card */}
        <div className="bg-gradient-to-b from-[#D9D9D9] via-[#827E7E] to-[#676464] rounded-[20px] p-2 mb-3">
         
         <div className="w-full flex gap-2 mb-3 mt-2 ml-2">
 <button
  className="w-[18%] h-35 bg-gradient-to-b from-[#9BF5A3] via-[#72ED4A] to-[#023B06]
  text-white rounded-[20px] font-medium
  flex flex-col items-center justify-center gap-3"
>
  <img
    src="/lets-icons_user-alt-fill.png"
    alt="Add Customer"
    className="w-12 h-12"
  />

  <span 
  onClick={() => setShowAddCustomer(true)}
  className="text-[10px] mt-[-18px]">Add<br></br>Customer</span>
</button>

<button
  className="w-[18%] h-35 bg-gradient-to-b from-[#A19BF5] via-[#4A5DED] to-[#02043B]
  text-white rounded-[20px] font-medium
  flex flex-col items-center justify-center gap-3"
>
  <img
    src="/typcn_user-add.png"
    alt="Create Customer"
    className="w-12 h-12  ml-3"
  />

  <span 
  onClick={() => setShowCreateCustomer(true)}className="text-[10px] mt-[-18px] ">Create<br></br> Customer</span>
</button>
{/* RIGHT SIDE INFO */}
    <div className="flex-1 text-[12px] text-white pl-4 mt-5">
      <div className="flex ">
        <span className="font-semibold w-24">Bill For</span>
        <span>: <span className="text-blue-700 font-bold">Ranga Madhushan</span></span>
      </div>

      <div className="flex ">
        <span className="font-semibold w-24">Bill No</span>
        <span>: <span className="text-blue-700 font-bold">INV01258</span></span>
      </div>

      <div className="flex  mb-3">
        <span className="font-semibold w-24">Billing by</span>
        <span>: <span className="text-blue-700 font-bold">Cashier 0025</span></span>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <span className="font-semibold w-24">Bag/Box<br></br> Quantity</span>
        <div className="flex h-10 items-center bg-[#D9D9D9] rounded-[10px] px-2 py-1 gap-2 shadow">
          <button className="w-6 h-6 bg-green-700 text-white rounded flex items-center justify-center">
            +
          </button>
          <span className="font-bold text-blue-700 w-6 text-center">25</span>
          <button className="w-6 h-6 bg-red-700 text-white rounded flex items-center justify-center">
            −
          </button>
        </div>
      </div>
    </div>

</div>



        </div>
       <button 
       onClick={() => setShowProducts(true)}
       className="w-full h-11 bg-gradient-to-b from-[#807CFE] via-[#574AED] to-[#0A053E] text-white rounded-full font-bold text-[15px] mb-3 ">
    Add Items To Invoice
  </button>

     {/* ITEMS TABLE */}
<div className="w-full max-w-md h-100 bg-[#2F2F2F] rounded-[5px] overflow-hidden mb-4">

  {/* Table Header */}
  <div className="grid grid-cols-6 text-[10px] text-white bg-[#3A3A3A] px-2 py-2 font-semibold">
    <div>Item<br />Number</div>
    <div>SKU</div>
    <div>Item Name</div>
    <div>Description</div>
    <div>Unit Price</div>
    <div>Quantity</div>
  </div>

  {/* Table Body */}
  <div className="h-48 overflow-y-auto text-[10px] text-white">
    {/* Row */}
    <div className="grid grid-cols-6 px-2 py-2 border-b border-white/10">
      <div>01</div>
      <div>FUA1245</div>
      <div>Ben 10 action figure</div>
      <div>85752453</div>
      <div>100.00</div>
      <div className="flex items-center justify-center">
        <span className="px-2 py-1 border border-lime-400 rounded text-lime-400">
          5
        </span>
      </div>
    </div>

    {/* Empty rows (visual only) */}
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="grid grid-cols-6 px-2 py-3 border-b border-white/5"
      >
        <div>&nbsp;</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    ))}
  </div>

  {/* Bottom Summary */}
  <div className="flex w-full h-text-[10px] font-semibold">
    <div className="w-1/2 bg-[#1E40FF] text-white px-2 py-2">
      Total Item count<br />- 12
    </div>
    <div className="w-1/2 bg-[#1F4D1F] text-white px-2 py-2 text-right">
      Total Amount - 5500.00
    </div>
  </div>
</div>

{/* SEND TO CASHIER BUTTON */}
<button
onClick={() => setShowSendConfirm(true)}
className="w-full h-12 bg-gradient-to-b from-[#7CFE96] via-[#4AED7B] to-[#053#13]
 text-white rounded-[10px] font-bold text-[15px] flex items-center justify-center gap-2">
  Send Invoice to cashier
  <span className="text-xl">➤</span>
</button>  

      </div>

      {showRecall && (
  <RecallInvoice onClose={() => setShowRecall(false)} />
)}

{showCancelConfirm && (
  <CancelInvoiceConfirm
    onClose={() => setShowCancelConfirm(false)}
    onConfirm={() => {
      setShowCancelConfirm(false);
      // 👉 add cancel logic here
      console.log("Invoice Cancelled");
    }}
  />
)}

{showAddCustomer && (
  <AddCustomer onClose={() => setShowAddCustomer(false)} />
)}

{showCreateCustomer && (
  <CreateCustomer onClose={() => setShowCreateCustomer(false)} />
)}

{showProducts && (
  <SelectProducts onClose={() => setShowProducts(false)} />
)}

{showSendConfirm && (
  <SendInvoiceConfirm
    onConfirm={() => {
      setShowSendConfirm(false);
      console.log("Invoice sent to cashier");
      // 👉 API call / navigation here
    }}
    onClose={() => setShowSendConfirm(false)}
  />
)}


    </div>
  );
};

export default CreateInvoice;