
import React, { useState, useEffect } from 'react';
import style from './BuyWindow.module.scss';
import { useAccount, useWriteContract, useReadContract, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { NETWORK_ETHEREUM, TOKEN_USDT } from './constants';
import { useBuy } from './BuyContext';
import { config } from '../../config';
import { parseUnits } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { config as rainbowConfig } from '../../providers';
import { FLARY_PRESALE_ABI } from './flary-contract-abi';
import { ERC_20_ABI } from './erc-20-abi';
import { parseEther } from 'ethers';
import { MakeAPurchaseButton } from './BuyButton';

const {
    ETH_CONTRACT_ADDRESS,
    BSC_CONTRACT_ADDRESS,
    ETH_USDT_ADDRESS,
    BSC_USDT_ADDRESS,
} = config;

export const BuyButtonEvm = ({
    updateTokenHoldings
}) => {
    const { isConnected: isEvmConneted } = useAccount();

    return (
        (isEvmConneted ? <ProcessPaymentButtonEvm updateTokenHoldings={updateTokenHoldings} /> : <ConnectEvmButton />)
    );
};

const ConnectEvmButton = () => {
    const { openConnectModal } = useConnectModal();

    return (
        <div
            className={style.pay_button}
            style={{
                opacity: '0.5',
                cursor: 'pointer'
            }}
            onClick={openConnectModal}>
            Connect EVM Wallet To Buy FLFI
        </div>
    );
};

const ProcessPaymentButtonEvm = ({
    updateTokenHoldings
}) => {
    const {
        token,
        network,
    } = useBuy();

    const [contractAddress, setContractAddress] = useState(null);
    const [usdtAddress, setUsdtAddress] = useState(null);

    useEffect(() => {
        const address = network === NETWORK_ETHEREUM ? ETH_CONTRACT_ADDRESS : BSC_CONTRACT_ADDRESS;
        const usdtAddress = network === NETWORK_ETHEREUM ? ETH_USDT_ADDRESS : BSC_USDT_ADDRESS

        setContractAddress(address);
        setUsdtAddress(usdtAddress);
    }, [network]);


    return (
        (token === TOKEN_USDT
            ? <BuyWithUsdtButton
                contractAddress={contractAddress}
                usdtAddress={usdtAddress}
                updateTokenHoldings={updateTokenHoldings}
            /> : <BuyWithNativeButton contractAddress={contractAddress} updateTokenHoldings={updateTokenHoldings} />)
    );
};

const BuyWithNativeButton = ({
    contractAddress,
    updateTokenHoldings
}) => {
    const {
        setError,
        tokensFromAmount,
        setLoading,
        setErrorTransaction,
        setSuccessful
    } = useBuy();

    const { address } = useAccount();

    const { data: balance } = useBalance({
        address,
    });

    const { data: paused } = useReadContract({
        address: contractAddress,
        abi: FLARY_PRESALE_ABI,
        functionName: 'paused',
    });

    const {
        isError: isBuyTokensNativeError,
        writeContractAsync: buyTokensNativeWrite,
    } = useWriteContract();

    useEffect(() => {
        if (isBuyTokensNativeError) {
            setError(true);
        }
    }, [isBuyTokensNativeError]);

    const buyTokensNative = async () => {
        if (paused) {
            console.log('Token presale is PAUSED!!!');
            return;
        }

        const amountNative = parseEther(Number(tokensFromAmount).toFixed(18));

        if (balance && balance.value <= amountNative) {
            setErrorTransaction(true);
            setError(true);
            return;
        }

        try {
            setLoading(true);

            console.log('Attempting to buy tokens with native currency...');

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

            await updateTokenHoldings();
            setSuccessful(true);
        } catch (error) {
            setErrorTransaction(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MakeAPurchaseButton onClick={() => buyTokensNative()} />
    )
};

const BuyWithUsdtButton = ({
    contractAddress,
    usdtAddress,
    updateTokenHoldings
}) => {
    const {
        network,
        setErrorTransaction,
        setError,
        tokensFromAmount,
        setLoading,
        setSuccessful
    } = useBuy();

    const { address } = useAccount();

    const { data: usdtBalance } = useReadContract({
        address: usdtAddress,
        abi: ERC_20_ABI,
        functionName: 'balanceOf',
        args: [address],
    });

    const { data: paused } = useReadContract({
        address: contractAddress,
        abi: FLARY_PRESALE_ABI,
        functionName: 'paused',
    });

    const { data: allowance } = useReadContract({
        address: usdtAddress,
        abi: ERC_20_ABI,
        functionName: 'allowance',
        args: [address, contractAddress],
    });

    const {
        isError: isApproveError,
        writeContractAsync: approve,
    } = useWriteContract();

    const {
        isError: isBuyTokensUsdtError,
        writeContractAsync: buyTokensUsdtWrite,
    } = useWriteContract();

    useEffect(() => {
        if (isApproveError || isBuyTokensUsdtError) {
            setError(true);
            setErrorTransaction(true);
        }
    }, [isApproveError, isBuyTokensUsdtError]);

    const buyTokensUsdt = async () => {
        if (paused) {
            console.log('Token presale is PAUSED!!!');
            return;
        }

        const usdtDecimals = network === NETWORK_ETHEREUM ? 6 : 18;
        const amountUsdtBigNumber = parseUnits((Number(tokensFromAmount).toFixed(usdtDecimals)), usdtDecimals);

        if (!usdtBalance || usdtBalance < amountUsdtBigNumber) {
            setError(true);
            return;
        }

        try {
            setLoading(true);

            console.log('Attempting to buy tokens for tokens by USDT...');
            if (allowance < amountUsdtBigNumber) {
                const hash = await approve({
                    address: usdtAddress,
                    abi: ERC_20_ABI,
                    functionName: 'approve',
                    args: [contractAddress, amountUsdtBigNumber],
                });

                await waitForTransactionReceipt(rainbowConfig, { hash });
            }

            const buyHash = await buyTokensUsdtWrite({
                address: contractAddress,
                abi: FLARY_PRESALE_ABI,
                functionName: 'buyTokensUSDT',
                args: [amountUsdtBigNumber],
            });

            await waitForTransactionReceipt(rainbowConfig, { hash: buyHash });

            await updateTokenHoldings();
            setSuccessful(true);
        } catch (error) {
            setErrorTransaction(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MakeAPurchaseButton onClick={() => buyTokensUsdt()} />
    );
};