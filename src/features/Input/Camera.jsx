import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import usePhotoStore from '../../store/usePhoto.js';

const Camera = () => {
  const setStep = usePhotoStore((state) => state.setStep);
  const addPhoto = usePhotoStore((state) => state.addPhoto);
  
  const webcamRef = useRef(null);
  const [photosTaken, setPhotosTaken] = useState(0); 
  const [countdown, setCountdown] = useState(null); 
  const [isFlashing, setIsFlashing] = useState(false);

  const startCapture = useCallback(() => {
    if (countdown !== null) return;
    setCountdown(5);
    setTimeout(() => {
      setCountdown(2);
      setTimeout(() => {
        setCountdown(1);
        setTimeout(() => { captureImage(); }, 1000);
      }, 1000);
    }, 1000);
  }, [countdown]);

  const captureImage = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);
    const imageSrc = webcamRef.current.getScreenshot();
    addPhoto(imageSrc);
    setCountdown(null);
    setPhotosTaken(prev => {
      const newCount = prev + 1;
      if (newCount >= 4) { setTimeout(() => setStep('frame'), 800); }
      return newCount;
    });
  };

  return (
    // Container chính: Căn giữa, giảm padding trên xuống (pt-24)
    <div className="flex flex-col items-center justify-center h-full w-full pt-24 pb-4 px-4 animate-fade-in relative overflow-hidden">
      
      {/* Hiệu ứng Flash */}
      {isFlashing && <div className="absolute inset-0 bg-white z-[60]"></div>}

      {/* --- PHẦN 1: SỐ ĐẾM (Nằm trên đầu) --- */}
      <div className="mb-4 z-20">
        <div className="bg-white border-2 border-brand-pink px-6 py-1 rounded-full shadow-md min-w-[80px] text-center">
           <span className="text-2xl font-bold text-brand-darkPink font-sans">
             {countdown !== null ? countdown : `${photosTaken}/4`}
           </span>
        </div>
      </div>

      {/* --- PHẦN 2: KHUNG WEBCAM (Đã thu nhỏ lại) --- */}
      {/* - max-w-xl: Giới hạn chiều rộng tối đa khoảng 570px (vừa vặn, không quá to)
         - aspect-[4/3]: Giữ tỉ lệ ngang
         - w-full: Co giãn linh hoạt trên mobile
      */}
      <div className="bg-white/30 backdrop-blur-sm p-3 rounded-[1.5rem] border border-white/50 shadow-xl mb-6 w-full max-w-xl">
        <div className="bg-brand-pink p-2 rounded-xl shadow-inner">
           <div className="w-full aspect-[4/3] bg-black border-4 border-white rounded-lg overflow-hidden relative">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover transform scale-x-[-1]" 
              />
           </div>
        </div>
      </div>

      {/* --- PHẦN 3: NÚT BẤM (Sẽ luôn hiện rõ) --- */}
      <div className="flex items-center gap-6 z-20 pb-4">
        
        {/* Nút X (Nhỏ) */}
        <button 
          onClick={() => setStep('mode')}
          className="w-10 h-10 rounded-full bg-white/80 text-gray-500 font-bold text-lg shadow-lg hover:bg-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {/* Nút Capture (To vừa phải) */}
        <button 
          onClick={startCapture}
          disabled={countdown !== null}
          className="bg-white text-brand-darkPink border-2 border-brand-pink px-10 py-2 rounded-full text-xl font-bold shadow-[0_4px_0_rgb(244,143,177)] hover:translate-y-1 hover:shadow-none active:scale-95 transition-all min-w-[160px]"
        >
          Capture
        </button>

      </div>

    </div>
  );
};

export default Camera;