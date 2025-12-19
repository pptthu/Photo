import React from 'react';
import { ASSETS } from '../../../utils/constants';

const StripLayout = ({ photos }) => {
  return (
    <div 
      className="flex flex-col gap-2 bg-white p-2 shadow-sm border-2 border-dashed border-gray-300 relative"
      style={{ width: '160px' }} 
    >
      {/* Header Logo: z-[50] CAO NHẤT */}
      <div className="text-center pb-1 relative z-[50] pointer-events-none">
        <img src={ASSETS.LOGO} alt="logo" className="w-8 mx-auto opacity-70" style={{ width: '32px' }} />
      </div>

      {/* Photos: z-[10] THẤP NHẤT */}
      {photos.map((photoObj, idx) => (
        <div key={photoObj.id || idx} className="aspect-[4/3] bg-gray-100 overflow-hidden relative z-[10]">
          <img
            src={photoObj.src} // Lấy src từ object
            className="w-full h-full object-cover grayscale-[10%]"
            alt="strip"
            style={{ 
                objectFit: 'cover', width: '100%', height: '100%', display: 'block',
                // 👇 CHỈ LẬT NẾU LÀ ẢNH CAMERA
                transform: photoObj.source === 'camera' ? 'scaleX(-1)' : 'none' 
            }}
          />
        </div>
      ))}

      {/* Footer: z-[50] */}
      <div className="text-center pt-2 pb-1 relative z-[50] pointer-events-none">
        <p className="text-[9px] font-bold text-gray-400 font-sans tracking-wide">by @pptthuu</p>
      </div>
    </div>
  );
};

export default StripLayout;