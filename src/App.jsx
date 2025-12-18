import Layout from './components/Layout';
import usePhotoStore from './store/usePhoto';

// Import đầy đủ các trang
import Home from './features/Home/Home';
import Mode from './features/Mode/Mode';
import Camera from './features/Input/Camera';
import Upload from './features/Input/Upload'; // 👈 Nhớ dòng này
import Frame from './features/Frame/Frame';
import Canva from './features/Decor/Canva';

function App() {
  const step = usePhotoStore((state) => state.step);

  return (
    <Layout>
      {/* Màn hình Home */}
      {step === 'home' && <Home />}

      {/* Màn hình Menu */}
      {step === 'mode' && <Mode />}
      
      {/* 👇 CHỖ NÀY QUAN TRỌNG: Tách riêng ra */}
      {step === 'input' && <Camera />}   {/* step là input -> Hiện Camera */}
      {step === 'upload' && <Upload />}  {/* step là upload -> Hiện Upload */}
      
      {/* Các bước sau */}
      {step === 'frame' && <Frame />}
      {step === 'decor' && <Canva />}
    </Layout>
  );
}

export default App;