import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import usePhotoStore from '../../store/usePhoto.js';

const Upload = () => {
  const setStep = usePhotoStore((state) => state.setStep);
  const setPhotosToStore = usePhotoStore((state) => state.setPhotos);
  
  const [uploadedImages, setUploadedImages] = useState([]);

  // Xử lý kéo thả file
  const onDrop = useCallback((acceptedFiles) => {
    const remainingSlots = 4 - uploadedImages.length;
    const filesToAdd = acceptedFiles.slice(0, remainingSlots);

    const newImageUrls = filesToAdd.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
    }));

    setUploadedImages(prev => [...prev, ...newImageUrls]);
  }, [uploadedImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    disabled: uploadedImages.length >= 4,
    maxFiles: 4
  });

  // Xóa ảnh
  const removeImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // Tiếp tục
  const handleContinue = () => {
    if (uploadedImages.length === 4) {
      const finalPhotos = uploadedImages.map(img => img.preview);
      setPhotosToStore(finalPhotos);
      setTimeout(() => setStep('frame'), 300);
    }
  };

  return (
    // 👇 SỬA 1: Tăng pt-24 -> pt-32 (Đẩy nội dung xuống thấp để né Logo)
    <div className="flex flex-col items-center justify-center h-full w-full pt-32 pb-4 px-4 animate-fade-in relative overflow-hidden">
      
      {/* 1. SỐ ĐẾM (PILL) */}
      {/* 👇 SỬA 2: Giảm mb-4 -> mb-2 (Kéo 4/4 sát vào khung ảnh hơn) */}
      <div className="mb-2 z-20">
        <div className="bg-white border-2 border-brand-pink px-8 py-2 rounded-full shadow-md min-w-[100px] text-center">
           <span className="text-3xl font-bold text-brand-darkPink font-sans">
             {uploadedImages.length}/4
           </span>
        </div>
      </div>

      {/* 2. KHUNG UPLOAD */}
      <div className="bg-white/30 backdrop-blur-sm p-3 rounded-[1.5rem] border border-white/50 shadow-xl mb-6 w-full max-w-xl">
        <div className="bg-brand-pink p-2 rounded-xl shadow-inner h-full">
           
           <div className="w-full aspect-[4/3] bg-white rounded-lg overflow-hidden relative border-4 border-white">
              
              {/* A. VÙNG KÉO THẢ */}
              {uploadedImages.length < 4 && (
                <div 
                    {...getRootProps()} 
                    className={`absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer transition-all bg-white/50 hover:bg-brand-pink/10
                    ${isDragActive ? 'bg-brand-pink/20' : ''}`}
                >
                    <input {...getInputProps()} />
                    <span className="text-5xl mb-4">📂</span>
                    <p className="text-brand-darkPink font-bold text-xl">
                        {isDragActive ? "Drop photos here..." : "Click or Drag to Upload"}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">(Max 4 photos)</p>
                </div>
              )}

              {/* B. LƯỚI HIỂN THỊ ẢNH */}
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 p-1">
                 {uploadedImages.map((file, index) => (
                    <div key={index} className="relative w-full h-full rounded-md overflow-hidden group shadow-sm border border-gray-200">
                        <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                        
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                            }}
                            className="absolute top-1 right-1 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-50 transition-all font-bold z-50"
                        >
                            ✕
                        </button>
                    </div>
                 ))}
              </div>

           </div>
        </div>
      </div>

      {/* 3. CỤM NÚT */}
      <div className="flex items-center gap-6 z-20 pb-4">
        <button 
          onClick={() => setStep('mode')}
          className="w-12 h-12 rounded-full bg-white/80 text-gray-500 font-bold text-xl shadow-lg hover:bg-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <button 
          onClick={handleContinue}
          disabled={uploadedImages.length < 4}
          className={`px-10 py-3 rounded-full text-xl font-bold shadow-[0_4px_0_rgba(0,0,0,0.1)] transition-all border-2 min-w-[160px]
            ${uploadedImages.length < 4 
                ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed' 
                : 'bg-brand-pink text-white border-brand-darkPink hover:translate-y-1 hover:shadow-none hover:bg-brand-darkPink cursor-pointer shadow-[0_4px_0_#C2185B]'
            }
          `}
        >
          Continue
        </button>
      </div>

    </div>
  );
};

export default Upload;