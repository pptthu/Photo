import usePhotoStore from '../../store/usePhoto.js';

const Mode = () => {
  const setStep = usePhotoStore((state) => state.setStep);
  const btnStyle = "w-64 py-3 bg-white border-2 border-brand-pink rounded-full text-2xl font-bold text-brand-darkPink shadow-lg hover:scale-105 transition-transform cursor-pointer text-center font-sans";

  return (
    // Thêm pt-32 để cách xa cái Logo ở trên ra
    <div className="flex flex-col items-center justify-center h-full w-full animate-fade-in pt-32 pb-10">
      
      {/* TIÊU ĐỀ HANAKAZE */}
      <h1 
        className="text-6xl md:text-7xl mb-12 font-bold"
        style={{
            fontFamily: '"Nunito", sans-serif',
            color: '#F48FB1',
            WebkitTextStroke: '1.5px #C2185B',
            textShadow: '0px 2px 0px #FFFFFF'
        }}
      >
        Hanakaze
      </h1>
      
      {/* CÁC NÚT CHỨC NĂNG */}
      <div className="flex flex-col gap-6">
        <button onClick={() => setStep('input')} className={btnStyle}>
          Take photos
        </button>
        <button onClick={() => setStep('upload')} className={btnStyle}>
          Upload photos
        </button>
      </div>
      
    </div>
  );
};

export default Mode;