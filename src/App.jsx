import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import { Footer1 } from './components';
import { Contact, Giveaway, Home, HowToBuy } from './page';
import { useAccount } from 'wagmi';
import { useEffect, useMemo } from 'react';

// import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl } from '@solana/web3.js';

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

  // const network = clusterApiUrl('devnet'); // Change to 'mainnet-beta' for mainnet
  // const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <div className={style.App}>
      <div className={style.wrapper}>

        {/* <ConnectionProvider endpoint={network}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/giveaway" element={<Giveaway />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider> */}
      </div>
      <Footer1 />
    </div>
  );
}

export default App;
