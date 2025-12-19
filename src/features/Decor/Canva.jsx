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
  // 👇 THÊM STATE MỚI: Để theo dõi trạng thái đang chụp ảnh
  const [isCapturing, setIsCapturing] = useState(false);

  // Auto scale cho mobile (Giữ nguyên)
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        const fitScale = (screenWidth - 40) / 480; // Tính toán tỉ lệ dựa trên chiều rộng chuẩn của khung (ví dụ 480px)
        setScale(Math.min(fitScale, 1)); // Không bao giờ scale lớn hơn 1
      } else {
        setScale(1);
      }
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 👇 SỬA HÀM DOWNLOAD: Áp dụng thủ thuật "Snap & Restore"
  const onDownload = async () => {
    // 1. Bắt đầu chụp: Tắt scale
    setIsCapturing(true);

    // Dùng setTimeout 0ms để đẩy việc chụp xuống cuối hàng đợi sự kiện,
    // đảm bảo React đã kịp render lại giao diện với scale(1) trước khi chụp.
    setTimeout(async () => {
        // 2. Thực hiện chụp
        await handleDownloadImage(printRef);
        // 3. Chụp xong: Bật lại scale bình thường
        setIsCapturing(false);
    }, 50); // Để 50ms cho chắc chắn trên các thiết bị yếu
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full pt-24 md:pt-32 pb-10 px-4 gap-6 animate-fade-in items-center justify-start md:justify-center overflow-y-auto">
      
      {/* MENU STICKER (Giữ nguyên) */}
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
      <div className="flex-1 flex items-center justify-center relative z-10 w-full order-1 md:order-2 min-h-[60vh]">
        {/* 👇 ÁP DỤNG LOGIC SCALE Ở ĐÂY */}
        <div 
            style={{ 
                // Nếu đang chụp (isCapturing = true) thì scale về 1, ngược lại thì dùng scale tính toán
                transform: isCapturing ? 'scale(1)' : `scale(${scale})`, 
                transformOrigin: 'top center', 
                // Tắt hiệu ứng chuyển động khi chụp để tránh bị mờ
                transition: isCapturing ? 'none' : 'transform 0.3s ease-out'
            }}
        >
          
          {/* 🟢 ARTBOARD (Giữ nguyên cấu trúc chuẩn) */}
          <div 
            ref={printRef}
            className="relative bg-[#FFF0F5] shadow-2xl" 
            style={{
                padding: '24px', 
                width: 'max-content', // Quan trọng: Để khung tự mở rộng theo nội dung thật
                display: 'block',
                margin: '0 auto',
                boxSizing: 'border-box'
            }}
          >
            {/* 1. LAYOUT WRAPPER (Ảnh z-10, Logo z-50) */}
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

            {/* 2. STICKER WRAPPER (Sticker z-30) */}
            <div className="absolute inset-0 pointer-events-none">
                {stickers.map((sticker) => (
                  <StickerItem 
                      key={sticker.id} 
                      sticker={sticker} 
                      onRemove={removeSticker} 
                      // Truyền scale vào để react-draggable tính toán tốc độ di chuyển chuẩn trên mobile
                      scale={isCapturing ? 1 : scale}
                  />
                ))}
            </div>

          </div> 
          {/* KẾT THÚC ARTBOARD */}

        </div>
      </div>

      {/* BUTTONS */}
      <div className="w-full md:w-auto flex flex-row md:flex-col gap-4 justify-center items-center z-50 mt-4 md:mt-0 order-3">
         {/* Thêm loading state cho nút khi đang chụp */}
         <Button variant="primary" className="w-full md:w-48" onClick={onDownload} disabled={isCapturing}>
           {isCapturing ? 'Processing...' : 'Download'}
         </Button>
         <Button variant="secondary" className="w-full md:w-48" onClick={resetAll} disabled={isCapturing}>
           Home
         </Button>
      </div>

    </div>
  );
};

export default Canva;