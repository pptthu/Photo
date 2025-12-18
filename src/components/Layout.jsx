import usePhotoStore from '../store/usePhoto.js'; // 👈 QUAN TRỌNG: Không có dòng này là bị lỗi Blur

const Layout = ({ children }) => {
  const step = usePhotoStore((state) => state.step);
  
  // Logic: Chỉ làm mờ nếu KHÔNG PHẢI trang home
  // Nếu step bị lỗi (undefined) thì coi như không phải home -> bị mờ
  const isBlurred = step && step !== 'home'; 

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      {/* 1. ẢNH NỀN GỐC */}
      <img 
        src="/assets/backgrounds/bg-desktop.jpg" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover -z-20 scale-105" 
      />
      
      {/* 2. LỚP PHỦ MỜ (Chỉ hiện khi isBlurred = true) */}
      <div className={`absolute inset-0 -z-10 transition-all duration-700 ease-in-out
        ${isBlurred ? 'bg-black/10 backdrop-blur-[5px]' : 'bg-transparent backdrop-blur-0'}
      `}></div>

      {/* 3. LOGO CỐ ĐỊNH (Luôn nằm ở đây) */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-center">
        <img 
          src="/assets/logo.png" 
          alt="Logo" 
          className="w-24 md:w-28 drop-shadow-md" 
        />
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;