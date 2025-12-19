import React from 'react';
import { ASSETS } from '../../../utils/constants';

const StripLayout = ({ photos }) => {
  return (
    <div 
      // 👇 QUAN TRỌNG: Không set z-index ở đây để Logo (con) so sánh được với Sticker (bên ngoài)
      className="flex flex-col gap-2 bg-white p-2 shadow-sm border-2 border-dashed border-gray-300 relative"
      style={{ width: '160px' }} 
    >
      {/* 👇 LOGO: z-[50] -> CAO NHẤT (Sẽ đè lên Sticker z-30) */}
      <div className="text-center pb-1 relative z-[50] pointer-events-none">
        <img src={ASSETS.LOGO} alt="logo" className="w-8 mx-auto opacity-70" style={{ width: '32px' }} />
      </div>

      {/* 👇 ẢNH: z-[10] -> THẤP NHẤT (Sẽ nằm dưới Sticker z-30) */}
      {photos.map((img, idx) => (
        <div key={idx} className="aspect-[4/3] bg-gray-100 overflow-hidden relative z-[10]">
          <img
            src={img}
            className="w-full h-full object-cover grayscale-[10%]"
            alt="strip"
            style={{ 
                objectFit: 'cover', width: '100%', height: '100%', display: 'block',
                transform: 'scaleX(-1)' // Lật ảnh
            }}
          />
        </div>
      ))}

      {/* 👇 FOOTER: z-[50] */}
      <div className="text-center pt-2 pb-1 relative z-[50] pointer-events-none">
        <p className="text-[9px] font-bold text-gray-400 font-sans tracking-wide">by @pptthuu</p>
      </div>
    </div>
  );
};

export default StripLayout;