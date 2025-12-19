import { useState } from 'react';

const useSticker = () => {
  const [stickers, setStickers] = useState([]);

  const addSticker = (fileName) => {
    const newSticker = {
      id: Date.now(),
      src: `/assets/stickers/${fileName}`,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const removeSticker = (id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  return { stickers, addSticker, removeSticker };
};

export default useSticker;