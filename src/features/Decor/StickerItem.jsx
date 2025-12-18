import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const StickerItem = ({ sticker, onRemove }) => {
  // Tạo ref riêng cho mỗi sticker để tránh lỗi crash của thư viện
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div 
        ref={nodeRef} 
        className="absolute inline-block w-24 h-24 cursor-move pointer-events-auto group touch-none"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} // Căn giữa lúc mới hiện
      >
         <img 
            src={sticker.src} 
            alt="decor" 
            className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none" 
            // select-none và pointer-events-none giúp kéo thả mượt hơn
         />
         
         {/* Nút xóa (chỉ hiện khi hover hoặc chạm vào) */}
         <div 
            className="delete-btn absolute -top-3 -right-3 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity font-bold z-50"
            onClick={(e) => {
                e.stopPropagation(); // Chặn sự kiện kéo
                onRemove(sticker.id);
            }}
            onTouchEnd={(e) => {
                e.stopPropagation();
                onRemove(sticker.id);
            }}
         >
           ✕
         </div>
      </div>
    </Draggable>
  );
};

export default StickerItem;