import html2canvas from 'html2canvas';

export const handleDownloadImageCloned = async (printRef, targetWidth) => {
  const element = printRef.current;
  if (!element) return;

  const originalDeleteBtns = element.querySelectorAll('.delete-btn');
  originalDeleteBtns.forEach((btn) => (btn.style.display = 'none'));

  try {
    // 1. TẠO CLONE
    const clone = element.cloneNode(true);

    // 2. CẤU HÌNH CSS (Giữ nguyên để fix lỗi lệch layout trên mobile)
    clone.style.position = 'fixed';
    clone.style.top = '-10000px';
    clone.style.left = '-10000px';
    clone.style.width = `${targetWidth}px`;
    clone.style.height = 'auto';
    clone.style.transform = 'none';
    clone.style.margin = '0';
    clone.style.boxSizing = 'border-box';

    document.body.appendChild(clone);

    // 3. CHỤP ẢNH
    // Không cần chờ load ảnh phức tạp nữa vì Camera base64 load ngay lập tức
    const canvas = await html2canvas(clone, {
      scale: 3, 
      useCORS: true,
      backgroundColor: null,
      scrollY: -window.scrollY, 
    });

    // 4. TẢI VỀ
    const link = document.createElement('a');
    link.download = `hanakaze_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    // 5. DỌN DẸP
    document.body.removeChild(clone);

  } catch (err) {
    console.error("Download error:", err);
  } finally {
    originalDeleteBtns.forEach((btn) => (btn.style.display = 'flex'));
  }
};