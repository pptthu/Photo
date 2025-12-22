import html2canvas from 'html2canvas';

export const handleDownloadImageCloned = async (printRef) => {
  const element = printRef.current;
  if (!element) return;

  const deleteBtns = element.querySelectorAll('.delete-btn');
  deleteBtns.forEach((btn) => (btn.style.display = 'none'));

  try {
    const canvas = await html2canvas(element, {
      scale: 3, 
      useCORS: true,
      backgroundColor: null, 
    });

    // TẢI VỀ
    const link = document.createElement('a');
    link.download = `pptt_booth.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

  } catch (err) {
    console.error("Lỗi khi tải ảnh:", err);
    alert("Không thể lưu ảnh. Bạn hãy thử chụp màn hình nhé!");
  } finally {
    //Hiện lại nút xóa
    deleteBtns.forEach((btn) => (btn.style.display = 'flex'));
  }
};