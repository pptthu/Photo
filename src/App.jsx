import Layout from './components/Layout';
import usePhotoStore from './store/usePhoto';

// Import các trang (Đã bỏ Upload)
import Home from './features/Home/Home';
import Mode from './features/Mode/Mode';
import Camera from './features/Input/Camera';
import Frame from './features/Frame/Frame';
import Canva from './features/Decor/Canva';

function App() {
  const step = usePhotoStore((state) => state.step);

  return (
    <Layout>
      {/* Home */}
      {step === 'home' && <Home />}

      {/* Menu */}
      {step === 'mode' && <Mode />}
      
      {/* Input: Chỉ còn Camera */}
      {step === 'input' && <Camera />}
      
      {/* Các bước sau */}
      {step === 'frame' && <Frame />}
      {step === 'decor' && <Canva />}
    </Layout>
  );
}

export default App;