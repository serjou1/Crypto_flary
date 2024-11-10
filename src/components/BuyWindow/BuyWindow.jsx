/* global BigInt */
import React, { useEffect, useState } from 'react';
import style from './BuyWindow.module.scss';
import { Progress } from './Progress/Progress';

import Arrow from '../../assets/arrow_down.svg';
import BNB from '../../assets/bnb logo.webp';
import ETH from '../../assets/ETH.svg';
import FLFI from '../../assets/flary_coin.png';
import SOL from '../../assets/solana.svg';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { ethers, formatUnits } from 'ethers';
import { useSwitchChain } from 'wagmi';
import { } from 'wagmi/connectors';
import { config } from '../../config';
import {
  NETWORK_BSC,
  NETWORK_ETHEREUM,
  NETWORK_SOLANA,
  TOKEN_BNB,
  TOKEN_CAP_STAGE_1,
  TOKEN_CAP_STAGE_2,
  TOKEN_CAP_STAGE_3,
  TOKEN_CAP_STAGE_4,
  TOKEN_CAP_STAGE_5,
  TOKEN_CAP_STAGE_6,
  TOKEN_ETHEREUM,
  TOKEN_SOL,
  TOKEN_USDC,
  TOKEN_USDT,
  USDT_STAGE_1,
  USDT_STAGE_2,
  USDT_STAGE_3,
  USDT_STAGE_4,
  USDT_STAGE_5,
  USDT_STAGE_6,
} from './constants';
import { Error } from './Error';
import { ErrorTransaction } from './ErrorTransaction/ErrorTransaction';
import { Loader } from './Loader/Loader';
import { PopupNetwork } from './PopapNetwork/PopupNetwork';
import { Successful } from './Successful/Successful';
import { getSolanaPrice } from './solana/get-solana-price';
import { useBuy } from './BuyContext';
import { getContract } from './evm/get-contract';
import { getEvmNativeCurrencyPrice } from './evm/get-evm-native-coin-price';
import { getSolanaBoughtTokensFromContract } from './solana/get-solana-bought-tokens';
import { YouPayComponent } from './YouPayComponent';
// import { ConnectSolanaButton } from '../Navbar/ConnectSolanaButton';
import { BuyButton } from './BuyButton';

const {
  RPC_ETH,
  RPC_BSC,
} = config;

export const BuyWindow = () => {
  const [stage, setStage] = useState('');
  const [capPerStage, setCapPerStage] = useState(0);
  const [usdtPerStage, setUsdtPerStage] = useState(0);
  const [collected, setCollected] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tokenSold, setTokenSold] = useState(0);
  const [networkImg, setNetworkImg] = useState(ETH);
  const [loading, setLoading] = useState(false);
  const [tokenHoldings, setTokenHoldings] = useState('0');
  const [tokenPriceActually, setTokenPriceActually] = useState(0);

  const [openPopupNetwork, setOpenPopupNetwork] = useState(false);

  const { publicKey, connected: isSolanaConnected } = useWallet();

  const {
    address,
    status,
    chainId,
    token,
    setToken,
    dropNetwork,
    setTokenImage,
    setDropNetwork,
    setDropToken,
    setNetwork,
    setTokensFromAmount,
    setTokensToAmount,
    networkPrices,
    setNetworkPrices,
    setTokenPrice,
    network,
    tokenPrice,
    tokensToAmount,
    successful,
    error,
    setError,
    errorTransaction,
    setSuccessful,
    setErrorTransaction,
    setBalanceValue,
    setBalanceValueFiat,
    solBalance,
    solBalanceFiat
  } = useBuy();

  const { connection } = useConnection();

  const { switchChain } = useSwitchChain();

  useEffect(() => {
    const checkNetwork = async () => {
      if (status === 'connected') {
        if (chainId === 1) {
          handlerChangeNetwork(NETWORK_ETHEREUM, ETH, false);
          setOpenPopupNetwork(false);
        } else if (chainId === 56) {
          handlerChangeNetwork(NETWORK_BSC, BNB, false);
          setOpenPopupNetwork(false);
        } else {
          setOpenPopupNetwork(true);
        }
      }
    };

    checkNetwork();
  }, [chainId, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://back.flary.finance/api/tokens/totalTokens');
        if (!response.ok)
          throw 'Response was not successful';
        const result = await response.json();
        setTokenSold(result);
      } catch (e) {
        // setError(true);
        console.log('Error fetching token');
      } finally {
        setLoading(false);
      }
    };
    const getStage = async () => {
      if (tokenSold < TOKEN_CAP_STAGE_1) {
        setStage('Stage 1');
        setTokenPriceActually(0.07);
        setCapPerStage(TOKEN_CAP_STAGE_1);
        setUsdtPerStage(USDT_STAGE_1);
        setCollected(tokenSold * tokenPriceActually);
        setProgress((collected / usdtPerStage) * 100);
      } else if (tokenSold >= TOKEN_CAP_STAGE_1 && tokenSold < 6410714) {
        setStage('Stage 2');
        setTokenPriceActually(0.08);
        setCapPerStage(TOKEN_CAP_STAGE_2);
        setUsdtPerStage(USDT_STAGE_2 + USDT_STAGE_1);
        setCollected((tokenSold - TOKEN_CAP_STAGE_1) * tokenPriceActually + USDT_STAGE_1);
        setProgress((collected / usdtPerStage) * 100);
      } else if (tokenSold >= 11950000 && tokenSold < 16137500) {
        setStage('Stage 3');
        setTokenPriceActually(0.09);
        setCapPerStage(TOKEN_CAP_STAGE_3);
        setUsdtPerStage(USDT_STAGE_2 + USDT_STAGE_1 + USDT_STAGE_3);
        setCollected(
          (tokenSold - TOKEN_CAP_STAGE_1 - TOKEN_CAP_STAGE_2) * tokenPriceActually +
          USDT_STAGE_2 +
          USDT_STAGE_1,
        );
        setProgress((collected / usdtPerStage) * 100);
      } else if (tokenSold >= 16137500 && tokenSold < 20087500) {
        setStage('Stage 4');
        setTokenPriceActually(0.1);
        setCapPerStage(TOKEN_CAP_STAGE_4);
        setUsdtPerStage(USDT_STAGE_2 + USDT_STAGE_1 + USDT_STAGE_3 + USDT_STAGE_4);
        setCollected(
          (tokenSold - TOKEN_CAP_STAGE_1 - TOKEN_CAP_STAGE_2 - TOKEN_CAP_STAGE_3) *
          tokenPriceActually +
          USDT_STAGE_2 +
          USDT_STAGE_1 +
          USDT_STAGE_3,
        );
        setProgress((collected / usdtPerStage) * 100);
      } else if (tokenSold >= 20087500 && tokenSold < 23750000) {
        setStage('Stage 5');
        setTokenPriceActually(0.12);
        setCapPerStage(TOKEN_CAP_STAGE_5);
        setUsdtPerStage(USDT_STAGE_2 + USDT_STAGE_1 + USDT_STAGE_3 + USDT_STAGE_4 + USDT_STAGE_5);
        setCollected(
          (tokenSold -
            TOKEN_CAP_STAGE_1 -
            TOKEN_CAP_STAGE_2 -
            TOKEN_CAP_STAGE_3 -
            TOKEN_CAP_STAGE_4) *
          tokenPriceActually +
          USDT_STAGE_2 +
          USDT_STAGE_1 +
          USDT_STAGE_3 +
          USDT_STAGE_4,
        );
        setProgress((collected / usdtPerStage) * 100);
      } else {
        setStage('Stage 6');
        setTokenPriceActually(0.14);
        setCapPerStage(TOKEN_CAP_STAGE_6);
        setUsdtPerStage(
          USDT_STAGE_2 + USDT_STAGE_1 + USDT_STAGE_3 + USDT_STAGE_4 + USDT_STAGE_5 + USDT_STAGE_6,
        );
        setCollected(
          (tokenSold -
            TOKEN_CAP_STAGE_1 -
            TOKEN_CAP_STAGE_2 -
            TOKEN_CAP_STAGE_3 -
            TOKEN_CAP_STAGE_4 -
            TOKEN_CAP_STAGE_5) *
          tokenPriceActually +
          USDT_STAGE_2 +
          USDT_STAGE_1 +
          USDT_STAGE_3 +
          USDT_STAGE_4 +
          USDT_STAGE_5,
        );
        setProgress((collected / usdtPerStage) * 100);
      }
    };
    // const getStage = async () => {
    //   let accumulatedUsdt = 0;
    //   let accumulatedToken = 0

    //   for (let i = 0; i < stages.length; i++) {
    //     const { tokens, price, usdt } = stages[i];

    //     if (tokenSold < accumulatedToken + token) {
    //       const stageName = `Stage ${i + 1}`;
    //       const tokensSoldInStage = tokenSold - accumulatedToken;

    //       setStage(stageName);
    //       setTokenPriceActually(price);
    //       setCapPerStage(tokens);
    //       setUsdtPerStage(accumulatedUsdt + usdt);
    //       setCollected(tokensSoldInStage * price + accumulatedUsdt);

    //       const progressBase = collected - accumulatedUsdt;
    //       const progressMax = usdtPerStage - accumulatedUsdt;
    //       setProgress((progressBase / progressMax) * 100);

    //       break;
    //     }
    //     accumulatedUsdt += usdt;
    //     accumulatedToken += tokens
    //   }
    // };

    fetchData();
    getStage();
  }, [capPerStage, collected, tokenPriceActually, tokenSold, token]);

  useEffect(() => {
    if (successful || errorTransaction) {
      const timer = setTimeout(() => {
        setSuccessful(false);
        setErrorTransaction(false);
      }, 3000); // 3000 миллисекунд = 3 секунды

      // Очистка таймера при размонтировании компонента
      return () => clearTimeout(timer);
    }

    initBaseCurrenciesPrices();
    updateTokenPrice();

    if (status === 'connected') {
      updateTokenHoldings();
    }
  }, [status, errorTransaction, successful]);

  const handlerClickNetwork = () => {
    console.log('click network');

    setDropNetwork(!dropNetwork);
    setDropToken(false);
  };

  const handlerChangeNetwork = (arg, argImg, controlDrop = true) => {
    if (arg === NETWORK_ETHEREUM) {
      setToken(TOKEN_ETHEREUM);
      setTokenImage(ETH);

      switchChain({ chainId: 1 });
    } else if (arg === NETWORK_BSC) {
      setToken(TOKEN_BNB);
      setTokenImage(BNB);

      switchChain({ chainId: 56 });
    } else {
      setToken(TOKEN_SOL);
      setTokenImage(SOL);

      console.log('solana', "settomf", solBalance, solBalanceFiat);

      setBalanceValue(solBalance);
      setBalanceValueFiat(solBalanceFiat);
    }

    if (controlDrop) {
      setDropNetwork(!dropNetwork);
    }

    setNetwork(arg);
    setNetworkImg(argImg);
    setTokensFromAmount('');
    setTokensToAmount('');
  };

  const initializeSolanaPrice = async () => {
    const price = await getSolanaPrice();

    networkPrices[NETWORK_SOLANA] = price;
    setNetworkPrices(networkPrices);
  };

  const initializeNativeCurrencyPrice = async (network) => {
    const price = await getEvmNativeCurrencyPrice(network);

    networkPrices[network] = price;
    setNetworkPrices(networkPrices);

    console.log(`${network} price is ${networkPrices[network]}`);
  };

  const getBoughtTokens = async (network, address) => {
    const providerRpc = network === NETWORK_ETHEREUM ? RPC_ETH : RPC_BSC;

    const provider = new ethers.JsonRpcProvider(providerRpc);
    const contract = getContract(network, provider);

    const balance = await contract.investemetByAddress(address);

    return Number(ethers.formatEther(balance));
  };

  const getSolanaBoughtTokens = async () => {
    return publicKey
      ? getSolanaBoughtTokensFromContract(publicKey, connection)
      : 0;
  };

  const initBaseCurrenciesPrices = async () => {
    await initializeNativeCurrencyPrice(NETWORK_ETHEREUM);
    await initializeNativeCurrencyPrice(NETWORK_BSC);
    await initializeSolanaPrice();
  };

  const updateTokenPrice = async () => {
    const providerEth = new ethers.JsonRpcProvider(RPC_ETH);
    const contract = getContract(NETWORK_ETHEREUM, providerEth);
    const tp = Number(formatUnits(await contract.tokensPriceInUsdt(), 6));
    setTokenPrice(tp);
  };

  const updateTokenHoldings = async () => {
    let sum = 0;
    if (status === 'connected') {
      const boughtTokensEth = await getBoughtTokens(NETWORK_ETHEREUM, address);
      const boughtTokensBsc = await getBoughtTokens(NETWORK_BSC, address);
      sum = boughtTokensEth + boughtTokensBsc;
    }

    if (isSolanaConnected) {
      const boughtTokensSol = await getSolanaBoughtTokens();
      sum += boughtTokensSol;
    }

    setTokenHoldings(sum.toFixed(2));
  };

  const isBaseCoinSelected = () => {
    if (network === NETWORK_ETHEREUM) {
      return token !== TOKEN_USDT;
    } else if (network === NETWORK_BSC) {
      return token !== TOKEN_USDT;
    } else if (network === NETWORK_SOLANA) {
      return token !== TOKEN_USDC;
    }
    return false;
  };

  const getBaseCoinPrice = () => {
    return networkPrices[network];
  };

  const updateReceivedValue = (amountToPay) => {
    console.log("Update received price");

    setTokensToAmount(amountToPay);

    const _isBaseCoinSelected = isBaseCoinSelected();

    const tokensFromAmountNew =
      (amountToPay * tokenPrice) / (_isBaseCoinSelected ? getBaseCoinPrice() : 1);

    setTokensFromAmount(tokensFromAmountNew);

    console.log("Is base coin selected", _isBaseCoinSelected);
    console.log("Amount to pay", amountToPay);
    console.log("Tokens from amount", tokensFromAmountNew);
  }

  return (
    <div className={style.BuyWindow}>
      <ErrorTransaction
        setErrorTransaction={setErrorTransaction}
        errorTransaction={errorTransaction}
      />
      {openPopupNetwork && (
        <PopupNetwork
          imgEth={ETH}
          imgBNB={BNB}
          handlerChangeNetwork={handlerChangeNetwork}
          NETWORK_ETHEREUM={NETWORK_ETHEREUM}
          NETWORK_BSC={NETWORK_BSC}
        />
      )}
      <div className={style.bg}>
        <h1>{stage}</h1>
      </div>
      <p>1 $FLFI = ${tokenPriceActually} </p>
      <p>
        Price next stage = $
        {tokenSold < 16137500
          ? (tokenPriceActually + 0.01).toFixed(2)
          : (tokenPriceActually + 0.02).toFixed(2)}
      </p>

      <p style={{ marginTop: '15px', fontSize: '20px' }}>
        <span style={{ fontSize: '20px' }}>Your holdings:</span> {tokenHoldings}
      </p>
      <p></p>

      <Progress progress={progress.toFixed(2)} />
      <p>
        Raised USD : $
        {collected
          .toFixed()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
        / ${usdtPerStage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </p>

      <div className={style.button_group}>
        <div
          className={style.button}
          onClick={() => handlerClickNetwork()}
          style={
            dropNetwork
              ? {
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '0',
                padding: '10px 15px',
                width: '100%',
              }
              : { padding: '10px 15px', width: '100%' }
          }>
          <div className={style.button_tittle}>
            <img src={networkImg} alt="" />
            <p>{network}</p>
          </div>
          <img src={Arrow} alt="" />
          {dropNetwork && (
            <div className={style.drop_network}>
              <NetworkDropDownElement
                img={ETH}
                network={NETWORK_ETHEREUM}
                handlerChangeNetwork={handlerChangeNetwork}
                name="Ethereum"
              />
              <NetworkDropDownElement
                img={BNB}
                network={NETWORK_BSC}
                handlerChangeNetwork={handlerChangeNetwork}
                name="BNB Chain"
              />
              <NetworkDropDownElement
                img={SOL}
                network={NETWORK_SOLANA}
                handlerChangeNetwork={handlerChangeNetwork}
                name="Solana"
              />
            </div>
          )}
        </div>

        <div className={style.down_button}>
          <YouPayComponent />
          <div className={style.block_input}>
            <p className={style.labelLine}>You receive: </p>
            <div className={style.button}>
              <div className={style.button_tittle}>
                <img src={FLFI} alt="" />
                <p>$FLFI</p>
              </div>
            </div>
            <input
              className={style.input_buy}
              type="number"
              step="any"
              placeholder="0.0"
              value={tokensToAmount}
              onChange={(e) => {
                updateReceivedValue(Number(e.target.value))
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <Error
          setError={setError}
          setTokensFromAmount={setTokensFromAmount}
          setTokensToAmount={setTokensToAmount}
        />
      )}

      {loading ? (
        <Loader />
      ) : successful ? (
        <Successful />
      ) : (
        <BuyButton updateTokenHoldings={updateTokenHoldings} />
      )}
    </div>
  );
};

const NetworkDropDownElement = ({ img, network, handlerChangeNetwork, name }) => {
  return (
    <div
      style={{ justifyContent: 'start' }}
      className={style.button_drop}
      onClick={() => handlerChangeNetwork(network, img)}>
      <img src={img} alt="" />
      <p>{name}</p>
    </div>
  );
}