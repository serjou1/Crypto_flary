import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import { Footer1 } from './components';
import { Contact, FairLaunch, Giveaway, Home, HowToBuy } from './page';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

function App() {
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const handleAuth = async () => {
      const referrerCode = new URLSearchParams(window.location.search).get('ref');
      console.log(referrerCode);

      await fetch("https://back.flary.finance/api/user/registerUser", {
        method: "POST",
        body: JSON.stringify({ address, referrerCode })
      });

      localStorage.setItem('wagmi-connected', 'true')
    }
    const connectedStatus = localStorage.getItem('wagmi-connected')
    if (!connectedStatus && isConnected) {
      handleAuth()
    } else {
      localStorage.removeItem('wagmi-connected')
    }
  }, [isConnected])

  return (
    <div className={style.App}>
      <div className={style.wrapper}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fairlaunch" element={<FairLaunch />} />
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
