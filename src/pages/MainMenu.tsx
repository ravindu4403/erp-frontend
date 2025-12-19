import { useState } from 'react';
import MenuCard from '../components/MenuCard';
import ViewStock from "./ViewStock";


interface MainMenuProps {
    goToPage: (page: 'pos' | 'main') => void;
}



function MainMenu({ goToPage }: MainMenuProps) {

  const [showViewStock, setShowViewStock] = useState(false);

  if (showViewStock) {
  return <ViewStock goBack={() => setShowViewStock(false)} />;
}

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black rounded-lg p-8 sm:p-12">
          <div className="flex justify-center mb-6">
           
          </div>
            <h2 className="text-white text-2xl sm:text-3xl font-bold text-center mb-25">
             {/* Hello {username}*/} Hello Demo  
          </h2>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-80 justify-items-center">
 
  <MenuCard
    title="Report Time"
    bgColor="bg-gradient-to-b from-[#8BA6FF] via-[#002FCA] to-[#002394]"
    icon={
      <img
      src="/report-time.png"  
      alt="Report Time"
      className=" h-45 object-contain mx-auto"
    />
    }
  
  />



  <MenuCard
    title="Apply Leave"
    bgColor="bg-white"
   icon={
      <img
      src="/leave.png"  
      alt="Apply Leave"
      className=" h-45 object-contain mx-auto"
    />
   }

   />
  </div>



<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-80 justify-items-center mt-15">
  <MenuCard
    title="Point Of Sales"
    bgColor="bg-white"
    icon={
      <img
      src="/cashier.png"  
      alt="Point Of Sales"
      className=" h-45 object-contain mx-auto"
       onClick={() => goToPage('pos')} 
    />
   }

   />

  <MenuCard
   onClick={() => setShowViewStock(true)}
    title="View Stock"
    bgColor="bg-white"
    icon={
      <img
      src="/inventory.png"  
      alt="View Stock"
      className=" h-45 object-contain mx-auto"
    />
   }

   />
</div>

        </div>
      </div>
    </div>
  );
}

export default MainMenu;