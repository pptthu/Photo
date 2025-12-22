import React from 'react';
import usePhotoStore from '../../store/usePhoto';
import Button from '../../components/Button';

const Mode = () => {
  const setStep = usePhotoStore((state) => state.setStep);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full animate-fade-in pt-32 pb-10">
      <h1 
        className="text-6xl md:text-7xl mb-12 font-bold"
        style={{
            fontFamily: '"Nunito", sans-serif',
            color: '#FFB7C5', // Dùng màu hồng phấn từ theme
            WebkitTextStroke: '2px #FFFFFF', // Viền trắng
            textShadow: '0px 3px 6px rgba(244, 143, 177, 0.4)'
        }}
      >
        Hanakaze
      </h1>
      
      <div className="flex flex-col gap-6">
        {/* Chỉ còn 1 nút để bắt đầu chụp */}
        <Button variant="danger" className="w-64" onClick={() => setStep('input')}>
          Take photos
        </Button>
      </div>
    </div>
  );
};

export default Mode;