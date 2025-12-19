import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import usePhotoStore from '../../store/usePhoto';
import useCountdown from '../../hooks/useCountdown';
import { CONFIG } from '../../utils/constants';
import Button from '../../components/Button'; // Import Button xịn

const Camera = () => {
  const { setStep, addPhoto } = usePhotoStore();
  const webcamRef = useRef(null);
  const [photosTaken, setPhotosTaken] = useState(0);
  
  // State quản lý hiệu ứng Flash
  const [isFlashing, setIsFlashing] = useState(false);

  // Logic chụp ảnh & Flash
  const handleCapture = () => {
    // 1. Kích hoạt Flash
    setIsFlashing(true);
    
    // 2. Tắt Flash sau 150ms (Tạo hiệu ứng chớp nhanh)
    setTimeout(() => setIsFlashing(false), 150);

    // 3. Chụp ảnh từ Webcam
    const imageSrc = webcamRef.current.getScreenshot();
    addPhoto(imageSrc);
    
    // 4. Kiểm tra số lượng ảnh
    setPhotosTaken((prev) => {
      const newCount = prev + 1;
      if (newCount >= CONFIG.MAX_PHOTOS) {
        setTimeout(() => setStep('frame'), 800);
      }
      return newCount;
    });
  };

  // Sử dụng hook đếm ngược
  const { count, startCountdown, isCounting } = useCountdown(3, handleCapture);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full pt-24 pb-4 px-4 animate-fade-in relative overflow-hidden">
      
      {/* --- HIỆU ỨNG FLASH --- 
          Lớp phủ màu trắng toàn màn hình, chỉ hiện khi isFlashing = true
      */}
      {isFlashing && (
        <div className="fixed inset-0 z-[999] bg-white animate-fade-out pointer-events-none"></div>
      )}

      {/* SỐ ĐẾM / TIẾN ĐỘ */}
      <div className="mb-4 z-20">
        <div className="bg-white border-2 border-brand-pink px-6 py-1 rounded-full shadow-md min-w-[80px] text-center">
           <span className="text-2xl font-bold text-brand-darkPink font-sans">
             {isCounting ? count : `${photosTaken}/${CONFIG.MAX_PHOTOS}`}
           </span>
        </div>
      </div>

      {/* KHUNG WEBCAM */}
      <div className="bg-white/30 backdrop-blur-sm p-3 rounded-[1.5rem] border border-white/50 shadow-xl mb-6 w-full max-w-xl">
        <div className="bg-brand-pink p-2 rounded-xl shadow-inner">
           <div className="w-full aspect-[4/3] bg-black border-4 border-white rounded-lg overflow-hidden relative">
              <Webcam
                ref={webcamRef}
                audio={false} // Tắt tiếng mặc định của trình duyệt để tự xử lý (nếu cần)
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover transform scale-x-[-1]" 
                videoConstraints={{
                  facingMode: "user" // "user" là cam trước, "environment" là cam sau
                }}
              />
           </div>
        </div>
      </div>

      {/* NÚT BẤM (Dùng Component Button mới) */}
      <div className="flex items-center gap-6 z-20 pb-4">
        {/* Nút X (Tròn nhỏ -> Tự style riêng hoặc dùng Button với class đè) */}
        <button 
          onClick={() => setStep('mode')}
          className="w-12 h-12 rounded-full bg-white/80 text-gray-500 font-bold text-lg shadow-lg hover:bg-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {/* Nút Chụp */}
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