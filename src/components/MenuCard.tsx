import React from "react";

interface MenuCardProps {
  title: string;
  bgColor: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function MenuCard({ title, bgColor, icon, onClick }: MenuCardProps) {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div
        className={`${bgColor} 
        w-[296px] h-[276px] 
        rounded-[100px] 
        flex items-center justify-center 
        shadow-lg`}
      >
        {icon}
      </div>
      
      <p className="mt-2 text-white text-[25px] font-semibold text-center">
        {title}
      </p>
    </div>
  );
}

export default MenuCard;
