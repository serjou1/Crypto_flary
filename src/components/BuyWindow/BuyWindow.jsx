import React, { useEffect, useState } from 'react';
import style from './BuyWindow.module.scss';
import { Progress } from './Progress/Progress';

import Arrow from '../../assets/arrow_down.svg';
import BNB from '../../assets/bnb logo.webp';
import ETH from '../../assets/ETH.svg';
import FLFI from '../../assets/flary_coin.png';
import USDT from '../../assets/USDT.svg';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Contract, ethers, formatUnits } from 'ethers';
import { useAccount, useBalance } from 'wagmi';
import { config } from '../../config';
import { ERC_20_ABI } from './erc-20-abi';
import { Error } from './Error';
import { FLARY_PRESALE_ABI } from './flary-contract-abi';
import { Loader } from './Loader/Loader';
import { PRICE_FEED_ABI } from './price-feed-abi';
import { Successful } from './Successful/Successful';
import { useIsMounted } from './useIsMounted';

const {
  ETH_CONTRACT_SEPOLIA_ADDRESS,
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

const TOKEN_ETHEREUM = 'ETH';
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
  const [dropNetwork, setDropNetwork] = useState(false);
  const [dropToken, setDropToken] = useState(false);
  const [network, setNetwork] = useState(NETWORK_ETHEREUM);
  const [token, setToken] = useState(TOKEN_ETHEREUM);
  const [networkImg, setNetworkImg] = useState(ETH);
  const [tokenImg, setTokenImg] = useState(ETH);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [tokensFromAmount, setTokensFromAmount] = useState('');
  const [tokensToAmount, setTokensToAmount] = useState('');
  const [tokenHoldings, setTokenHoldings] = useState('0');
  const [networkPrices, setNetworkPrices] = useState({});
  const [tokenPrice, setTokenPrice] = useState(0);
  const [error, setError] = useState(false);
  const [balanceValue, setBalanceValue] = useState(0);
  const [balanceValueFiat, setBalanceValueFiat] = useState(0);

  const buyLimit = tokensToAmount * 4;

  const { isDisconnected, address } = useAccount();

  const mounted = useIsMounted();
  const { data: bnbUsdt } = useBalance({
    address: address,
    token: '0x55d398326f99059fF775485246999027B3197955',
  });
  const bnbUsdtValue = Number(bnbUsdt?.formatted).toFixed(3);
  const { data: ethUsdt } = useBalance({
    address: address,
    token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  });
  const ethUsdtValue = Number(ethUsdt?.formatted).toFixed(3);
  const { data: ethEth } = useBalance({
    address: address,
  });
  const ethEthValue = Number(ethEth?.formatted).toFixed(3);
  const { data: bnbBNB } = useBalance({
    address: address,
  });
  const bnbBNBValue = Number(bnbBNB?.formatted).toFixed(3);

  useEffect(() => {
    if (successful) {
      const timer = setTimeout(() => {
        setSuccessful(false);
      }, 3000); // 3000 миллисекунд = 3 секунды

      // Очистка таймера при размонтировании компонента
      return () => clearTimeout(timer);
    }
    updateTokenHoldings();
  }, [collected, successful]);

  const maxValue = () => {
    setTokensFromAmount(balanceValue);
    const tokensToAmountNew =
      (balanceValue * (isBaseCoinSelected() ? getBaseCoinPrice() : 1)) / tokenPrice;
    setTokensToAmount(tokensToAmountNew);
  };

  const handlerClickNetwork = () => {
    setDropNetwork(!dropNetwork);
  };
  const handlerClickToken = () => {
    setDropToken(!dropToken);
  };
  const handlerChangeNetwork = async (arg, argImg) => {
    if (arg === NETWORK_ETHEREUM) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }],
      });
    } else {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }],
      });
    }

    setDropNetwork(!dropNetwork);
    setNetwork(arg);
    setNetworkImg(argImg);
  };
  const handlerChangeToken = (arg, argImg, balance, balanceFiat) => {
    setDropNetwork(!dropToken);
    setToken(arg);
    setTokenImg(argImg);
    setTokensFromAmount('');
    setTokensToAmount('');
    setBalanceValue(balance);
    setBalanceValueFiat(balanceFiat);
  };
  // const buyCoinsSepolia = async () => {
  //   if (tokensFromAmount > 0) {
  //     if (network === NETWORK_ETHEREUM && token === TOKEN_ETHEREUM) {
  //       await buyTokensNativeS(NETWORK_ETHEREUM);
  //     } else if (network === NETWORK_BSC && token === TOKEN_BNB) {
  //       await buyTokensNativeS(NETWORK_BSC);
  //     } else if (network === NETWORK_ETHEREUM) {
  //       await buyTokensUsdt(NETWORK_ETHEREUM);
  //     } else {
  //       await buyTokensUsdt(NETWORK_BSC);
  //     }
  //   } else {
  //     alert('Please enter value more than 0');
  //   }

  // }

  //   const getContractS = (network, provider) => {
  //     const contractAddress = ETH_CONTRACT_SEPOLIA_ADDRESS;

  //     const contract = new ethers.Contract(contractAddress, FLARY_PRESALE_ABI, provider);

  //     return contract;
  //   };
  //   const buyTokensNativeS = async (network) => {
  //     const amount = ethers.parseEther(Number(tokensFromAmount).toFixed(18));

  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = await provider.getSigner();

  //     const contract = getContractS(network, signer);

  //     const paused = await contract.paused();
  //     if (paused) {
  //       console.log('Token presale is PAUSED!!!');
  //       // alert("token presale is PAUSED!!!")
  //       return;
  //     }
  //     const tx = await contract.buyTokensNativeS({ value: amount });

  //     // TODO: disable front
  //     setLoading(true);

  //     await tx.wait();
  //     await updateTokenHoldings();
  //     setLoading(false);
  //     setSuccessful(true);

  //     // TODO: enable front
  //   };


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

    console.log(`${network} price is ${networkPrices[network]}`);
  };

  const getBoughtTokens = async (network, address) => {
    const providerRpc = network === NETWORK_ETHEREUM ? RPC_ETH : RPC_BSC;

    const provider = new ethers.JsonRpcProvider(providerRpc);
    const contract = getContract(network, provider);

    const balance = await contract.s_investemetByAddress(address);
    return Number(ethers.formatEther(balance));
  };

  const getTokensSold = async (network) => {
    const providerRpc = network === NETWORK_ETHEREUM ? RPC_ETH : RPC_BSC;

    const provider = new ethers.JsonRpcProvider(providerRpc);
    const contract = getContract(network, provider);

    const tokensSold = await contract.s_tokenSold();

    return Number(ethers.formatEther(tokensSold));
  };

  const updateTokenHoldings = async () => {
    await initializeNativeCurrencyPrice(NETWORK_ETHEREUM);
    await initializeNativeCurrencyPrice(NETWORK_BSC);

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

    const balance = await provider.getBalance(signer.address);
    if (balance <= amount) {
      setError(true);

      return;
    }

    const tx = await contract.buyTokensNative({ value: amount });

    setLoading(true);

    await tx.wait();
    await updateTokenHoldings();
    setLoading(false);
    setSuccessful(true);

    await fetch("https://back.flary.finance/api/user/boughtTokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(tokensToAmount),
        address: signer.address,
        chain: network === NETWORK_ETHEREUM ? "eth" : "bsc",
      }),
    });
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

    const balance = await usdt.balanceOf(signer.address);
    if (balance < amount) {
      setError(true);

      return;
    }

    const allowance = await usdt.allowance(signer.address, await contract.getAddress());

    setLoading(true);

    if (allowance < amount) {
      const approveTx = await usdt.approve(await contract.getAddress(), amount);
      await approveTx.wait();
    }

    const tx = await contract.buyTokensUSDT(amount);
    await tx.wait();
    await updateTokenHoldings();
    setLoading(false);
    setSuccessful(true);
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
  }, [collectedX]);

  const isBaseCoinSelected = () => token !== TOKEN_USDT;
  const getBaseCoinPrice = () => {
    // console.log('network', network);
    // console.log(networkPrices.Ethereum);

    return networkPrices[network];
  };

  const bnbBNBValueFiat = (bnbBNBValue * getBaseCoinPrice()).toFixed(1);
  const bnbUsdtValueFiat = Number(bnbUsdtValue).toFixed(1);
  const ethEthValueFiat = (ethEthValue * getBaseCoinPrice()).toFixed(1);
  const ethUsdtValueFiat = Number(ethUsdtValue).toFixed(1);
  console.log(getBaseCoinPrice());
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

      <div className={style.button_group}>
        <div
          className={style.button}
          onClick={handlerClickNetwork}
          style={
            dropNetwork
              ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0', padding: '10px 15px' }
              : { padding: '10px 15px' }
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
                onClick={() => handlerChangeNetwork(NETWORK_ETHEREUM, ETH)}>
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
            <p className={style.labelLine}>You paid: </p>
            <div
              className={style.button}
              onClick={isDisconnected ? null : handlerClickToken}
              style={
                dropToken ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : {}
              }>
              <div className={style.button_tittle}>
                <img src={tokenImg} alt="" />
                <p>{token}</p>

                {isDisconnected ? '' : <img src={Arrow} alt="" />}
              </div>
              {isDisconnected ? (
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
                        handlerChangeToken(TOKEN_BNB, BNB, bnbBNBValue, bnbBNBValueFiat)
                      }>
                      <div className={style.button_drop_left}>
                        <img src={BNB} alt="" />
                        <p>BNB</p>
                      </div>
                      <div className={style.button_drop_right}>
                        <p className={style.balanceValue}>{bnbBNBValue > 0 ? bnbBNBValue : 0}</p>
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
                        handlerChangeToken(TOKEN_USDT, USDT, bnbUsdtValue, bnbUsdtValueFiat)
                      }>
                      <div className={style.button_drop_left}>
                        <img src={USDT} alt="" />
                        <p>USDT</p>
                      </div>
                      <div className={style.button_drop_right}>
                        <p className={style.balanceValue}>
                          {bnbUsdtValue > 0.001 ? bnbUsdtValue : 0}
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
                        handlerChangeToken(TOKEN_ETHEREUM, ETH, ethEthValue, ethEthValueFiat)
                      }>
                      <div className={style.button_drop_left}>
                        <img src={ETH} alt="" />
                        <p>ETH</p>
                      </div>
                      <div className={style.button_drop_right}>
                        <p className={style.balanceValue}>
                          {ethEthValue > 0.001 ? ethEthValue : 0}
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
                        handlerChangeToken(TOKEN_USDT, USDT, ethUsdtValue, ethUsdtValueFiat)
                      }>
                      <div className={style.button_drop_left}>
                        <img src={USDT} alt="" />
                        <p>USDT</p>
                      </div>
                      <div className={style.button_drop_right}>
                        <p className={style.balanceValue}>
                          {ethUsdtValue > 0.001 ? ethUsdtValue : 0}
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
                  const value = e.target.value;

                  // if (value === '') {
                  //   setTokensFromAmount();
                  // }
                  console.log('value intial:', e.target.value);
                  console.log('value:', value);
                  setTokensFromAmount(value);
                  // console.log('actual amount:', tokensFromAmount);
                  const tokensToAmountNew =
                    (value * (isBaseCoinSelected() ? getBaseCoinPrice() : 1)) / tokenPrice;
                  // console.log('isBaseCoinSelected', isBaseCoinSelected());
                  // console.log('getBaseCoinPrice', getBaseCoinPrice());
                  // console.log('new tokens to amount:', tokensToAmountNew);

                  setTokensToAmount(tokensToAmountNew);
                  // console.log(getBaseCoinPrice() * 2);
                  // console.log('actual tokens to amount:', tokensToAmount);
                }}
              />
              {mounted
                ? !isDisconnected && (
                  <p className={style.max} onClick={maxValue}>
                    MAX
                  </p>
                )
                : null}
            </div>
          </div>
          <div className={style.block_input}>
            <p className={style.labelLine}>FLFI to be received: </p>
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
                const value = e.target.value;

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
          <div
            className={style.pay_button}
            onClick={() => buyCoins()}
            style={
              error || isDisconnected || buyLimit < 50
                ? {
                  opacity: '0.3',
                  pointerEvents: 'none',
                  cursor: 'not-allowed',
                }
                : { opacity: '1' }
            }>
            {buyLimit < 50 ? 'Minimum purchase is $50' : 'Buy FLFI'}
          </div>
        )
      )}
      {/* <div
            className={style.pay_button}
            
            style={
              error 
                ? {
                    opacity: '0.3',
                    pointerEvents: 'none',
                    cursor: 'not-allowed',
                  }
                : { opacity: '1' }
            }>
            Buy Sepolia
          </div> */}
      <div className={style.ConnectButton}>
        {mounted
          ? isDisconnected && (
            <ConnectButton
              style={{ marginBottom: '20px', marginTop: '20px' }}
              accountStatus="address"
              chainStatus="none"
              showBalance={false}
              label="Connect Wallet"
            />
          )
          : null}
      </div>
    </div>
  );
};
