import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import usePhotoStore from '../../store/usePhoto.js';
import StickerItem from './StickerItem';

const STICKERS_LIST = [
  'cat.png',
  'mouse.png',
  'totoro.png',
  'fire.png',
  'soot.png',
  'flower.png',
];

const Canva = () => {
  const { photos, frameStyle, resetAll } = usePhotoStore();
  
  const [stickers, setStickers] = useState([]);
  const printRef = useRef(null);

  const addSticker = (fileName) => {
    const newSticker = {
      id: Date.now(),
      src: `/assets/stickers/${fileName}`,
    };
    setStickers([...stickers, newSticker]);
  };

  const removeSticker = (id) => {
    setStickers(stickers.filter((s) => s.id !== id));
  };

  const handleDownload = async () => {
    if (!printRef.current) return;
    
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => btn.style.display = 'none');

    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 3, 
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `hanakaze_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      deleteBtns.forEach(btn => btn.style.display = 'flex');
    }
  };

  const btnStyle = "w-full md:w-48 py-3 rounded-full text-xl font-bold shadow-[0_4px_0_rgba(0,0,0,0.1)] transition-all border-4 text-center cursor-pointer mb-4";

  return (
    <div className="flex flex-col md:flex-row h-full w-full pt-32 pb-10 px-4 gap-6 animate-fade-in items-center justify-center">
      
      {/* --- CỘT TRÁI: STICKER --- */}
      <div className="w-full md:w-64 md:h-auto bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 p-4 flex flex-col shadow-xl z-20 flex-shrink-0">
        <h3 className="text-brand-darkPink font-bold text-xl mb-4 text-center">Stickers</h3>
        <div className="grid grid-cols-4 md:grid-cols-2 gap-3 p-1">
          {STICKERS_LIST.map((fileName, index) => (
            <div 
              key={index} 
              onClick={() => addSticker(fileName)}
              className="aspect-square bg-white rounded-lg shadow-sm hover:scale-110 transition-transform cursor-pointer flex items-center justify-center p-2 border border-brand-pink/20"
            >
              <img src={`/assets/stickers/${fileName}`} alt="sticker" className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mt-4 font-bold">Click to add - Drag to move</p>
      </div>

      {/* --- CỘT GIỮA: CANVAS --- */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full">
        
        <div 
          ref={printRef}
          className="relative bg-white shadow-2xl overflow-hidden"
          style={{
             padding: '20px', 
             backgroundColor: '#FFF0F5', 
             display: 'flex',
             gap: '20px',
             width: frameStyle === 'strip' ? 'auto' : '480px', 
             maxWidth: '100%'
          }}
        >
          {frameStyle === 'strip' ? (
            // --- STRIP LAYOUT ---
            <>
              <StripColumn photos={photos} />
              <StripColumn photos={photos} />
            </>
          ) : (
            // --- GRID LAYOUT ---
            <div className="flex flex-col w-full bg-white p-3 border-2 border-dashed border-gray-300 gap-3 relative shadow-sm">
               
               {/* Header Logo */}
               <div className="text-center pb-1 relative z-[60] pointer-events-none">
                  <img src="/assets/logo.png" alt="logo" className="w-12 mx-auto opacity-80" />
               </div>

               {/* Lưới ảnh */}
               <div className="grid grid-cols-2 gap-3 w-full">
                  {photos.map((img, idx) => (
                    // 👇 SỬA Ở ĐÂY:
                    // Đổi 'aspect-square' thành 'aspect-[4/3]'
                    // Để khung chứa có tỉ lệ 4:3 giống hệt webcam -> Ảnh sẽ vừa khít, không méo
                    <div key={idx} className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-sm border border-gray-200 relative">
                        <img 
                            src={img} 
                            className="w-full h-full object-cover grayscale-[10%]" 
                            alt="snap" 
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    </div>
                  ))}
               </div>

               {/* Footer */}
               <div className="text-center pt-1 relative z-[60] pointer-events-none">
                   <p className="text-[10px] font-bold text-gray-400 font-sans tracking-wide">by @pptthuu</p>
               </div>
            </div>
          )}

          {/* LỚP STICKER */}
          <div className="absolute inset-0 z-50 pointer-events-none">
            {stickers.map((sticker) => (
              <StickerItem 
                key={sticker.id} 
                sticker={sticker} 
                onRemove={removeSticker} 
              />
            ))}
          </div>

        </div>
      </div>

      {/* --- CỘT PHẢI: ACTIONS --- */}
      <div className="w-full md:w-auto flex flex-row md:flex-col gap-4 justify-center items-center z-50 mt-4 md:mt-0">
         <button 
           onClick={handleDownload}
           className={`${btnStyle} bg-brand-pink text-white border-brand-darkPink hover:bg-brand-darkPink hover:translate-y-1 hover:shadow-none`}
         >
           Download
         </button>
         <button 
           onClick={resetAll}
           className={`${btnStyle} bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
         >
           Home
         </button>
      </div>

    </div>
  );
};

// Component cột ảnh dọc (Strip)
const StripColumn = ({ photos }) => (
  <div className="flex flex-col gap-2 bg-white p-2 shadow-sm border-2 border-dashed border-gray-300 w-40 relative">
    
    <div className="text-center pb-1 relative z-[60] pointer-events-none">
       <img src="/assets/logo.png" alt="logo" className="w-8 mx-auto opacity-70" />
    </div>

    {photos.map((img, idx) => (
      // Strip cũng dùng 4/3 nên Grid dùng 4/3 là chuẩn bài
      <div key={idx} className="aspect-[4/3] bg-gray-100 overflow-hidden grayscale-[10%] relative z-0"> 
        <img 
            src={img} 
            className="w-full h-full object-cover" 
            alt="strip" 
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
    ))}

    <div className="text-center pt-2 pb-1 relative z-[60] pointer-events-none">
       <p className="text-[9px] font-bold text-gray-400 font-sans tracking-wide">by @pptthuu</p>
    </div>
  </div>
);

export default Canva;