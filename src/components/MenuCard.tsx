import type { ReactNode } from 'react';

interface MenuCardProps {
  title: string;
  bgColor: string;
  icon: ReactNode;
}

function MenuCard({ title, bgColor, icon }: MenuCardProps) {
  return (
    <button className="flex flex-col items-center p-4 sm:p-6 rounded-3xl bg-white hover:bg-gray-100 transition-colors">
      <div className={`w-20 h-20 sm:w-24 sm:h-24 ${bgColor} rounded-full flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <span className="text-black font-semibold text-sm sm:text-base">{title}</span>
    </button>
  );
}

export default MenuCard;