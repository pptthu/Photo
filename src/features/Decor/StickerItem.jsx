import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const StickerItem = ({ sticker, onRemove, scale = 1 }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" scale={scale}>
      <div 
        ref={nodeRef} 
        className="absolute inline-block w-24 h-24 cursor-move pointer-events-auto group touch-none z-[30]"
      >
         <img 
            src={sticker.src} 
            alt="decor" 
            className="w-full h-full drop-shadow-md select-none pointer-events-none" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
         />
         
         <div 
            className="delete-btn absolute -top-3 -right-3 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity font-bold z-[60]"
            onClick={(e) => {
                e.stopPropagation();
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