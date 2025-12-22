import usePhotoStore from '../store/usePhoto.js';

const Layout = ({ children }) => {
  const step = usePhotoStore((state) => state.step);
  const isBlurred = step && step !== 'home'; 

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      
      {/* 1. ẢNH NỀN & LỚP PHỦ (Giữ nguyên) */}
      <img 
        src="/assets/backgrounds/bg-desktop.jpg" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover -z-20 scale-105" 
      />
      <div className={`absolute inset-0 -z-10 transition-all duration-700 ease-in-out
        ${isBlurred ? 'bg-black/10 backdrop-blur-[5px]' : 'bg-transparent backdrop-blur-0'}
      `}></div>

      {/* 2. LOGO (Giữ nguyên) */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <img src="/assets/logo.png" alt="Logo" className="w-24 md:w-28 drop-shadow-md" />
      </div>

      {/* 3. VÙNG NỘI DUNG CHÍNH */}
      {/* 🔴 FIX LỖI NHÍCH MÀN HÌNH: */}
      {/* Thay 'overflow-y-auto' thành 'overflow-y-scroll' */}
      {/* Điều này bắt buộc thanh cuộn luôn hiện (dù mờ), giữ layout cố định không bị nhảy */}
      <div className="relative z-10 w-full h-full overflow-y-scroll overflow-x-hidden custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Layout;