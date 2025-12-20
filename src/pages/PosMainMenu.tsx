import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateInvoice from "./CreateInvoice";
import CreateEditCustomer from "./CreateEditCustomer";
import ViewPreviousInvoice from "./ViewPreviousInvoice";

const PosMainMenu = () => {
  const navigate = useNavigate();

  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  const [showViewInvoice, setShowViewInvoice] = useState(false);

  if (showCreateInvoice) {
    return <CreateInvoice goBack={() => setShowCreateInvoice(false)} />;
  }

  if (showCreateCustomer) {
    return <CreateEditCustomer goBack={() => setShowCreateCustomer(false)} />;
  }

  if (showViewInvoice) {
    return <ViewPreviousInvoice goBack={() => setShowViewInvoice(false)} />;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 ">
      
      {/* Top Bar */}
      <div className="w-[500px]  bg-gray-200 rounded-full flex items-center justify-between px-4 py-3 mb-8">
       <button
  onClick={() => navigate("/main-menu")}
  className="flex items-center gap-2 text-[17px]"
>
  <img
    src="/Polygon.png"
    alt="Back"
    className="w-6 h-6"
  />
  Main menu
</button>
        <span className="font-bold text-[25px]">POS</span>
       <button className="flex items-center gap-2 text-[17px]">
  Main menu
  <img
    src="/Polygon 2.png"
    alt="Next"
    className="w-6 h-6"
  />
</button>
      </div>

      {/* Buttons Container */}
      <div className="w-full max-w-md flex flex-col gap-6">

        {/* Create New Invoice */}
        <button 
         onClick={() => setShowCreateInvoice(true)}
        className="flex items-center justify-between rounded-[80px] p-6 h-60 text-white bg-gradient-to-b from-[#7D77ED] via-[#251DCC] to-[#191388]">
          
          <div className="text-left">
            <h2 className="text-3xl font-bold leading-snug ml-5">
              Create<br />New<br />Invoice
            </h2>
          </div>
          <div className="text-5xl">
  <img
    src="/mdi_invoice-text-plus.png"
    alt="Create Invoice"
    className="w-30 h-30"
  />
</div>
        </button>

        {/* View Previous Invoice */}
        <button
         onClick={() => setShowViewInvoice(true)}
        className="flex items-center justify-between rounded-[80px] p-6 h-60 text-white bg-gradient-to-b from-[#9EF6A5] via-[#1B8C21] to-[#022003]">
          <div className="text-left">
            <h2 className="text-3xl font-bold leading-snug ml-5">
              View<br />Previous<br />Invoice
            </h2>
          </div>
          <div className="text-5xl">
  <img
    src="/mdi_invoice-clock.png"
    alt="Create Invoice"
    className="w-30 h-30"
  />
</div>
        </button>

        {/* Create / Edit Customer */}
        <button
        onClick={() => setShowCreateCustomer(true)}
        className="flex items-center justify-between rounded-[80px] p-6 h-60 text-white bg-gradient-to-b from-[#F6ED9E] via-[#868C1B] to-[#1A2002]">
          <div className="text-left">
            <h2 className="text-3xl font-bold leading-snug ml-5">
              Create /<br />Edit<br />Customer
            </h2>
          </div>
          <div className="text-5xl">
  <img
    src="/mdi_user-add.png"
    alt="Create Invoice"
    className="w-30 h-30"
  />
</div>
        </button>

      </div>
    </div>
  );
};

export default PosMainMenu;
