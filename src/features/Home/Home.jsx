import usePhotoStore from '../../store/usePhoto.js';

const Home = () => {
  const setStep = usePhotoStore((state) => state.setStep);

  return (
    // Thêm pt-24 để chừa chỗ cho Logo cố định ở trên
    <div className="w-full h-full flex flex-col items-center justify-between pt-24 pb-4 overflow-hidden">
      
      {/* HERO BANNER */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0 px-0">
        <img 
          src="/assets/hero-banner.png" 
          alt="Hanakaze Banner" 
          className="w-auto h-full max-h-[75vh] object-contain drop-shadow-2xl animate-float" 
        />
      </div>
      
      {/* NÚT SELECT */}
      <div className="flex-none mb-4 z-40">
        <button 
          onClick={() => setStep('mode')}
          className="bg-white text-brand-darkPink px-16 py-3 rounded-full text-3xl font-bold shadow-xl hover:scale-110 transition-transform border-4 border-brand-pink cursor-pointer"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default Home;