import { create } from 'zustand';

const usePhotoStore = create((set) => ({
  step: 'home',
  photos: [], // Mảng chứa các object: { id, src, source }
  frameStyle: 'strip',

  setStep: (step) => set({ step }),

  // Thêm ảnh 
  addPhoto: (imgSrc, source = 'camera') => set((state) => ({ 
    photos: [...state.photos, { 
        id: Date.now() + Math.random(), 
        src: imgSrc, 
        source: source // 'camera' hoặc 'upload'
    }] 
  })),

  // Set toàn bộ danh sách ảnh (Dùng cho Upload)
  setPhotos: (newPhotosArrayOfObjects) => set({ photos: newPhotosArrayOfObjects }),

  setFrameStyle: (style) => set({ frameStyle: style }),

  resetAll: () => set({ step: 'home', photos: [], frameStyle: 'strip' }),
}));

export default usePhotoStore;