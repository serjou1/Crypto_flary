import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import { Footer } from './components';
import { FairLaunch, Home } from './page';
import { PrivacyPolicy } from './page/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <div className={style.App}>
      <div className={style.wrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fairlaunch" element={<FairLaunch />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
