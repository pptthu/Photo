import React, { useRef, useState, useEffect } from 'react';
import usePhotoStore from '../../store/usePhoto';

// Hooks & Utils
import useSticker from '../../hooks/useSticker'; 
import { handleDownloadImage } from '../../utils/canvaHelper';
import { STICKERS } from '../../utils/constants';

// Components
import StickerItem from './StickerItem';
import StripLayout from './Layouts/StripLayout';
import GridLayout from './Layouts/GridLayout';
import Button from '../../components/Button';

const Canva = () => {
  const { photos, frameStyle, resetAll } = usePhotoStore();
  const printRef = useRef(null);
  
  const { stickers, addSticker, removeSticker } = useSticker();
  const [scale, setScale] = useState(1);

  // Logic tính toán Scale thông minh
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      
      // Xác định chiều rộng chuẩn của khung ảnh để tính tỉ lệ
      // Grid rộng khoảng 530px, Strip rộng khoảng 380px
      const baseWidth = frameStyle === 'grid' ? 530 : 380;

      if (screenWidth < baseWidth + 40) {
        // Nếu màn hình nhỏ hơn khung ảnh -> Scale nhỏ lại
        const fitScale = (screenWidth - 30) / baseWidth; 
        setScale(fitScale); 
      } else {
        // Màn hình to -> Giữ nguyên size thật
        setScale(1);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frameStyle]); // Chạy lại khi đổi kiểu khung

  const onDownload = () => handleDownloadImage(printRef);

  return (
    <div className="flex flex-col md:flex-row h-full w-full pt-24 md:pt-32 pb-10 px-4 gap-6 animate-fade-in items-center justify-start md:justify-center overflow-y-auto">
      
      {/* MENU STICKER */}
      <div className="w-full md:w-64 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-4 flex flex-col shadow-xl z-20 flex-shrink-0 order-2 md:order-1">
        <h3 className="text-brand-darkPink font-bold text-xl mb-2 text-center">Stickers</h3>
        <div className="grid grid-cols-4 md:grid-cols-2 gap-3 p-1 max-h-40 md:max-h-[60vh] overflow-y-auto custom-scrollbar">
          {STICKERS.map((item, index) => (
            <div 
              key={index} 
              onClick={() => addSticker(item.src.split('/').pop())} 
              className="aspect-square bg-white rounded-lg shadow-sm hover:scale-110 active:scale-90 transition-transform cursor-pointer flex items-center justify-center p-2 border border-brand-pink/20"
            >
              <img src={item.src} alt="sticker" className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] md:text-xs text-gray-600 mt-2 font-bold">Tap to add - Drag to move</p>
      </div>

      {/* CANVAS AREA */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full order-1 md:order-2">
        {/* Wrapper này chịu trách nhiệm Scale hiển thị */}
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.3s' }}>
          
          {/* 🟢 ARTBOARD CHÍNH THỨC */}
          <div 
            ref={printRef}
            className="relative bg-[#FFF0F5] shadow-2xl" 
            style={{
                padding: '24px',
                
                // 👇 QUAN TRỌNG NHẤT: Ép cứng chiều rộng tối thiểu (min-width)
                // Để trên điện thoại nó không bị bóp méo (squashed)
                // Nó sẽ tràn ra ngoài màn hình (nhưng ta đã scale nhỏ lại để nhìn thấy hết)
                minWidth: frameStyle === 'grid' ? '530px' : '380px',
                width: 'max-content',
                
                display: 'block',
                margin: '0 auto'
            }}
          >
            {/* LỚP 1: LAYOUT (Không z-index) */}
            <div className="relative pointer-events-none">
                {frameStyle === 'strip' ? (
                    <div className="flex gap-4 md:gap-6">
                        <StripLayout photos={photos} />
                        <StripLayout photos={photos} />
                    </div>
                ) : (
                    <GridLayout photos={photos} />
                )}
            </div>

            {/* LỚP 2: STICKER (Không z-index) */}
            <div className="absolute inset-0 pointer-events-none">
                {stickers.map((sticker) => (
                  <StickerItem 
                      key={sticker.id} 
                      sticker={sticker} 
                      onRemove={removeSticker} 
                      scale={scale}
                  />
                ))}
            </div>

          </div> 
          {/* KẾT THÚC ARTBOARD */}

        </div>
      </div>

      {/* BUTTONS */}
      <div className="w-full md:w-auto flex flex-row md:flex-col gap-4 justify-center items-center z-50 mt-4 md:mt-0 order-3">
         <Button variant="primary" className="w-full md:w-48" onClick={onDownload}>
           Download
         </Button>
         <Button variant="secondary" className="w-full md:w-48" onClick={resetAll}>
           Home
         </Button>
      </div>

    </div>
  );
};

export default Canva;