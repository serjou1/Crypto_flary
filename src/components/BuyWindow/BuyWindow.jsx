import React, { useState } from 'react';
import { Progress } from '../FairLaunch/Progress/Progress';
import style from './BuyWindow.module.scss';

import Arrow from '../../assets/arrow_down.svg';
import BNB from '../../assets/bnb logo.webp';
import ETH from '../../assets/ETH.svg';
import USDT from '../../assets/USDT.svg';

export const BuyWindow = () => {
  const [collected, setCollected] = useState(0);
  const [sellTokens, setSellTokens] = useState(0);
  const [inputTittle, setInputTittle] = useState('Ethereum');
  const [dropNetwork, setDropNetwork] = useState(false);
  const [dropToken, setDropToken] = useState(false);
  const [network, setNetwork] = useState('Ethereum');
  const [token, setToken] = useState('Ethereum');
  const [networkImg, setNetworkImg] = useState(ETH);
  const [tokenImg, setTokenImg] = useState(ETH);

  const handlerClickNetwork = () => {
    setDropNetwork(!dropNetwork);
  };
  const handlerClickToken = () => {
    setDropToken(!dropToken);
  };
  const handlerChangeNetwork = (arg, argImg) => {
    setDropNetwork(!dropNetwork);
    setNetwork(arg);
    setNetworkImg(argImg);
  };
  const handlerChangeToken = (arg, argImg) => {
    setDropNetwork(!dropToken);
    setToken(arg);
    setTokenImg(argImg);
    setInputTittle(arg);
  };
  // ZazazazazaZazazazazaZazazazazaZazazazazaZazazazaza
  return (
    <div className={style.BuyWindow}>
      {/* <div className={style.BuyWindowBlur}></div> */}
      <h1>Flary Presale</h1>
      <h1>Stage 1</h1>
      <p>1 FLFI = $0,100 </p>
      <p>Price next stage = $0,110</p>

      <p style={{ marginTop: '15px', fontSize: '20px' }}>
        <span style={{ fontSize: '20px' }}>Your holdings:</span>100,00
      </p>
      <Progress progress={0} />
      <p>Collected USDT : ${collected} / $500,000</p>
      <p>Tokens sold: {sellTokens} / 1,000,000,000</p>
      <div className={style.button_group}>
        {/* <div className={style.button} >
          <img src={ETHimg} alt="" />
          <div className={style.button_tittle}>
            <p>ETH</p>
            <span>ERC-20</span>
          </div>
        </div>
        <div className={style.button}>
          <img src={USDTimg} alt="" />
          <div className={style.button_tittle}>
            <p>USDT</p>
            <span>su</span>
          </div>
        </div> */}
        <div
          className={style.button}
          onClick={handlerClickNetwork}
          style={dropNetwork ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : {}}>
          <div className={style.button_tittle}>
            <img src={networkImg} alt="" />
            <p>{network}</p>
          </div>
          <img src={Arrow} alt="" />
          {dropNetwork && (
            <div className={style.drop_network}>
              <div
                className={style.button_drop}
                onClick={() => handlerChangeNetwork('Ethereum', ETH)}>
                <img src={ETH} alt="" />
                <p>Ethereum</p>
              </div>
              <div
                className={style.button_drop}
                onClick={() => handlerChangeNetwork('BNB Chain', BNB)}>
                <img src={BNB} alt="" />
                <p>BNB Chain</p>
              </div>
            </div>
          )}
        </div>

        <div
          className={style.button}
          onClick={handlerClickToken}
          style={dropToken ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : {}}>
          {network === 'BNB Chain' ? (
            <div className={style.button_tittle}>
              <img src={BNB} alt="" />
              <p>BNB</p>
            </div>
          ) : (
            <div className={style.button_tittle}>
              <img src={tokenImg} alt="" />
              <p>{token}</p>
            </div>
          )}
          <img src={Arrow} alt="" />

          {network === 'Ethereum'
            ? dropToken && (
                <div className={style.drop_network}>
                  <div
                    className={style.button_drop}
                    onClick={() => handlerChangeToken('Ethereum', ETH)}>
                    <img src={ETH} alt="" />
                    <p>Ethereum</p>
                  </div>
                  <div
                    className={style.button_drop}
                    onClick={() => handlerChangeToken('USDT', USDT)}>
                    <img src={USDT} alt="" />
                    <p>USDT</p>
                  </div>
                </div>
              )
            : null}
        </div>
      </div>
      {/* // ZazazazazaZazazazazaZazazazazaZazazazazaZazazazaza       */}
      <div className={style.inputs}>
      <div className={style.input_container}>
        {network === 'BNB Chain' ? <p className={style.labelLine}>BNB to be paid: </p> : <p className={style.labelLine}>{inputTittle} to be paid: </p>}
        <input className={style.input_buy} type="text" placeholder="0.0" />
      </div>
      <div className={style.input_container}>
        <p className={style.labelLine}>FLFI to be received: </p> 
        <input className={style.input_buy} type="text" placeholder="0.0" />
      </div>
      </div>
      
      <div className={style.pay_button}>Buy FLFI</div>
    </div>
  );
};
