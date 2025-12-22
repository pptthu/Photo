import React from 'react';
import usePhotoStore from '../../store/usePhoto.js';

const Home = () => {
  const setStep = usePhotoStore((state) => state.setStep);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-safe-top px-4 overflow-hidden relative font-sans gap-8">

      {/* --- BOOTH CARD */}
      <div className="relative z-10 flex-shrink-0">
        <div className="relative bg-white/50 backdrop-blur-xl border-[4px] border-white shadow-2xl rounded-booth w-booth-card h-booth-card flex flex-col items-center p-4 overflow-visible">
            
            {/* 1. HEADER */}
            <div className="relative z-20 mt-4 mb-2">
                 <h1 
                    className="text-6xl font-bold"
                    style={{
                        fontFamily: '"Nunito", sans-serif',
                        color: '#FFB7C5', 
                        WebkitTextStroke: '2px #FFFFFF',
                        textShadow: '0px 3px 6px rgba(244, 143, 177, 0.4)'
                    }}
                  >
                    Hanakaze
                  </h1>
                  {/* Sticker hoa nhỏ */}
                  <img src="/assets/stickers/flower.png" className="absolute -top-3 -right-6 w-8" alt="" />
            </div>

            {/* 2 Dải ảnh */}
            <div className="relative w-full flex-1 mt-4">

                {/* STRIP TRÁI Nằm dưới */}
                <div className="absolute left-8 top-2 w-32 bg-brand-light p-2 pb-6 shadow-md border-2 border-white transform -rotate-[15deg] z-10 flex flex-col gap-2">
                    <div className="flex justify-between px-1 opacity-60">
                         <img src="/assets/stickers/soot.png" className="w-5" alt="s" />
                         <img src="/assets/stickers/soot.png" className="w-5 scale-x-[-1]" alt="s" />
                    </div>
                    <div className="aspect-square bg-white border border-brand-pink/30 p-1">
                        <img src="/assets/stickers/cat1.jpg" className="w-full h-full object-contain" alt="1" />
                    </div>
                    <div className="aspect-square bg-white border border-brand-pink/30 p-1">
                        <img src="/assets/stickers/cat2.png" className="w-full h-full object-contain" alt="2" />
                    </div>
                </div>

                {/* STRIP PHẢI Nằm trên */}
                <div className="absolute right-8 top-6 w-32 bg-brand-light p-2 pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.15)] border-2 border-white transform rotate-[8deg] z-20 flex flex-col gap-2">
                    <div className="flex justify-between px-1 opacity-60">
                         <img src="/assets/stickers/soot.png" className="w-5" alt="s" />
                         <img src="/assets/stickers/soot.png" className="w-5 scale-x-[-1]" alt="s" />
                    </div>
                    <div className="aspect-square bg-white border border-brand-pink/30 p-1">
                        <img src="/assets/stickers/cat1.jpg" className="w-full h-full object-contain" alt="3" />
                    </div>
                    <div className="aspect-square bg-white border border-brand-pink/30 p-1">
                        <img src="/assets/stickers/cat2.png" className="w-full h-full object-contain" alt="4" />
                    </div>
                    
                    {/* Ghim hoa */}
                    <img src="/assets/stickers/flower.png" className="absolute -top-2 -right-2 w-8 drop-shadow-sm z-30" alt="" />
                </div>

                {/* STICKER  */}
                
                {/* Totoro */}
                <img src="/assets/stickers/totoro.png" className="absolute -bottom-4 -left-6 w-28 rotate-[-5deg] z-30 drop-shadow-lg" alt="totoro" />

                {/* Lửa */}
                <img src="/assets/stickers/fire.png" className="absolute top-16 -right-2 w-12 z-30" alt="fire" />

                {/* Bồ hóng */}
                <img src="/assets/stickers/soot.png" className="absolute -top-2 left-4 w-10 rotate-12 z-30" alt="soot" />

                {/*  HOA */}
                <img src="/assets/stickers/flower.png" className="absolute bottom-10 right-2 w-8 opacity-80 z-30" alt="flower 1" />
                <img src="/assets/stickers/flower.png" className="absolute top-1/2 left-1/2 w-5 opacity-40 z-0" alt="flower 2" />
                <img src="/assets/stickers/flower.png" className="absolute top-20 -left-6 w-6 opacity-70 z-30" alt="flower 3" />

            </div>
        </div>
      </div>

      {/* --- NÚT SELECT --- */}
      <div className="flex-none z-40">
        <button 
          onClick={() => setStep('mode')}
          className="bg-white text-brand-darkPink px-20 py-3 rounded-full text-3xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-transform border-[4px] border-brand-pink cursor-pointer"
        >
          Select
        </button>
      </div>

    </div>
  );
};

export default Home;