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
            color: '#F48FB1',
            WebkitTextStroke: '1.5px #C2185B',
            textShadow: '0px 2px 0px #FFFFFF'
        }}
      >
        Hanakaze
      </h1>
      
      <div className="flex flex-col gap-6">
        <Button variant="danger" className="w-64" onClick={() => setStep('input')}>
          Take photos
        </Button>
        <Button variant="danger" className="w-64" onClick={() => setStep('upload')}>
          Upload photos
        </Button>
      </div>
    </div>
  );
};

export default Mode;