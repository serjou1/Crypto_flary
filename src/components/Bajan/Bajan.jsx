import React, { useState } from 'react';
import style from './Bajan.module.scss';

export const Bajan = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const hanlerOpenBajan = () => {
    setOpen(!open);
  };
  return (
    <div className={style.bajan}>
      <div className={style.bajan_section}>
        <div className={style.tittle}>
          <h2>Buying With Ethereum (ETH)</h2>
          <p onClick={hanlerOpenBajan} style={{ fontSize: '20px' }}>
            {open ? '-' : '+'}
          </p>
        </div>
        
          <ul style={open?{display:'block'}:{display:'none'}} className={style.bajan_info}>
            <li>Buying with Ethereum (ETH)</li>
            <li><span>Step 1:</span> Go to Retik Finance website: https://retik.com.</li>
            <li><span>Step 2:</span> Click on "Connect Wallet".</li>
            <li><span>Step 3:</span> Connect Your Wallet on Ethereum (ERC20) Network.</li>
            <li><span>Step 4:</span> Select the ETH button.</li>
            <li><span>Step 5:</span> Enter the desired amount of ETH you wish to swap for RETIK Tokens.
            Remember to leave sufficient ETH in your wallet for gas fees. We recommend not purchasing more than 0.98 ETH if you have 1 ETH in your wallet (leaving 0.02 ETH for Gas).</li>
            <li><span>Step 6</span>: Click "Buy Now".</li>
            <li><span>Step 7:</span> Confirm the transaction within your connected wallet.</li>
            <li><span>Step 8:</span> View your RETIK tokens in "Your Holdings".</li>
            <li><span>Important Note:</span> Gas fees on the Ethereum network can fluctuate between $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees, leaving a sufficient buffer to complete transactions without issues.</li>
          </ul>
        
      </div>
      <div className={style.bajan_section}>
        <div className={style.tittle}>
          <h2>Buying With Ethereum (ETH)</h2>
          <p onClick={hanlerOpenBajan} style={{ fontSize: '20px' }}>
            {open ? '-' : '+'}
          </p>
        </div>
        
          <ul style={open?{display:'block'}:{display:'none'}} className={style.bajan_info}>
            <li>Buying with Ethereum (ETH)</li>
            <li><span>Step 1:</span> Go to Retik Finance website: https://retik.com.</li>
            <li><span>Step 2:</span> Click on "Connect Wallet".</li>
            <li><span>Step 3:</span> Connect Your Wallet on Ethereum (ERC20) Network.</li>
            <li><span>Step 4:</span> Select the ETH button.</li>
            <li><span>Step 5:</span> Enter the desired amount of ETH you wish to swap for RETIK Tokens.
            Remember to leave sufficient ETH in your wallet for gas fees. We recommend not purchasing more than 0.98 ETH if you have 1 ETH in your wallet (leaving 0.02 ETH for Gas).</li>
            <li><span>Step 6</span>: Click "Buy Now".</li>
            <li><span>Step 7:</span> Confirm the transaction within your connected wallet.</li>
            <li><span>Step 8:</span> View your RETIK tokens in "Your Holdings".</li>
            <li><span>Important Note:</span> Gas fees on the Ethereum network can fluctuate between $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees, leaving a sufficient buffer to complete transactions without issues.</li>
          </ul>
        
      </div>
      <div className={style.bajan_section}>
        <div className={style.tittle}>
          <h2>Buying With Ethereum (ETH)</h2>
          <p onClick={hanlerOpenBajan} style={{ fontSize: '20px' }}>
            {open ? '-' : '+'}
          </p>
        </div>
        
          <ul style={open?{display:'block'}:{display:'none'}} className={style.bajan_info}>
            <li>Buying with Ethereum (ETH)</li>
            <li><span>Step 1:</span> Go to Retik Finance website: https://retik.com.</li>
            <li><span>Step 2:</span> Click on "Connect Wallet".</li>
            <li><span>Step 3:</span> Connect Your Wallet on Ethereum (ERC20) Network.</li>
            <li><span>Step 4:</span> Select the ETH button.</li>
            <li><span>Step 5:</span> Enter the desired amount of ETH you wish to swap for RETIK Tokens.
            Remember to leave sufficient ETH in your wallet for gas fees. We recommend not purchasing more than 0.98 ETH if you have 1 ETH in your wallet (leaving 0.02 ETH for Gas).</li>
            <li><span>Step 6</span>: Click "Buy Now".</li>
            <li><span>Step 7:</span> Confirm the transaction within your connected wallet.</li>
            <li><span>Step 8:</span> View your RETIK tokens in "Your Holdings".</li>
            <li><span>Important Note:</span> Gas fees on the Ethereum network can fluctuate between $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees, leaving a sufficient buffer to complete transactions without issues.</li>
          </ul>
        
      </div>
      <div className={style.bajan_section}>
        <div className={style.tittle}>
          <h2>Buying With Ethereum (ETH)</h2>
          <p onClick={hanlerOpenBajan} style={{ fontSize: '20px' }}>
            {open ? '-' : '+'}
          </p>
        </div>
        
          <ul style={open?{display:'block'}:{display:'none'}} className={style.bajan_info}>
            <li>Buying with Ethereum (ETH)</li>
            <li><span>Step 1:</span> Go to Retik Finance website: https://retik.com.</li>
            <li><span>Step 2:</span> Click on "Connect Wallet".</li>
            <li><span>Step 3:</span> Connect Your Wallet on Ethereum (ERC20) Network.</li>
            <li><span>Step 4:</span> Select the ETH button.</li>
            <li><span>Step 5:</span> Enter the desired amount of ETH you wish to swap for RETIK Tokens.
            Remember to leave sufficient ETH in your wallet for gas fees. We recommend not purchasing more than 0.98 ETH if you have 1 ETH in your wallet (leaving 0.02 ETH for Gas).</li>
            <li><span>Step 6</span>: Click "Buy Now".</li>
            <li><span>Step 7:</span> Confirm the transaction within your connected wallet.</li>
            <li><span>Step 8:</span> View your RETIK tokens in "Your Holdings".</li>
            <li><span>Important Note:</span> Gas fees on the Ethereum network can fluctuate between $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees, leaving a sufficient buffer to complete transactions without issues.</li>
          </ul>
        
      </div>
      <div className={style.bajan_section}>
        <div className={style.tittle}>
          <h2>Buying With Ethereum (ETH)</h2>
          <p onClick={hanlerOpenBajan} style={{ fontSize: '20px' }}>
            {open ? '-' : '+'}
          </p>
        </div>
        
          <ul style={open?{display:'block'}:{display:'none'}} className={style.bajan_info}>
            <li>Buying with Ethereum (ETH)</li>
            <li><span>Step 1:</span> Go to Retik Finance website: https://retik.com.</li>
            <li><span>Step 2:</span> Click on "Connect Wallet".</li>
            <li><span>Step 3:</span> Connect Your Wallet on Ethereum (ERC20) Network.</li>
            <li><span>Step 4:</span> Select the ETH button.</li>
            <li><span>Step 5:</span> Enter the desired amount of ETH you wish to swap for RETIK Tokens.
            Remember to leave sufficient ETH in your wallet for gas fees. We recommend not purchasing more than 0.98 ETH if you have 1 ETH in your wallet (leaving 0.02 ETH for Gas).</li>
            <li><span>Step 6</span>: Click "Buy Now".</li>
            <li><span>Step 7:</span> Confirm the transaction within your connected wallet.</li>
            <li><span>Step 8:</span> View your RETIK tokens in "Your Holdings".</li>
            <li><span>Important Note:</span> Gas fees on the Ethereum network can fluctuate between $10-$25 worth of ETH. Ensure you have enough ETH in your wallet to cover these fees, leaving a sufficient buffer to complete transactions without issues.</li>
          </ul>
        
      </div>
      
    </div>
  );
};
