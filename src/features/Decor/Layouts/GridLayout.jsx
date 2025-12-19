import React from 'react';
import { ASSETS } from '../../../utils/constants';

const GridLayout = ({ photos }) => {
  return (
    <div 
      className="flex flex-col bg-white p-3 border-2 border-dashed border-gray-300 gap-3 relative shadow-sm"
      style={{ width: '480px', maxWidth: '100%' }}
    >
      {/* 👇 LOGO: z-[50] */}
      <div className="text-center pb-1 relative z-[50] pointer-events-none">
        <img src={ASSETS.LOGO} alt="logo" className="w-12 mx-auto opacity-80" style={{ width: '48px' }} />
      </div>

      {/* 👇 ẢNH: z-[10] */}
      <div className="grid grid-cols-2 gap-3 w-full relative z-[10]">
        {photos.map((img, idx) => (
          <div key={idx} className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-sm border border-gray-200 relative">
            <img
              src={img}
              className="w-full h-full object-cover grayscale-[10%]"
              alt="snap"
              style={{ 
                  objectFit: 'cover', width: '100%', height: '100%', display: 'block',
                  transform: 'scaleX(-1)' 
              }}
            />
          </div>
        ))}
      </div>

      {/* 👇 FOOTER: z-[50] */}
      <div className="text-center pt-1 relative z-[50] pointer-events-none">
        <p className="text-[10px] font-bold text-gray-400 font-sans tracking-wide">by @pptthuu</p>
      </div>
    </div>
  );
};

export default GridLayout;