import usePhotoStore from '../store/usePhoto.js';

const Layout = ({ children }) => {
  const step = usePhotoStore((state) => state.step);
  const isBlurred = step && step !== 'home'; 

  return (
    // Container ngoài cùng: Giữ nguyên h-screen và overflow-hidden để KHÓA khung hình ứng dụng
    <div className="relative w-full h-screen overflow-hidden font-sans">
      
      {/* 1. ẢNH NỀN & LỚP PHỦ (Vẫn giữ absolute để đứng im làm nền) */}
      <img 
        src="/assets/backgrounds/bg-desktop.jpg" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover -z-20 scale-105" 
      />
      
      <div className={`absolute inset-0 -z-10 transition-all duration-700 ease-in-out
        ${isBlurred ? 'bg-black/10 backdrop-blur-[5px]' : 'bg-transparent backdrop-blur-0'}
      `}></div>

      {/* 2. LOGO CỐ ĐỊNH (Luôn nổi lên trên cùng, không bị cuộn theo nội dung) */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <img 
          src="/assets/logo.png" 
          alt="Logo" 
          className="w-24 md:w-28 drop-shadow-md" 
        />
      </div>

      {/* 3. VÙNG NỘI DUNG CHÍNH (QUAN TRỌNG: Thêm overflow-y-auto) 
         - overflow-y-auto: Tự động hiện thanh cuộn nếu nội dung dài quá màn hình
         - h-full: Chiếm toàn bộ chiều cao còn lại
      */}
      <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Layout;