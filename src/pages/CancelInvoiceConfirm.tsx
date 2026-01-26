interface CancelInvoiceConfirmProps {
  onConfirm: () => void;
  onClose: () => void;
}

const CancelInvoiceConfirm = ({
  onConfirm,
  onClose,
}: CancelInvoiceConfirmProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-10">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-[1200px] h-[400px] bg-[#D9D9D9] rounded-[40px] p-12 shadow-2xl flex items-center justify-between gap-16">
        
        {/* TEXT */}
        <div className="text-[42px] font-bold text-gray-700 leading-tight">
          Do You Want to
          <br />
          <span className="text-black">Cancel Invoice?</span>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-10">
          {/* YES */}
          <button
            onClick={onConfirm}
            className="w-[300px] h-[120px] bg-gradient-to-b from-[#F59B9B] via-[#ED654A] to-[#3B0202] text-white font-bold rounded-[20px] shadow hover:from-[#F5ABAB] hover:to-[#ED755A] transition-all text-[42px]"
          >
            YES
          </button>

          {/* NO */}
          <button
            onClick={onClose}
            className="w-[300px] h-[120px] bg-gradient-to-b from-[#7CFE96] to-[#1E7A3A] text-white font-bold rounded-[20px] shadow hover:from-[#8CFEA6] hover:to-[#2E8A4A] transition-all text-[42px]"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelInvoiceConfirm;