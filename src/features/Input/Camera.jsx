import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import usePhotoStore from '../../store/usePhoto';
import useCountdown from '../../hooks/useCountdown';
import { CONFIG } from '../../utils/constants';
import Button from '../../components/Button';

const Camera = () => {
  const { setStep, addPhoto } = usePhotoStore();
  const webcamRef = useRef(null);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleCapture = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);

    const imageSrc = webcamRef.current.getScreenshot();
    
    // 👇 QUAN TRỌNG: Đánh dấu ảnh này là từ 'camera'
    addPhoto(imageSrc, 'camera');
    
    setPhotosTaken((prev) => {
      const newCount = prev + 1;
      if (newCount >= CONFIG.MAX_PHOTOS) {
        setTimeout(() => setStep('frame'), 800);
      }
      return newCount;
    });
  };

  const { count, startCountdown, isCounting } = useCountdown(3, handleCapture);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full pt-24 pb-4 px-4 animate-fade-in relative overflow-hidden">
      
      {isFlashing && (
        <div className="fixed inset-0 z-[999] bg-white animate-fade-out pointer-events-none"></div>
      )}

      <div className="mb-4 z-20">
        <div className="bg-white border-2 border-brand-pink px-6 py-1 rounded-full shadow-md min-w-[80px] text-center">
           <span className="text-2xl font-bold text-brand-darkPink font-sans">
             {isCounting ? count : `${photosTaken}/${CONFIG.MAX_PHOTOS}`}
           </span>
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-sm p-3 rounded-[1.5rem] border border-white/50 shadow-xl mb-6 w-full max-w-xl">
        <div className="bg-brand-pink p-2 rounded-xl shadow-inner">
           <div className="w-full aspect-[4/3] bg-black border-4 border-white rounded-lg overflow-hidden relative">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover transform scale-x-[-1]" 
                videoConstraints={{
                  facingMode: "user"
                }}
              />
           </div>
        </div>
      </div>

      <div className="flex items-center gap-6 z-20 pb-4">
        <button 
          onClick={() => setStep('mode')}
          className="w-12 h-12 rounded-full bg-white/80 text-gray-500 font-bold text-lg shadow-lg hover:bg-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <Button 
          variant="danger" 
          onClick={startCountdown} 
          disabled={isCounting}
          className="min-w-[160px]"
        >
          {isCounting ? 'Smile!' : 'Capture'}
        </Button>
      </div>

    </div>
  );
};

export default Camera;