import React, { useEffect, useState } from 'react';
import { Progress } from '../FairLaunch/Progress/Progress';
import style from './BuyWindow.module.scss';

import Arrow from '../../assets/arrow_down.svg';
import BNB from '../../assets/bnb logo.webp';
import ETH from '../../assets/ETH.svg';
import USDT from '../../assets/USDT.svg';

import { Contract, ethers, formatUnits } from 'ethers';
import { config } from '../../config';
import { Loader } from '../FairLaunch/Form/Loader';
import { ERC_20_ABI } from './erc-20-abi';
import { FLARY_PRESALE_ABI } from './flary-contract-abi';
import { PRICE_FEED_ABI } from './price-feed-abi';

const {
  ETH_CONTRACT_ADDRESS,
  BSC_CONTRACT_ADDRESS,
  ETH_USDT_ADDRESS,
  BSC_USDT_ADDRESS,
  RPC_ETH,
  RPC_BSC,
} = config;
const Amount_FOR_STAGE = 300000;

const NETWORK_ETHEREUM = 'Ethereum';
const NETWORK_BSC = 'BNB Chain';

const TOKEN_ETHEREUM = 'Ethereum';
const TOKEN_USDT = 'USDT';
const TOKEN_BNB = 'BNB';

const stages = [
  {
    amount: 1_000_000_000,
    price: 0.1,
  },
  {
    amount: 1_000_000_000,
    price: 0.11,
  },
  {
    amount: 1_000_000_000,
    price: 0.12,
  },
];

export const BuyWindow = () => {
  
  const [collected, setCollected] = useState(0);
  const [sellTokens, setSellTokens] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inputTittle, setInputTittle] = useState('Ethereum');
  const [dropNetwork, setDropNetwork] = useState(false);
  const [dropToken, setDropToken] = useState(false);
  const [network, setNetwork] = useState(NETWORK_ETHEREUM);
  const [token, setToken] = useState(TOKEN_ETHEREUM);
  const [networkImg, setNetworkImg] = useState(ETH);
  const [tokenImg, setTokenImg] = useState(ETH);
  const [loading, setLoading] = useState(false);
  const [tokensFromAmount, setTokensFromAmount] = useState(0);
  const [tokensToAmount, setTokensToAmount] = useState(0);
  const [tokenHoldings, setTokenHoldings] = useState('0');
  const [networkPrices, setNetworkPrices] = useState({});
  const [tokenPrice, setTokenPrice] = useState(0);

  useEffect(() => {
    updateTokenHoldings();
  }, [collected]);

  // TODO: validate invalid input
  // const [inputAmount, setInputAmount] = useState('0');
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
    if (tokensFromAmount > 0) {
      if (network === NETWORK_ETHEREUM && token === TOKEN_ETHEREUM) {
        await buyTokensNative(NETWORK_ETHEREUM);
      } else if (network === NETWORK_BSC && token === TOKEN_BNB) {
        await buyTokensNative(NETWORK_BSC);
      } else if (network === NETWORK_ETHEREUM) {
        await buyTokensUsdt(NETWORK_ETHEREUM);
      } else {
        await buyTokensUsdt(NETWORK_BSC);
      }
    } else {
      alert('Please enter value more than 0');
    }
  };

  const getContract = (network, provider) => {
    const contractAddress =
      network === NETWORK_ETHEREUM ? ETH_CONTRACT_ADDRESS : BSC_CONTRACT_ADDRESS;

    const contract = new ethers.Contract(contractAddress, FLARY_PRESALE_ABI, provider);

    return contract;
  };

  const initializeNativeCurrencyPrice = async (network) => {
    const providerRpc = network === NETWORK_ETHEREUM ? RPC_ETH : RPC_BSC;

    const provider = new ethers.JsonRpcProvider(providerRpc);

    const contract = getContract(network, provider);

    const priceFeedAddress = await contract.s_native_usd_priceFeed();

    const priceFeed = new Contract(priceFeedAddress, PRICE_FEED_ABI, provider);

    const priceLatest = await priceFeed.latestAnswer();
    const decimals = await priceFeed.decimals();

    networkPrices[network] = Number(formatUnits(priceLatest, decimals));

    setNetworkPrices(networkPrices);

    console.log(`${network} price is ${networkPrices[network]}`)
  }

  const getBoughtTokens = async (network, address) => {
    const providerRpc = network === NETWORK_ETHEREUM ? RPC_ETH : RPC_BSC;

    // TODO: remove this
    if (network === NETWORK_BSC) {
      return 0;
    }

    const provider = new ethers.JsonRpcProvider(providerRpc);
    const contract = getContract(network, provider);

    const balance = await contract.s_investemetByAddress(address);
    return Number(ethers.formatEther(balance));
  };

  const getTokensSold = async (network) => {
    const providerRpc = network === NETWORK_ETHEREUM ? RPC_ETH : RPC_BSC;

    // TODO: remove this
    if (network === NETWORK_BSC) {
      return 0;
    }

    const provider = new ethers.JsonRpcProvider(providerRpc);
    const contract = getContract(network, provider);

    const tokensSold = await contract.s_tokenSold();

    return Number(ethers.formatEther(tokensSold));
  };

  const updateTokenHoldings = async () => {
    await initializeNativeCurrencyPrice(NETWORK_ETHEREUM);
    // TODO: uncomment later
    // await initializeNativeCurrencyPrice(NETWORK_BSC);

    const providerEth = new ethers.JsonRpcProvider(RPC_ETH);
    const contract = getContract(NETWORK_ETHEREUM, providerEth);
    const tp = Number(formatUnits(await contract.i_tokensPriceInUsdt(), 6));
    setTokenPrice(tp);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const boughtTokensEth = await getBoughtTokens(NETWORK_ETHEREUM, signer.address);
    const boughtTokensBsc = await getBoughtTokens(NETWORK_BSC, signer.address);

    const tokensSoldEth = await getTokensSold(NETWORK_ETHEREUM);
    const tokensSoldBsc = await getTokensSold(NETWORK_BSC);

    const totalAmount = tokensSoldBsc + tokensSoldEth;
    setSellTokens(Number(totalAmount.toFixed(2)));

    let totalUsd = 0;
    let tokensLeft = totalAmount;
    for (const stage of stages) {
      if (tokensLeft < stage.amount) {
        totalUsd += tokensLeft * stage.price;
        break;
      }

      totalUsd += stage.amount * stage.price;
      tokensLeft -= stage.amount;
    }

    setCollected(Number(totalUsd.toFixed(2)));

    setTokenHoldings(
      `${(boughtTokensEth + boughtTokensBsc).toFixed(2)}`,
      // (${boughtTokensEth.toFixed(
      //   2,
      // )} on ETH + ${boughtTokensBsc.toFixed(2)} on BSC)`,
    );
  };

  const buyTokensNative = async (network) => {
    const amount = ethers.parseEther(Number(tokensFromAmount).toFixed(18));

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = getContract(network, signer);

    const paused = await contract.paused();
    if (paused) {
      console.log('Token presale is PAUSED!!!');
      // alert("token presale is PAUSED!!!")
      return;
    }

    const tx = await contract.buyTokensNative({ value: amount });

    // TODO: disable front
    setLoading(true);

    await tx.wait();
    await updateTokenHoldings();
    setLoading(false);

    // TODO: enable front
  };

  const buyTokensUsdt = async (network) => {
    const decimals = network === NETWORK_ETHEREUM ? 6 : 18;
    const amount = ethers.parseUnits(Number(tokensFromAmount).toFixed(decimals), decimals);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = getContract(network, signer);

    const usdtAddress = network === NETWORK_ETHEREUM ? ETH_USDT_ADDRESS : BSC_USDT_ADDRESS;

    const usdt = new ethers.Contract(usdtAddress, ERC_20_ABI, signer);

    const paused = await contract.paused();
    if (paused) {
      console.log('Token presale is PAUSED!!!');
      return;
    }

    const allowance = await usdt.allowance(signer.address, await contract.getAddress());

    // TODO: disable front
    setLoading(true);

    if (allowance < amount) {
      const approveTx = await usdt.approve(await contract.getAddress(), amount);
      await approveTx.wait();
    }

    const tx = await contract.buyTokensUSDT(amount);
    await tx.wait();
    await updateTokenHoldings();
    setLoading(false);
    // TODO: enable front
    const progressInPercent = (parseFloat(tokensFromAmount) / Amount_FOR_STAGE) * 100;

    setProgress((prevProgress) => prevProgress + progressInPercent);
  };
  const [collectedX, setCollectedX] = useState(() => {
    const savedNumber = localStorage.getItem('collectedX');
    return savedNumber !== null
      ? parseInt(savedNumber, 10)
      : Math.floor(Math.random() * 45001) + 210000;
  });
  const [sellTokensX, setSellTokensX] = useState(0);
  useEffect(() => {
    localStorage.setItem('collectedX', collectedX);
    const progressInPercent = (collectedX / Amount_FOR_STAGE) * 100;

    setProgress(progressInPercent);
    setSellTokensX((collectedX / 0.1).toFixed(0));
  }, [ collectedX]);

  const isBaseCoinSelected = () => token !== TOKEN_USDT;
  const getBaseCoinPrice = () => {
    console.log("network", network);
    console.log(networkPrices);


    return networkPrices[network];
  }

  return (
    <div className={style.BuyWindow}>
      {/* <div className={style.BuyWindowBlur}></div> */}
      <div className={style.bg}>
        <h1>Stage 1</h1>
      </div>
      <p>1 FLFI = $0,100 </p>
      <p>Price next stage = $0,110</p>

      <p style={{ marginTop: '15px', fontSize: '20px' }}>
        <span style={{ fontSize: '20px' }}>Your holdings:</span> {tokenHoldings}
      </p>
      <Progress progress={progress.toFixed(2)} />
      <p>Collected USDT : ${collectedX} / $300,000</p>
      <p>Tokens sold: {sellTokensX} / 1,000,000,000</p>
      <div className={style.button_group}>
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
                <div
                  className={style.button_drop}
                  onClick={() => handlerChangeToken(TOKEN_BNB, BNB)}>
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

      <div className={style.inputs}>
        <div className={style.input_container}>
          <p className={style.labelLine}>{inputTittle} to be paid: </p>
          <input
            className={style.input_buy}
            type="text"
            placeholder="0.0"
            value={tokensFromAmount}
            onChange={(e) => {

              const value = parseFloat(e.target.value);

              if (value === NaN) {
                return;
              }
              console.log("value intial:", e.target.value)
              console.log("value:", value)
              setTokensFromAmount(value);
              console.log("actual amount:", tokensFromAmount)
              const tokensToAmountNew = value * (
                isBaseCoinSelected()
                  ? getBaseCoinPrice()
                  : 1
              )
                / tokenPrice;
              console.log("isBaseCoinSelected", isBaseCoinSelected());
              console.log("getBaseCoinPrice", getBaseCoinPrice());
              console.log("new tokens to amount:", tokensToAmountNew);

              setTokensToAmount(tokensToAmountNew);


              console.log("actual tokens to amount:", tokensToAmount);
            }}
          />
        </div>
        <div className={style.input_container}>
          <p className={style.labelLine}>FLFI to be received: </p>
          <input
            className={style.input_buy}
            type="text"
            placeholder="0.0"
            value={tokensToAmount}
            onChange={(e) => {
              const value = parseFloat(e.target.value);

              if (value === NaN) {
                return;
              }
              setTokensToAmount(value);
              const tokensFromAmountNew = value * tokenPrice / (
                isBaseCoinSelected()
                  ? getBaseCoinPrice()
                  : 1
              );
              setTokensFromAmount(tokensFromAmountNew);
            }} />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className={style.pay_button} onClick={() => buyCoins()}>
          Buy FLFI
        </div>
      )}
    </div>
  );
};
