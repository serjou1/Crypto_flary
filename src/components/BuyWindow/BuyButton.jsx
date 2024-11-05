import { waitForTransactionReceipt } from '@wagmi/core';
import React, { useEffect, useState } from 'react';
import { parseEther, parseUnits } from 'viem';
import { useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi';
import { config } from '../../config';
import { config as rainbowConfig } from '../../providers';
import style from './BuyWindow.module.scss';
import { NETWORK_ETHEREUM, TOKEN_USDT } from './constants';
import { ERC_20_ABI } from './erc-20-abi';
import { FLARY_PRESALE_ABI } from './flary-contract-abi';


const {
  ETH_CONTRACT_SEPOLIA_ADDRESS,
  ETH_CONTRACT_ADDRESS,
  BSC_CONTRACT_ADDRESS,
  ETH_USDT_ADDRESS,
  BSC_USDT_ADDRESS,
} = config;

export const BuyButton = ({
  error,
  tokensToAmount,
  network,
  tokensFromAmount,
  setError,
  setLoading,
  token,
  updateTokenHoldings,
  setSuccessful,
  setErrorTransaction
}) => {
  const { isDisconnected, address, chain } = useAccount();

  const [buyLimit, setBuyLimit] = useState(0);
  const [contractAddress, setContractAddress] = useState(null);
  const [usdtAddress, setUsdtAddress] = useState(null);
  const [amountNative, setAmountNative] = useState(0);
  const [amountUsdt, setAmountUsdt] = useState(0);
  

  useEffect(() => {
    
    setBuyLimit(tokensToAmount * 4);
  }, [ tokensToAmount]);

  useEffect(() => {
    const address = network === NETWORK_ETHEREUM ? ETH_CONTRACT_ADDRESS : BSC_CONTRACT_ADDRESS;

    setContractAddress(address);

    setUsdtAddress(network === NETWORK_ETHEREUM ? ETH_USDT_ADDRESS : BSC_USDT_ADDRESS);
  }, [network]);

  useEffect(() => {
    setAmountNative(parseEther(Number(tokensFromAmount).toFixed(18)));

    const usdtDecimals = network === NETWORK_ETHEREUM ? 6 : 18;
    setAmountUsdt(parseUnits(Number(tokensFromAmount).toFixed(usdtDecimals), usdtDecimals));
  }, [tokensFromAmount, network]);

  const {
    writeContractAsync: buyTokensNativeWrite,
    error: errorNativ,
    isError: isErrorNative,
    isPending: isMintLoading,
    isSuccess: isSuccessNative,
  } = useWriteContract();

  const {
    writeContractAsync: buyTokensUsdtWrite,
    isError: isErrorUsdt,
    isSuccess: isSuccessUsdt,
  } = useWriteContract();

  const {
    writeContractAsync: approve,
    onError: isErrorApprove,
    isSuccess: isSuccessApprove,
  } = useWriteContract();

  const { data: balance } = useBalance({
    address,
    chainId: chain?.id,
  });

  const { data: paused } = useReadContract({
    address: contractAddress,
    abi: FLARY_PRESALE_ABI,
    functionName: 'paused',
  });

  const { data: usdtBalance } = useReadContract({
    address: usdtAddress,
    abi: ERC_20_ABI,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: allowance } = useReadContract({
    address: usdtAddress,
    abi: ERC_20_ABI,
    functionName: 'allowance',
    args: [address, contractAddress],
  });

  const buyCoinsNative = async () => {
    if (paused) {
      console.log('Token presale is PAUSED!!!');
      return;
    }

    if (balance && balance.value <= amountNative) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      
      console.log('Attempting to buy tokens...');

 
      const buyHash = await buyTokensNativeWrite({
        address: contractAddress,
        abi: FLARY_PRESALE_ABI,
        functionName: 'buyTokensNative',
        args: [],
        value: amountNative,
      });
      await waitForTransactionReceipt(rainbowConfig, {
        hash: buyHash,
      });

      setSuccessful(true);
    } catch (error) {
      setErrorTransaction(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    if (isErrorNative) {
      console.error('An error occurred during the transaction.');
      setError(true); // Устанавливаем состояние ошибки в случае возникновения ошибки
    }
  }, [isErrorNative]);

  const buyTokensUsdt = async () => {
    if (paused) {
      console.log('Token presale is PAUSED!!!');
      return;
    }

    if (usdtBalance && Number(usdtBalance) > amountUsdt) {
      try {
        setLoading(true);
        if (allowance < amountUsdt) {
          const hash = await approve({
            address: usdtAddress,
            abi: ERC_20_ABI,
            functionName: 'approve',
            args: [contractAddress, amountUsdt],
          });

          await waitForTransactionReceipt(rainbowConfig, { hash });
        }

        const buyHash = await buyTokensUsdtWrite({
          address: contractAddress,
          abi: FLARY_PRESALE_ABI,
          functionName: 'buyTokensUSDT',
          args: [amountUsdt],
        });

        await waitForTransactionReceipt(rainbowConfig, { hash: buyHash });
        setSuccessful(true);
      } catch (error) {
        setErrorTransaction(true);
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };
  const buyCoins = async () => {
    if (tokensFromAmount <= 0) {
      alert('Please');
    } else {
      if (token === TOKEN_USDT) {
        await buyTokensUsdt();
      } else {
        await buyCoinsNative();
      }
    }

    await updateTokenHoldings();
  };



  return (
    <>
   
    <div
      className={style.pay_button}
      onClick={() => buyCoins()}
      style={
        error || isDisconnected|| buyLimit < 50
          ? 
            {
              opacity: '0.3',
              pointerEvents: 'none',
              cursor: 'not-allowed',
            }
          : { opacity: '1' }
      }>
      {buyLimit < 50 ? 'Minimum purchase is $50' : 'Buy FLFI'}
      {isErrorNative && <p>error</p>}
    </div>
    </>
  );
};
