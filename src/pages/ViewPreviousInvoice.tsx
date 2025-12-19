import { useState } from "react";
import RecallInvoiceConfirm from "./RecallInvoiceConfirm";

interface ViewPreviousInvoiceProps {
  goBack: () => void;
}

const ViewPreviousInvoice = ({ goBack }: ViewPreviousInvoiceProps) => {
  
  const [showRecallConfirm, setShowRecallConfirm] = useState(false);

  const handleRecall = () => {
    // ✅ put recall logic / API call here
    console.log("Invoice recalled");
    setShowRecallConfirm(false);
  };
  
    return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">

      {/* TOP BAR */}
      <div className="w-full max-w-md bg-[#D9D9D9] rounded-full flex items-center justify-between px-4 py-2 mb-3">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <img src="/Polygon.png" alt="Back" className="w-4 h-4" />
          POS
        </button>

        <span className="font-bold text-[15px] text-black">
          View Previous Invoice
        </span>

        <button className="flex items-center gap-2 text-sm font-medium opacity-50">
          POS
          <img src="/Polygon 2.png" alt="Next" className="w-4 h-4" />
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="w-full max-w-md bg-[#2F2F2F] rounded-[8px] overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-8 text-[10px] text-white bg-[#3A3A3A] px-2 py-2 font-semibold">
          <div>Invoice No</div>
          <div>Created</div>
          <div>Created By</div>
          <div>Created For</div>
          <div>Value</div>
          <div>Paid Amount</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* TABLE BODY */}
        <div className="h-[420px] overflow-y-auto text-[10px] text-white">

          {/* SAMPLE ROW */}
          <div className="grid grid-cols-8 px-2 py-2 border-b border-white/10">
            <div>INV1245</div>
            <div>2025/02/18<br />12:10PM</div>
            <div>22-Harry<br />Potter</div>
            <div>05 - Ron<br />Weasley</div>
            <div>12500</div>
            <div>500</div>
            <div>Pending</div>
            <button
             onClick={() => setShowRecallConfirm(true)}
            className="text-blue-400 font-semibold">
              Recall
            </button>
          </div>

          {/* EMPTY ROWS */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-8 px-2 py-3 border-b border-white/5"
            >
              <div>&nbsp;</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="w-full max-w-md flex items-center justify-start text-xs text-white/60 mt-2">
        ◀ 2 / 2 ▶
      </div>
       {showRecallConfirm && (
        <RecallInvoiceConfirm
          onConfirm={handleRecall}
          onClose={() => setShowRecallConfirm(false)}
        />
      )}
    </div>
  );
};

export default ViewPreviousInvoice;
