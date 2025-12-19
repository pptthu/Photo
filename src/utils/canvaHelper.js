import html2canvas from 'html2canvas';

export const handleDownloadImage = async (printRef) => {
  if (!printRef.current) return;

  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((btn) => (btn.style.display = 'none'));

  try {
    const canvas = await html2canvas(printRef.current, {
      scale: 3, 
      useCORS: true,
      backgroundColor: null,
      
      // 👇 BỘ TỨ CẤU HÌNH CHỐNG LỆCH ẢNH TUYỆT ĐỐI
      scrollX: 0,
      scrollY: 0, 
      x: 0, 
      y: 0,
      
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
    deleteBtns.forEach((btn) => (btn.style.display = 'flex'));
  }
};