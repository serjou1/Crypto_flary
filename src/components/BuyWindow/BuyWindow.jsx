import React, { useState } from 'react';
import { Progress } from '../FairLaunch/Progress/Progress';
import style from './BuyWindow.module.scss';

import Arrow from '../../assets/arrow_down.svg';
import BNB from '../../assets/bnb logo.webp';
import ETH from '../../assets/ETH.svg';
import USDT from '../../assets/USDT.svg';

import {ethers} from 'ethers';
import { FLARY_PRESALE_ABI } from './flary-contract-abi';
import { ERC_20_ABI } from './erc-20-abi';
import { config } from '../../config';

const {
  ETH_CONTRACT_ADDRESS,
  BSC_CONTRACT_ADDRESS,
  ETH_USDT_ADDRESS,
  BSC_USDT_ADDRESS
} = config;

const NETWORK_ETHEREUM = 'Ethereum';
const NETWORK_BSC = 'BNB Chain';

const TOKEN_ETHEREUM = 'Ethereum';
const TOKEN_USDT = 'USDT';
const TOKEN_BNB = 'BNB';

export const BuyWindow = () => {
  const [collected, setCollected] = useState(0);
  const [sellTokens, setSellTokens] = useState(0);
  const [inputTittle, setInputTittle] = useState('Ethereum');
  const [dropNetwork, setDropNetwork] = useState(false);
  const [dropToken, setDropToken] = useState(false);
  const [network, setNetwork] = useState(NETWORK_ETHEREUM);
  const [token, setToken] = useState(TOKEN_ETHEREUM);
  const [networkImg, setNetworkImg] = useState(ETH);
  const [tokenImg, setTokenImg] = useState(ETH);

  // TODO: validate invalid input
  const [inputAmount, setInputAmount] = useState('0');
  // const [outputA]

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
  
  const buyCoins = async () => {
    if (network === NETWORK_ETHEREUM && token === TOKEN_ETHEREUM) {
      await buyTokensNative(NETWORK_ETHEREUM);
    } else if (network === NETWORK_BSC && token === TOKEN_BNB) {
      await buyTokensNative(NETWORK_BSC);
    } else if (network === NETWORK_ETHEREUM) {
      await buyTokensUsdt(NETWORK_ETHEREUM);
    } else {
      await buyTokensUsdt(NETWORK_BSC);
    }
  };

  const buyTokensNative = async (network) => {
    const amount = ethers.parseEther(Number(inputAmount).toFixed(18));

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractAddress = network === NETWORK_ETHEREUM
      ? ETH_CONTRACT_ADDRESS
      : BSC_CONTRACT_ADDRESS;

    const contract = new ethers.Contract(contractAddress, FLARY_PRESALE_ABI, signer);

    const paused = await contract.paused();
    if (paused) {
      console.log('Token presale is PAUSED!!!');
      // alert("token presale is PAUSED!!!")
      return;
    }

    const tx = await contract.buyTokensNative({ value: amount });

    // TODO: disable front

    await tx.wait();

    // TODO: enable front
  }

  const buyTokensUsdt = async (network) => {
    const decimals = network === NETWORK_ETHEREUM ? 6 : 18;
    const amount = ethers.parseUnits(Number(inputAmount).toFixed(decimals), decimals);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractAddress = network === NETWORK_ETHEREUM
      ? ETH_CONTRACT_ADDRESS
      : BSC_CONTRACT_ADDRESS;

    const contract = new ethers.Contract(contractAddress, FLARY_PRESALE_ABI, signer);

    const usdtAddress = network === NETWORK_ETHEREUM
      ? ETH_USDT_ADDRESS
      : BSC_USDT_ADDRESS;

    const usdt = new ethers.Contract(usdtAddress, ERC_20_ABI, signer);

    const paused = await contract.paused();
    if (paused) {
      console.log('Token presale is PAUSED!!!');
      return;
    }

    const allowance = await usdt.allowance(signer.address, contractAddress);

    // TODO: disable front

    if (allowance < amount) {
      const approveTx = await usdt.approve(contractAddress, amount);
      await approveTx.wait();
    }

    const tx = await contract.buyTokensUSDT(amount);
    await tx.wait();

    // TODO: enable front
  }

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
                onClick={() => handlerChangeNetwork(NETWORK_ETHEREUM, ETH)}>
                <img src={ETH} alt="" />
                <p>Ethereum</p>
              </div>
              <div
                className={style.button_drop}
                onClick={() => handlerChangeNetwork(NETWORK_BSC, BNB)}>
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
            <div className={style.button_tittle}>
            <img src={tokenImg} alt="" />
            <p>{token}</p>
          </div>
          {network === NETWORK_BSC
            ? dropToken && (
                <div className={style.drop_network}>
                  <div className={style.button_drop} onClick={() => handlerChangeToken(TOKEN_BNB, BNB)}>
                    <img src={BNB} alt="" />
                    <p>BNB</p>
                  </div>
                  <div
                    className={style.button_drop}
                    onClick={() => handlerChangeToken(TOKEN_USDT, USDT)}>
                    <img src={USDT} alt="" />
                    <p>USDT</p>
                  </div>
                </div>
              )
            : null}
          <img src={Arrow} alt="" />

          {network === NETWORK_ETHEREUM
            ? dropToken && (
                <div className={style.drop_network}>
                  <div
                    className={style.button_drop}
                    onClick={() => handlerChangeToken(TOKEN_ETHEREUM, ETH)}>
                    <img src={ETH} alt="" />
                    <p>Ethereum</p>
                  </div>
                  <div
                    className={style.button_drop}
                    onClick={() => handlerChangeToken(TOKEN_USDT, USDT)}>
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
          <p className={style.labelLine}>{inputTittle} to be paid: </p>
          <input className={style.input_buy} type="text" placeholder="0.0" onChange={(e) => setInputAmount(e.target.value)} />
        </div>
        <div className={style.input_container}>
          <p className={style.labelLine}>FLFI to be received: </p>
          <input className={style.input_buy} type="text" placeholder="0.0" />
        </div>
      </div>

      <div className={style.pay_button} onClick={() => buyCoins()}>Buy FLFI</div>
    </div>
  );
};
