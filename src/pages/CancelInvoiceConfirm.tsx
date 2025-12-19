interface CancelInvoiceConfirmProps {
  onConfirm: () => void;
  onClose: () => void;
}

const CancelInvoiceConfirm = ({
  onConfirm,
  onClose,
}: CancelInvoiceConfirmProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-[85%] max-w-sm bg-[#D9D9D9] rounded-[16px] p-5 shadow-xl flex items-center justify-between gap-4">

        {/* TEXT */}
        <div className="text-[20px] font-bold text-gray-700 leading-tight">
          Do You Want a
          <br />
          Cancel Invoice?
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-24 h-12 bg-[#8B0000] text-white font-bold rounded-[6px] shadow"
          >
            YES
          </button>

          <button
            onClick={onClose}
            className="w-24 h-12 bg-[#0B4F26] text-white font-bold rounded-[6px] shadow"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelInvoiceConfirm;
