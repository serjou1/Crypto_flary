import React, { useState, useEffect } from 'react';
import style from './BuyWindow.module.scss';
import { useBuy } from './BuyContext';
import { NETWORK_BSC, NETWORK_ETHEREUM, NETWORK_SOLANA, TOKEN_BNB, TOKEN_ETHEREUM, TOKEN_SOL, TOKEN_USDC, TOKEN_USDT } from './constants';
import Arrow from '../../assets/arrow_down.svg';
import { SelectBscToken, SelectEthToken, SelectSolToken } from './SelectToken';
import { useBalance } from 'wagmi';
import { config } from '../../config';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { useIsMounted } from './useIsMounted';
import { formatEther, JsonRpcProvider } from 'ethers';
import { getSolanaPrice } from './solana/get-solana-price';

const {
    ETH_USDT_ADDRESS,
    BSC_USDT_ADDRESS,
    RPC_ETH,
    RPC_BSC,
    SOL_USDC_ADDRESS,
    TOKEN_PROGRAM
} = config;

const USDC_MINT_ADDRESS = new PublicKey(SOL_USDC_ADDRESS);

const providerEthereum = new JsonRpcProvider(RPC_ETH);
const providerBSC = new JsonRpcProvider(RPC_BSC);

export const YouPayComponent = () => {
    const {
        dropToken,
        setDropToken,
        network,
        status,
        setDropNetwork,
        tokenImage,
        token,
        balanceValue,
        balanceValueFiat,
        setToken,
        setTokenImage,
        setTokensFromAmount,
        setTokensToAmount,
        setBalanceValue,
        setBalanceValueFiat,
        address,
        networkPrices,
        tokensFromAmount,
        tokenPrice,
        inputAmountInUsd,
        setInputAmountInUsd,
        chainId,
        setNetworkPrices
    } = useBuy();

    const { connection } = useConnection();
    const { publicKey, connected: solWalletConnected } = useWallet();

    const mounted = useIsMounted();

    const [solBalance, setSolBalance] = useState(0);
    const [solBalanceFiat, setSolBalanceFiat] = useState(0);
    const [solUsdcBalance, setSolUsdcBalance] = useState(0);

    const [maxButtonAvailable, setMaxButtonAvailable] = useState(false);

    useEffect(() => {
        if (network === NETWORK_SOLANA) {
            setMaxButtonAvailable(solWalletConnected);
        } else {
            setMaxButtonAvailable(status === 'connected');
        }
    }, [network, solWalletConnected, status]);

    useEffect(() => {
        const fetchBalance = async () => {
            console.log("Fetching balance");

            if (publicKey) {
                try {
                    const price = await getSolanaPrice();

                    const balanceLamports = await connection.getBalance(publicKey);
                    const balanceSol = balanceLamports / 1e9;
                    setSolBalance(balanceSol);
                    setSolBalanceFiat(Number((balanceSol * price).toFixed(2)));

                } catch (error) {
                    console.error("Failed to fetch balance:", error);
                }

                console.log('publicKey:', publicKey.toBase58());
                console.log('USDC_MINT_ADDRESS:', USDC_MINT_ADDRESS.toBase58());
                const usdcAddress = await getAssociatedTokenAddress(
                    USDC_MINT_ADDRESS,
                    publicKey,
                    false,
                    TOKEN_PROGRAM
                );

                console.log('usdcAddress:', usdcAddress.toBase58());

                const accountInfo = await connection.getTokenAccountBalance(usdcAddress);

                console.log('accountInfo:', accountInfo);

                setSolUsdcBalance(accountInfo.value.uiAmount);
            }
            setSolBalance(0);
            setSolBalanceFiat(0);
        };

        fetchBalance();
    }, [connection, publicKey]);


    useEffect(() => {
        const calculateBalanceInFiat = (coinValue) => {
            const price = getBaseCoinPrice();
            if (!price) return null;
            return (coinValue * price).toFixed(1);
        };

        if (ethEth?.formatted) {
            const ethValue = Math.floor(ethEth.formatted * 1000) / 1000;

            if (!isNaN(ethValue)) {
                setBalanceValue(ethEthValue);
                setBalanceValueFiat(calculateBalanceInFiat(ethValue));
            }
        } else if (bnbBNB?.formatted) {
            const bnbValue = Math.floor(bnbBNB.formatted * 1000) / 1000;

            if (!isNaN(bnbValue)) {
                setBalanceValue(bnbValue);
                setBalanceValueFiat(calculateBalanceInFiat(bnbValue));
            }
        }
    },
        [address, status, chainId, network]
    );

    const dropTokenList = () => {
        if (network === NETWORK_SOLANA) {
            if (!solWalletConnected) {
                return;
            }
        } else if (status === 'disconnected') {
            return;
        }

        setDropToken(!dropToken);
        setDropNetwork(false);
    };

    const handlerSelectPaymentCoin = (
        token,
        tokenImg,
        balance,
        balanceFiat
    ) => {
        console.log(token, balance, balanceFiat, Number(balanceFiat), Number(balanceFiat).toFixed(2), Number(Number(balanceFiat).toFixed(2)))

        setDropNetwork(!dropToken);
        setToken(token);
        setTokenImage(tokenImg);
        setTokensFromAmount('');
        setTokensToAmount('');
        setBalanceValue(balance);
        setBalanceValueFiat(Number(Number(balanceFiat).toFixed(2)));
    };

    const { data: bnbBNB } = useBalance({
        address,
    });

    const bnbBNBValue = Math.floor(Number(bnbBNB?.formatted) * 1000) / 1000;
    const bnbBNBValueFiat = (bnbBNBValue * networkPrices[NETWORK_BSC]).toFixed(1);

    const { data: bnbUsdt } = useBalance({
        address: address,
        token: BSC_USDT_ADDRESS,
    });
    const bnbUsdtValue = Number(bnbUsdt?.formatted ?? 0);


    const { data: ethEth } = useBalance({
        address: address,
    });
    const ethEthValue = Math.floor(Number(ethEth?.formatted) * 1000) / 1000;

    const ethEthValueFiat = (ethEthValue * networkPrices[NETWORK_ETHEREUM]).toFixed(1);


    const { data: ethUsdt } = useBalance({
        address: address,
        token: ETH_USDT_ADDRESS
    });
    const ethUsdtValue = Number(ethUsdt?.formatted);

    console.log('ethUsdtValue:', ethUsdtValue);
    console.log('bnbUsdtValue:', bnbUsdtValue);


    const getBaseCoinPrice = () => {
        return networkPrices[network];
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

    const setMaxAcceptableValue = async () => {
        if (network === NETWORK_ETHEREUM && token === TOKEN_ETHEREUM) {
            const gasPriceInNativeCoin = await getGasPriceInNativeCoin(providerEthereum);
            const balanceWithoutFee = balanceValue - gasPriceInNativeCoin;
            const availableBalance = Math.max(balanceWithoutFee, 0);
            setTokensFromAmount(availableBalance);

            const tokensToAmountNew = availableBalance * networkPrices[NETWORK_ETHEREUM] / tokenPrice;
            setTokensToAmount(tokensToAmountNew);
        } else if (network === NETWORK_BSC && token === TOKEN_BNB) {
            const gasPriceInNativeCoin = await getGasPriceInNativeCoin(providerBSC);
            const balanceWithoutFee = balanceValue - gasPriceInNativeCoin;
            const availableBalance = Math.max(balanceWithoutFee, 0);
            setTokensFromAmount(availableBalance);

            const tokensToAmountNew = availableBalance * networkPrices[NETWORK_BSC] / tokenPrice;
            setTokensToAmount(tokensToAmountNew);
        } else if (network === NETWORK_SOLANA && token === TOKEN_SOL) {
            const feeInSolana = 0.00001;
            const balanceWithoutFee = solBalance - feeInSolana;
            const availableBalance = Math.max(balanceWithoutFee, 0);
            setTokensFromAmount(availableBalance);
        }
        else {
            setTokensFromAmount(balanceValue);
            const tokensToAmountNew =
                (balanceValue * (isBaseCoinSelected() ? getBaseCoinPrice() : 1)) / tokenPrice;
            setTokensToAmount(tokensToAmountNew);
        }
    };

    return (
        <div className={style.block_input}>
            <p className={style.labelLine}>You pay: </p>
            <div
                className={style.button}
                onClick={() => dropTokenList()}
                style={
                    dropToken ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : {}
                }>
                <div className={style.button_tittle}>
                    <img src={tokenImage} alt="" />
                    <p>{token}</p>

                    {status === 'disconnected' ? '' : <img src={Arrow} alt="" />}
                </div>{' '}

                {
                    status === 'disconnected'
                        ? ('') :
                        (
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
                        )
                }
                {network === NETWORK_BSC
                    ? dropToken && <SelectBscToken
                        handlerSelectPaymentCoin={handlerSelectPaymentCoin}
                        bnbBNBValue={bnbBNBValue}
                        bnbBNBValueFiat={bnbBNBValueFiat}
                        bnbUsdtValue={bnbUsdtValue}
                    />
                    : null}
                {network === NETWORK_ETHEREUM
                    ? dropToken && <SelectEthToken
                        handlerSelectPaymentCoin={handlerSelectPaymentCoin}
                        ethEthValue={ethEthValue}
                        ethEthValueFiat={ethEthValueFiat}
                        ethUsdtValue={ethUsdtValue}
                    />
                    : null}
                {network === NETWORK_SOLANA
                    ? dropToken && <SelectSolToken
                        solanaSolValue={solBalance}
                        solanaSolValueFiat={solBalanceFiat}
                        solanaUsdcValue={solUsdcBalance}
                        handlerSelectPaymentCoin={handlerSelectPaymentCoin}
                    />
                    : null}
            </div>

            <div className={style.max_input}>
                <input
                    className={style.input_buy}
                    type="number"
                    placeholder="Enter Amount"
                    value={tokensFromAmount}
                    onChange={(e) => {
                        const valueFromInput = e.target.value;
                        console.log('valueFromInput:', valueFromInput);

                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        console.log(tokensFromAmount);
                        const trimmedValue = value
                            .replace(/^0+(?=\d)/, '')
                            .replace(/^0+\.$/, '0.')
                            .replace(/^\.$/, '0.');
                        setTokensFromAmount(trimmedValue);

                        setInputAmountInUsd(Number(trimmedValue) * (isBaseCoinSelected() ? getBaseCoinPrice() : 1));

                        setTokensToAmount(inputAmountInUsd / tokenPrice);
                    }}
                />
                {mounted
                    ? maxButtonAvailable && (
                        <p className={style.max} onClick={() => setMaxAcceptableValue()}>
                            MAX
                        </p>
                    )
                    : null}
            </div>
        </div>
    )
};

const getGasPriceInNativeCoin = async (provider) => {
    const gasUsage = 150000n;
    const { gasPrice } = await provider.getFeeData();

    const gasPriceInNativeCoin = Number(formatEther(gasPrice * gasUsage));

    return gasPriceInNativeCoin;
};