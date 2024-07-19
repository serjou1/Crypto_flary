import React, { useState } from 'react';
import { Progress } from '../FairLaunch/Progress/Progress';
import style from './BuyWindow.module.scss';

import ETHimg from '../../assets/ETH.svg';
import USDTimg from '../../assets/USDT.svg';

export const BuyWindow = () => {
  const [collected, setCollected] = useState(0);
  const [sellTokens, setSellTokens] = useState(0);
  const [inputTittle, setInputTittle] = useState('ETH');
  return (
    <div className={style.BuyWindow}>
      <h1>Flery Presale</h1>
      <h1>Stage 1</h1>
      <p>1 FLA = 0,100 $</p>
      <p>Price next Stage =0.110 $</p>
      <Progress progress={0} />
      <p>Collected USDT : ${collected}/$ 500 000</p>
      <p>Sold tokens:{sellTokens}/1 000 000 000</p>
      <div className={style.button_group}>
        <div className={style.button}>
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
            <span>ERC-20</span>
          </div>
        </div>
      </div>
      <div className={style.input_container}>
        <p>Sum in {inputTittle}, which you pay: </p>
        <input className={style.input_buy} type="text"  placeholder="0.0" />
      </div>
      <div className={style.pay_button}>Buy FLA</div>
    </div>
  );
};
