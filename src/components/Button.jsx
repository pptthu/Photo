import React from 'react';

const Button = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
  // style 
  const baseStyle = "px-6 py-3 rounded-full text-xl font-bold shadow-[0_4px_0_rgba(0,0,0,0.1)] transition-all border-4 text-center cursor-pointer active:scale-95 select-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  const variants = {
    primary: "bg-brand-pink text-white border-brand-darkPink hover:bg-brand-darkPink", //  màu hồng, dùng chính 
    secondary: "bg-white text-gray-500 border-gray-300 hover:bg-gray-100",           // màu trắng dùng phụ 
    danger: "bg-white text-brand-darkPink border-brand-pink hover:bg-brand-pink hover:text-white" //cảnh bảo dùng xóa
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;