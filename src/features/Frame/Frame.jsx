import React from 'react';
import usePhotoStore from '../../store/usePhoto.js';

const Frame = () => {
  const setStep = usePhotoStore((state) => state.setStep);
  const setFrameStyle = usePhotoStore((state) => state.setFrameStyle);
  const setPhotos = usePhotoStore((state) => state.setPhotos);

  const handleSelectFrame = (style) => {
    setFrameStyle(style);
    setTimeout(() => setStep('decor'), 200);
  };

  const handleRetake = () => {
    setPhotos([]); 
    setStep('mode');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-full w-full pt-32 pb-20 px-4 animate-fade-in">
      <h2 className="text-5xl md:text-6xl font-bold mb-12 font-hand text-center" style={{ fontFamily: '"Nunito", sans-serif', color: '#F48FB1', WebkitTextStroke: '1.5px #C2185B', textShadow: '0px 2px 0px #FFFFFF' }}>
        Choose Layout
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center w-full">
        {/* STRIP */}
        <div onClick={() => handleSelectFrame('strip')} className="group cursor-pointer flex flex-col items-center gap-4 transition-all hover:-translate-y-2">
            <div className="bg-white p-2 rounded-lg shadow-xl border-4 border-white group-hover:border-brand-pink transition-colors">
                <div className="w-32 h-80 bg-brand-pink/20 flex flex-col gap-1 p-2 items-center justify-center">
                    {[1,2,3,4].map(i => <div key={i} className="w-24 h-16 bg-white/60 rounded-sm"></div>)}
                </div>
            </div>
            <span className="bg-white text-brand-darkPink px-6 py-2 rounded-full font-bold shadow-md border-2 border-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors">Photo Strip</span>
        </div>
      </div>
      <button onClick={handleRetake} className="mt-12 mb-8 text-white/80 hover:text-white underline underline-offset-4 font-bold text-lg drop-shadow-md z-50">← Back to Menu</button>
    </div>
  );
};
export default Frame;