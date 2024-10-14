/* global BigInt */
import React, { useEffect, useState } from 'react';
import style from './BuyWindow.module.scss';
import { Progress } from './Progress/Progress';


import Arrow from '../../assets/arrow_down.svg';
import BNB from '../../assets/bnb logo.webp';
import ETH from '../../assets/ETH.svg';
import FLFI from '../../assets/flary_coin.png';
import USDT from '../../assets/USDT.svg';

import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider } from '@ethersproject/providers'; // Импорт провайдера
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Contract, ethers, formatEther, formatUnits, parseEther } from 'ethers';

import { useAccount, useBalance, useSwitchChain, useSimulateContract } from 'wagmi';
import { config } from '../../config';
import { ERC_20_ABI } from './erc-20-abi';
import { Error } from './Error';
import { FLARY_PRESALE_ABI } from './flary-contract-abi';
import { Loader } from './Loader/Loader';
import { PopupNetwork } from './PopapNetwork/PopupNetwork';
import { PRICE_FEED_ABI } from './price-feed-abi';
import { Successful } from './Successful/Successful';
import { useIsMounted } from './useIsMounted';
// import { console } from 'inspector';
import { BuyButton } from './BuyButton';
import { NETWORK_BSC, NETWORK_ETHEREUM, TOKEN_BNB, TOKEN_ETHEREUM, TOKEN_USDT } from './constants';

const {
  ETH_CONTRACT_ADDRESS,
  BSC_CONTRACT_ADDRESS,
  ETH_USDT_ADDRESS,
  BSC_USDT_ADDRESS,
  RPC_ETH,
  RPC_BSC,
} = config;



export const BuyWindow = () => {
  const [stage, setStage] = useState('');
  const [capPerStage, setCapPerStage] = useState(0);
  const [collected, setCollected] = useState(0);
  const [sellTokens, setSellTokens] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dropNetwork, setDropNetwork] = useState(false);
  const [dropToken, setDropToken] = useState(false);
  const [network, setNetwork] = useState(NETWORK_ETHEREUM);
  const [tokenSold, setTokenSold] = useState(0);
  const [networkImg, setNetworkImg] = useState(ETH);
  const [tokenImgETH, setTokenImgETH] = useState(ETH);
  const [tokenImgBNB, setTokenImgBNB] = useState(BNB);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [tokensFromAmount, setTokensFromAmount] = useState('');
  const [tokensToAmount, setTokensToAmount] = useState('');
  const [tokenHoldings, setTokenHoldings] = useState('0');
  const [networkPrices, setNetworkPrices] = useState({});
  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenPriceActually, setTokenPriceActually] = useState(0);
  const [error, setError] = useState(false);
  const [balanceValue, setBalanceValue] = useState(0);
  const [balanceValueFiat, setBalanceValueFiat] = useState(0);
  const [tokenETH, setTokenETH] = useState(TOKEN_ETHEREUM);
  const [tokenBNB, setTokenBNB] = useState(TOKEN_BNB);
  const [chainID, setChainID] = useState(null);
  const [openPopupNetwork, setOpenPopupNetwork] = useState(false);

  

  const account = useAccount();
  const { switchChain } = useSwitchChain();

  const mounted = useIsMounted();
  const { data: bnbUsdt } = useBalance({
    address: account.address,
    token: '0x55d398326f99059fF775485246999027B3197955',
  });
  const bnbUsdtValue = Number(bnbUsdt?.formatted);//.toFixed(3);
  const { data: ethUsdt } = useBalance({
    address: account.address,
    token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  });
  const ethUsdtValue = Number(ethUsdt?.formatted);//.toFixed(3);
  const { data: ethEth } = useBalance({
    address: account.address,
  });

 

  const ethEthValue = Math.floor(ethEth?.formatted * 1000) / 1000;

  const { data: bnbBNB } = useBalance({
    address: account.address,
  });


  const bnbBNBValue = Math.floor(bnbBNB?.formatted * 1000) / 1000;


  useEffect(() => {
    const calculateBalanceInFiat = (coinValue) => {
      const price = getBaseCoinPrice();
      if (!price) return null;
      return (coinValue * price).toFixed(1);
    };
    if (ethEth?.formatted) {


      const ethValue = Math.floor(ethEth.formatted * 1000) / 1000;

      if (!isNaN(ethValue)) {
        const ethValueFixed = Number(ethEth.formatted).toFixed(3);
        setBalanceValue(ethValueFixed);
        setBalanceValueFiat(calculateBalanceInFiat(ethValueFixed));
      }
    } else if (bnbBNB?.formatted) {
      const bnbValue = Math.floor(bnbBNB.formatted * 1000) / 1000;
      setBalanceValue(bnbValue);
      setBalanceValueFiat(calculateBalanceInFiat(bnbValue));
    }
  }, [ethEth, bnbBNB, network]);

  useEffect(() => {
    const checkNetwork = async () => {
      if (account.status === 'connected') {
        const chainId = account.chainId;
        console.log(chainId);
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
  }, [account.chainId, account.status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://back.flary.finance/api/tokens/totalTokens');
        if (!response.ok) throw new Error('Response was not successful');
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
      if (tokenSold < 6700000) {
        setStage('Stage 1');
        setTokenPriceActually(0.07);
        setCapPerStage(469000);
        setCollected(tokenSold * tokenPriceActually);
      } else if (tokenSold >= 6700000 && tokenSold < 11950000) {
        setStage('Stage 2');
        setTokenPriceActually(0.08);
        setCapPerStage(420000);
        setCollected((tokenSold - 6700000) * tokenPriceActually);
      } else if (tokenSold >= 11950000 && tokenSold < 16137500) {
        setStage('Stage 3');
        setTokenPriceActually(0.09);
        setCapPerStage(376875);
        setCollected((tokenSold - 11950000) * tokenPriceActually);
      } else if (tokenSold >= 16137500 && tokenSold < 20087500) {
        setStage('Stage 4');
        setTokenPriceActually(0.1);
        setCapPerStage(395000);
        setCollected((tokenSold - 16137500) * tokenPriceActually);
      } else if (tokenSold >= 20087500 && tokenSold < 23750000) {
        setStage('Stage 5');
        setTokenPriceActually(0.12);
        setCapPerStage(439500);
        setCollected((tokenSold - 20087500) * tokenPriceActually);
      } else {
        setStage('Stage 6');
        setTokenPriceActually(0.14);
        setCapPerStage(875000);
        setCollected((tokenSold - 23750000) * tokenPriceActually);
      }
    };

    fetchData();
    getStage();
    setProgress((collected / capPerStage) * 100);
  }, [capPerStage, collected, tokenPriceActually, tokenSold]);

  useEffect(() => {
    console.log(balanceValue, balanceValueFiat);
    if (successful) {
      const timer = setTimeout(() => {
        setSuccessful(false);
      }, 3000); // 3000 миллисекунд = 3 секунды

      // Очистка таймера при размонтировании компонента
      return () => clearTimeout(timer);
    }


    

    if (account.status === 'connected') {
      updateTokenHoldings();

    }
  }, [account.status, successful]);

  const maxValue = async () => {
    if (network === NETWORK_ETHEREUM && tokenETH === TOKEN_ETHEREUM) {
      setTokensFromAmount(
        balanceValue > 0 ? await calculateBalanceAfterGas(providerEthereum, balanceValue) : 0,
      );
      const tokensToAmountNew =
        ((await calculateBalanceAfterGas(providerEthereum, balanceValue)) *
          (isBaseCoinSelected() ? getBaseCoinPrice() : 1)) /
        tokenPrice;
      setTokensToAmount(tokensToAmountNew > 0 ? tokensToAmountNew : 0);
    } else if (network === NETWORK_BSC && tokenBNB === TOKEN_BNB) {
      setTokensFromAmount(
        balanceValue > 0 ? await calculateBalanceAfterGas(providerBSC, balanceValue) : 0,
      );
      const tokensToAmountNew =
        ((await calculateBalanceAfterGas(providerBSC, balanceValue)) *
          (isBaseCoinSelected() ? getBaseCoinPrice() : 1)) /
        tokenPrice;
      setTokensToAmount(tokensToAmountNew > 0 ? tokensToAmountNew : 0);
    } else {
      setTokensFromAmount(balanceValue);
      const tokensToAmountNew =
        (balanceValue * (isBaseCoinSelected() ? getBaseCoinPrice() : 1)) / tokenPrice;
      setTokensToAmount(tokensToAmountNew);
    }
  };

  const handlerClickNetwork = () => {
    setDropNetwork(!dropNetwork);
    setDropToken(false);
  };
  const handlerClickToken = () => {
    setDropToken(!dropToken);
    setDropNetwork(false);
  };
  const handlerChangeNetwork = async (arg, argImg, controlDrop = true) => {
    if (arg === NETWORK_ETHEREUM) {
      setTokenETH(TOKEN_ETHEREUM);
      setTokenImgETH(ETH);


      if (window.ethereum) {
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: 1 }],
        });
      } else {
        switchChain({ chainId: 1 });
      }
    } else {
      setTokenBNB(TOKEN_BNB);
      setTokenImgBNB(BNB);
      if (window.ethereum) {
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: 56 }],
        });
      } else {
        switchChain({ chainId: 56 });
      }

    }

    if (controlDrop) {
      setDropNetwork(!dropNetwork);
    }

    setNetwork(arg);
    setNetworkImg(argImg);
    setTokensFromAmount('');
    setTokensToAmount('');
  };
  const handlerChangeTokenETH = (arg, argImg, balance, balanceFiat) => {
    console.log(balanceValue, balanceValueFiat, balance);
    setDropNetwork(!dropToken);
    setTokenETH(arg);
    setTokenImgETH(argImg);
    setTokensFromAmount('');
    setTokensToAmount('');
    setBalanceValue(balance);
    setBalanceValueFiat(balanceFiat);
    console.log(balanceValue, balanceValueFiat, balance, balanceFiat);
  };
  const handlerChangeTokenBNB = (arg, argImg, balance, balanceFiat) => {
    setDropNetwork(!dropToken);
    setTokenBNB(arg);
    setTokenImgBNB(argImg);
    setTokensFromAmount('');
    setTokensToAmount('');
    setBalanceValue(balance);
    setBalanceValueFiat(balanceFiat);
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

    const priceFeedAddress = await contract.nativeUsdPriceFeed();

    const priceFeed = new Contract(priceFeedAddress, PRICE_FEED_ABI, provider);

    const priceLatest = await priceFeed.latestAnswer();
    const decimals = await priceFeed.decimals();

    networkPrices[network] = Number(formatUnits(priceLatest, decimals));

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

  const updateTokenHoldings = async () => {
    await initializeNativeCurrencyPrice(NETWORK_ETHEREUM);
    await initializeNativeCurrencyPrice(NETWORK_BSC);

    const providerEth = new ethers.JsonRpcProvider(RPC_ETH);
    const contract = getContract(NETWORK_ETHEREUM, providerEth);
    const tp = Number(formatUnits(await contract.tokensPriceInUsdt(), 6));
    setTokenPrice(tp);

    const provider = window.ethereum
      ? new ethers.BrowserProvider(window.ethereum)
      : ethers.getDefaultProvider();
    const signer = await provider.getSigner();

    const boughtTokensEth = await getBoughtTokens(NETWORK_ETHEREUM, signer.address);
    const boughtTokensBsc = await getBoughtTokens(NETWORK_BSC, signer.address);
    console.log('Wyzow updateTokenHoldings');
    setTokenHoldings(
      `${(boughtTokensEth + boughtTokensBsc).toFixed(2)}`,
      // (${boughtTokensEth.toFixed(
      //   2,
      // )} on ETH + ${boughtTokensBsc.toFixed(2)} on BSC)`,
    );
  };



  const isBaseCoinSelected = () => {
    if (network === NETWORK_ETHEREUM) {
      return tokenETH !== TOKEN_USDT;
    } else if (network === NETWORK_BSC) {
      return tokenBNB !== TOKEN_USDT;
    }
    return false;
  };

  const getBaseCoinPrice = () => {
    // console.log('network', network);
    // console.log(networkPrices.Ethereum);

    return networkPrices[network];
  };

  const bnbBNBValueFiat = (bnbBNBValue * getBaseCoinPrice()).toFixed(1);
  const bnbUsdtValueFiat = Number(bnbUsdtValue).toFixed(1);
  const ethEthValueFiat = (ethEthValue * getBaseCoinPrice()).toFixed(1);
  const ethUsdtValueFiat = Number(ethUsdtValue).toFixed(1);

  // Провайдеры для Ethereum и BSC
  const providerEthereum = new JsonRpcProvider(
    'https://mainnet.infura.io/v3/2f33107b586b463cbaea43b40c5cae3f',
  );
  const providerBSC = new JsonRpcProvider('https://bsc-dataseed.binance.org/');

  // Функция для получения текущей цены газа
  const getCurrentGasPrice = async (provider) => {
    const gasPrice = await provider.send('eth_gasPrice', []);
    return BigNumber.from(gasPrice);
  };

  // Функция для расчета баланса с учетом комиссии
  const calculateBalanceAfterGas = async (provider, balance, gasLimit = 210000) => {
    const gasPriceInWei = await getCurrentGasPrice(provider);
    const totalGasCost = BigInt(gasPriceInWei.toNumber() * gasLimit);
    const balanceInWei = BigInt(parseEther(balance.toString()));
    const balanceAfterGas = balanceInWei - totalGasCost;

    return (Number(formatEther(balanceAfterGas.toString())) - 0.001).toFixed(4); // Возвращаем результат в ETH или BNB
  };

  return (
    <div className={style.BuyWindow}>
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
        {tokenSold < 20087500
          ? (tokenPriceActually + 0.01).toFixed(2)
          : (tokenPriceActually + 0.02).toFixed(2)}
      </p>

      <p style={{ marginTop: '15px', fontSize: '20px' }}>
        <span style={{ fontSize: '20px' }}>Your holdings:</span> {tokenHoldings}
      </p>
      <p></p>

      <Progress progress={progress.toFixed(2)} />
      <p>
        Rised USD : $
        {collected
          .toFixed()
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
        / ${capPerStage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </p>

      <div className={style.button_group}>
        <div
          className={style.button}
          onClick={handlerClickNetwork}
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
              <div
                style={{ justifyContent: 'start' }}
                className={style.button_drop}
                onClick={async () => await handlerChangeNetwork(NETWORK_ETHEREUM, ETH)}>
                <img src={ETH} alt="" />
                <p>Ethereum</p>
              </div>
              <div
                style={{ justifyContent: 'start' }}
                className={style.button_drop}
                onClick={() => handlerChangeNetwork(NETWORK_BSC, BNB)}>
                <img src={BNB} alt="" />
                <p>BNB Chain</p>
              </div>
            </div>
          )}
        </div>
        <div className={style.down_button}>
          <div className={style.block_input}>
            <p className={style.labelLine}>You pay: </p>
            <div
              className={style.button}

              onClick={account.status === 'disconnected' ? null : handlerClickToken}

              style={
                dropToken ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : {}
              }>
              {network === NETWORK_BSC ? (
                <div className={style.button_tittle}>
                  <img src={tokenImgBNB} alt="" />
                  <p>{tokenBNB}</p>

                  {account.status === 'disconnected' ? '' : <img src={Arrow} alt="" />}
                </div>
              ) : (
                <div className={style.button_tittle}>
                  {' '}
                  <img src={tokenImgETH} alt="" />
                  <p>{tokenETH}</p>{' '}
                  {account.status === 'disconnected' ? '' : <img src={Arrow} alt="" />}
                </div>
              )}
              {account.status === 'disconnected' ? (
                ''
              ) : (
                <div>
                  <p className={style.balanceValue} style={{ textAlign: 'end' }}>
                    {balanceValue > 0.001 ? balanceValue : 0}
                  </p>
                  <p
                    className={style.balanceValue}
                    style={{ color: 'gray', fontWeight: '300', textAlign: 'end' }}>
                    ${balanceValueFiat}
                  </p>
                </div>
              )}

              {network === NETWORK_BSC
                ? dropToken && (
                  <div className={style.drop_token}>
                    <div
                      className={style.button_drop}
                      onClick={() =>
                        handlerChangeTokenBNB(TOKEN_BNB, BNB, bnbBNBValue.toFixed(3), bnbBNBValueFiat)
                      }>
                      <div className={style.button_drop_left}>
                        <img src={BNB} alt="" />
                        <p>BNB</p>
                      </div>
                      <div className={style.button_drop_right}>
                        <p className={style.balanceValue}>{bnbBNBValue > 0 ? bnbBNBValue.toFixed(3) : 0}</p>
                        <p
                          className={style.balanceValue}
                          style={{ color: 'gray', fontWeight: '300' }}>
                          ${bnbBNBValueFiat}
                        </p>
                      </div>
                    </div>
                    <div
                      className={style.button_drop}
                      onClick={() =>
                        handlerChangeTokenBNB(TOKEN_USDT, USDT, bnbUsdtValue.toFixed(3), bnbUsdtValueFiat)
                      }>
                      <div className={style.button_drop_left}>
                        <img src={USDT} alt="" />
                        <p>USDT</p>
                      </div>
                      <div className={style.button_drop_right}>
                        <p className={style.balanceValue}>
                          {bnbUsdtValue > 0.001 ? bnbUsdtValue.toFixed(3) : 0}
                        </p>
                        <p
                          className={style.balanceValue}
                          style={{ color: 'gray', fontWeight: '300' }}>
                          ${bnbUsdtValueFiat}
                        </p>
                      </div>
                    </div>
                  </div>
                )
                : null}

              {network === NETWORK_ETHEREUM
                ? dropToken && (
                  <div className={style.drop_token}>
                    <div
                      className={style.button_drop}
                      onClick={() =>
                        handlerChangeTokenETH(TOKEN_ETHEREUM, ETH, ethEthValue.toFixed(3), ethEthValueFiat)
                      }>
                      <div className={style.button_drop_left}>
                        <img src={ETH} alt="" />
                        <p>ETH</p>
                      </div>
                      <div className={style.button_drop_right}>
                        <p className={style.balanceValue}>
                          {ethEthValue > 0.001 ? ethEthValue.toFixed(3) : 0}
                        </p>
                        <p
                          className={style.balanceValue}
                          style={{ color: 'gray', fontWeight: '300' }}>
                          ${ethEthValueFiat}
                        </p>
                      </div>
                    </div>
                    <div
                      className={style.button_drop}
                      onClick={() =>
                        handlerChangeTokenETH(TOKEN_USDT, USDT, ethUsdtValue.toFixed(3), ethUsdtValueFiat)
                      }>
                      <div className={style.button_drop_left}>
                        <img src={USDT} alt="" />
                        <p>USDT</p>
                      </div>
                      <div className={style.button_drop_right}>
                        <p className={style.balanceValue}>
                          {ethUsdtValue > 0.001 ? ethUsdtValue.toFixed(3) : 0}
                        </p>
                        <p
                          className={style.balanceValue}
                          style={{ color: 'gray', fontWeight: '300' }}>
                          ${ethUsdtValueFiat}
                        </p>
                      </div>
                    </div>
                  </div>
                )
                : null}
            </div>
            <div className={style.max_input}>
              <input
                className={style.input_buy}
                type="number"
                step="any"
                placeholder="Enter Amount"
                value={tokensFromAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  setTokensFromAmount(value);

                  const tokensToAmountNew =
                    (value * (isBaseCoinSelected() ? getBaseCoinPrice() : 1)) / tokenPrice;
                  console.log('isBaseCoinSelected', isBaseCoinSelected());
                  console.log('getBaseCoinPrice', getBaseCoinPrice());
                  console.log('new tokens to amount:', tokensToAmountNew);

                  setTokensToAmount(tokensToAmountNew);
                  // console.log(getBaseCoinPrice() * 2);
                  // console.log('actual tokens to amount:', tokensToAmount);
                }}
              />
              {mounted

                ? account.status === 'connected' && (
                    <p className={style.max} onClick={maxValue}>
                      MAX
                    </p>
                  )

                : null}
            </div>
          </div>
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
                const value = Number(e.target.value);

                // if (value === '') {
                //   setTokensToAmount();
                // }
                setTokensToAmount(value);
                const tokensFromAmountNew =
                  (value * tokenPrice) / (isBaseCoinSelected() ? getBaseCoinPrice() : 1);
                setTokensFromAmount(tokensFromAmountNew);
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

        !isDisconnected && (
          <BuyButton
            error={error}
            tokensToAmount={tokensToAmount}
            network={network}
            tokensFromAmount={tokensFromAmount}
            setError={setError}
            setLoading={setLoading}
            token={token}
            updateTokenHoldings={updateTokenHoldings}
            setProgress={setProgress}
            setSuccessful={setSuccessful}
            Amount_FOR_STAGE={Amount_FOR_STAGE}
          />


        )
      )}

      <div className={style.ConnectButton}>
        {mounted

          ? account.status === 'disconnected' && (
              <ConnectButton
                style={{ marginBottom: '20px', marginTop: '20px' }}
                accountStatus="address"
                showBalance={false}
                label="Connect Wallet"
              />
            )

          : null}
      </div>
    </div>
  );
};
