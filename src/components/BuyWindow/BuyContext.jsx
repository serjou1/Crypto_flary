import React, { createContext, useContext, useState } from 'react';
import { useAccount } from 'wagmi';
import { NETWORK_ETHEREUM, TOKEN_ETHEREUM } from './constants';

import ETH from '../../assets/ETH.svg';

const BuyContext = createContext({});

export const BuyProvider = ({ children }) => {
    const { address, status, chainId } = useAccount();

    const [dropToken, setDropToken] = useState(false);
    const [dropNetwork, setDropNetwork] = useState(false);

    const [tokenImage, setTokenImage] = useState(ETH);

    const [network, setNetwork] = useState(NETWORK_ETHEREUM);

    const [token, setToken] = useState(TOKEN_ETHEREUM);

    const [balanceValue, setBalanceValue] = useState(0);
    const [balanceValueFiat, setBalanceValueFiat] = useState(0);

    const [tokensFromAmount, setTokensFromAmount] = useState('');
    const [tokensToAmount, setTokensToAmount] = useState('');

    const [networkPrices, setNetworkPrices] = useState({});

    const [tokenPrice, setTokenPrice] = useState(0);

    return (
        <BuyContext.Provider value={{
            address,
            status,
            chainId,
            token,
            setToken,
            dropToken,
            setDropToken,
            network,
            setNetwork,
            dropNetwork,
            setDropNetwork,
            tokenImage,
            setTokenImage,
            balanceValue,
            setBalanceValue,
            balanceValueFiat,
            setBalanceValueFiat,
            tokensFromAmount,
            setTokensFromAmount,
            tokensToAmount,
            setTokensToAmount,
            networkPrices,
            setNetworkPrices,
            tokenPrice,
            setTokenPrice
        }}>
            {children}
        </BuyContext.Provider>
    );
};

export const useBuy = () => {
    const context = useContext(BuyContext);

    const {
        address,
        status,
        chainId,
        token,
        setToken,
        dropToken,
        setDropToken,
        network,
        setNetwork,
        dropNetwork,
        setDropNetwork,
        tokenImage,
        setTokenImage,
        balanceValue,
        setBalanceValue,
        balanceValueFiat,
        setBalanceValueFiat,
        tokensFromAmount,
        setTokensFromAmount,
        tokensToAmount,
        setTokensToAmount,
        networkPrices,
        setNetworkPrices,
        tokenPrice,
        setTokenPrice
    } = context;

    return {
        address,
        status,
        chainId,
        token,
        setToken,
        dropToken,
        setDropToken,
        network,
        setNetwork,
        dropNetwork,
        setDropNetwork,
        tokenImage,
        setTokenImage,
        balanceValue,
        setBalanceValue,
        balanceValueFiat,
        setBalanceValueFiat,
        tokensFromAmount,
        setTokensFromAmount,
        tokensToAmount,
        setTokensToAmount,
        networkPrices,
        setNetworkPrices,
        tokenPrice,
        setTokenPrice
    };
};
