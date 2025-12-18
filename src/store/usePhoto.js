import { create } from 'zustand';

const usePhotoStore = create((set) => ({
  step: 'home',
  photos: [], // Mảng chứa ảnh (tạm thời để rỗng cũng được)
  frameStyle: 'strip', // 👇 THÊM DÒNG NÀY (Mặc định là strip)

  setStep: (step) => set({ step }),

  // Hàm thêm ảnh giả (chỉ cần tăng số lượng là được)
  addPhoto: (photo) => set((state) => ({ 
    photos: [...state.photos, photo] 
  })),

  // 👇 THÊM HÀM MỚI NÀY (Dùng cho Upload - Lưu 1 lúc 4 ảnh)
  setPhotos: (newPhotosArray) => set({ photos: newPhotosArray }),
    // 👇 THÊM HÀM NÀY
  setFrameStyle: (style) => set({ frameStyle: style }),

  resetAll: () => set({ step: 'home', photos: [], frameStyle: 'strip' }),
}));

export default usePhotoStore;
