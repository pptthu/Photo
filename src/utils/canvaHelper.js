import html2canvas from 'html2canvas';

export const handleDownloadImage = async (printRef) => {
  if (!printRef.current) return;

  // 1. Ẩn nút xóa sticker
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((btn) => (btn.style.display = 'none'));

  try {
    const canvas = await html2canvas(printRef.current, {
      scale: 3, // Độ nét cao
      useCORS: true,
      backgroundColor: null, 
      // 👇 FIX QUAN TRỌNG: Chống lệch/cắt ảnh khi cuộn trang
      scrollX: 0,
      scrollY: -window.scrollY,
      width: printRef.current.offsetWidth,
      height: printRef.current.offsetHeight
    });

    const link = document.createElement('a');
    link.download = `hanakaze_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error("Download error:", err);
  } finally {
    // 2. Hiện lại nút xóa
    deleteBtns.forEach((btn) => (btn.style.display = 'flex'));
  }
};