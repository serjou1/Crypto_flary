import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import { Footer } from './components';
import { FairLaunch, Giveaway, Home, HowToBuy } from './page';



function App() {
  return (
    <div className={style.App}>
      <div className={style.wrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fairlaunch" element={<FairLaunch />} />
          <Route path="/how-to-buy" element={<HowToBuy  />} />
          <Route path="/giveaway" element={<Giveaway  />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
