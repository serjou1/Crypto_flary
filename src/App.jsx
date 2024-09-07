import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import { Footer1 } from './components';
import { Contact, Giveaway, Home, HowToBuy } from './page';

function App() {
  return (
    <div className={style.App}>
      <div className={style.wrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/giveaway" element={<Giveaway />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer1 />
    </div>
  );
}

export default App;
