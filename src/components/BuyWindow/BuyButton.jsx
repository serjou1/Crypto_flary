import React, { useState, useEffect } from 'react';
import style from './BuyWindow.module.scss';
import { useAccount, useBalance, useSimulateContract, useReadContract, useWriteContract } from 'wagmi';
import { FLARY_PRESALE_ABI } from './flary-contract-abi';
import { NETWORK_ETHEREUM, TOKEN_USDT } from './constants';
import { config } from '../../config';
import { parseEther, parseUnits } from 'viem';
import { ERC_20_ABI } from './erc-20-abi';

const {
    ETH_CONTRACT_SEPOLIA_ADDRESS,
    ETH_CONTRACT_ADDRESS,
    BSC_CONTRACT_ADDRESS,
    ETH_USDT_ADDRESS,
    BSC_USDT_ADDRESS,
    RPC_ETH,
    RPC_BSC,
} = config;

export const BuyButton = ({ error, tokensToAmount, network, tokensFromAmount, setError, setLoading, token, updateTokenHoldings, setSuccessful, Amount_FOR_STAGE, setProgress }) => {
    const { isDisconnected, address, chain } = useAccount();

    const [buyLimit, setBuyLimit] = useState(0);
    const [contractAddress, setContractAddress] = useState(null);
    const [usdtAddress, setUsdtAddress] = useState(null);
    const [amountNative, setAmountNative] = useState(0);
    const [amountUsdt, setAmountUsdt] = useState(0);

    useEffect(() => {
        setBuyLimit(tokensToAmount * 4);
    }, [tokensToAmount]);

    useEffect(() => {
        const address =
            network === NETWORK_ETHEREUM ? ETH_CONTRACT_ADDRESS : BSC_CONTRACT_ADDRESS;

        setContractAddress(address);

        setUsdtAddress(network === NETWORK_ETHEREUM ? ETH_USDT_ADDRESS : BSC_USDT_ADDRESS);
    }, [network]);

    useEffect(() => {
        setAmountNative(parseEther(Number(tokensFromAmount).toFixed(18)));

        const usdtDecimals = network === NETWORK_ETHEREUM ? 6 : 18;
        setAmountUsdt(parseUnits(Number(tokensFromAmount).toFixed(usdtDecimals), usdtDecimals));
    }, [tokensFromAmount, network]);

    const { writeContractAsync: buyTokensNative, isError: isErrorNative, isSuccess: isErrorSuccess } = useWriteContract({
        address: contractAddress,
        abi: FLARY_PRESALE_ABI,
        functionName: 'buyTokensNative',
        args: [],
        overrides: {
            value: amountNative,
        },
    });

    const { writeContractAsync: buyTokensUsdtWrite, isError: isErrorUsdt, isSuccess: isSuccessUsdt } = useWriteContract({
        address: contractAddress,
        abi: FLARY_PRESALE_ABI,
        functionName: 'buyTokensUSDT',
        args: [amountUsdt],
    });

    const { writeContractAsync: approve, isError: isErrorApprove, isSuccess: isSuccessApprove } = useWriteContract({
        address: usdtAddress,
        abi: ERC_20_ABI,
        functionName: 'allowance',
        args: [address, contractAddress],
    });

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

        setLoading(true);
        await buyTokensNative();
        setLoading(false);
    };

    const buyTokensUsdt = async () => {
        if (paused) {
            console.log('Token presale is PAUSED!!!');
            return;
        }

        if (usdtBalance && usdtBalance.value < amountUsdt) {
            setError(true);
            return;
        }

        setLoading(true);

        if (allowance < amountUsdt) {
            await approve();
        }

        await buyTokensUsdtWrite();

        await updateTokenHoldings();
        setLoading(false);
        setSuccessful(true);

        const progressInPercent = (parseFloat(tokensFromAmount) / Amount_FOR_STAGE) * 100;

        setProgress((prevProgress) => prevProgress + progressInPercent);
    };

    const buyCoins = async () => {
        if (token === TOKEN_USDT) {
            await buyTokensUsdt();
        } else {
            await buyCoinsNative();
        }
    };

    return (
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
};


// const buyCoins = async () => {
//     if (tokensFromAmount > 0) {
//         if (network === NETWORK_ETHEREUM && token === TOKEN_ETHEREUM) {
//             await buyTokensNative(NETWORK_ETHEREUM);
//         } else if (network === NETWORK_BSC && token === TOKEN_BNB) {
//             await buyTokensNative(NETWORK_BSC);
//         } else if (network === NETWORK_ETHEREUM) {
//             await buyTokensUsdt(NETWORK_ETHEREUM);
//         } else {
//             await buyTokensUsdt(NETWORK_BSC);
//         }
//     } else {
//         alert('Please enter value more than 0');
//     }
// };



// const buyTokensNative = async (network) => {
//     const amount = parseEther(Number(tokensFromAmount).toFixed(18));

//     const contractAddress =
//         network === NETWORK_ETHEREUM ? ETH_CONTRACT_ADDRESS : BSC_CONTRACT_ADDRESS;

//     const { config } = useSimulateContract({
//         address: contractAddress, // replace with your contract address
//         abi: FLARY_PRESALE_ABI, // replace with your contract ABI
//         functionName: 'buyTokensNative',
//         args: [], // if the function accepts arguments, pass them here
//         overrides: {
//             value: amount, // value to send in the transaction
//         },
//     });

//     console.log('config', config);

//     return;


//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();

//     const contract = getContract(network, signer);

//     const paused = await contract.paused();
//     if (paused) {
//         console.log('Token presale is PAUSED!!!');
//         // alert("token presale is PAUSED!!!")
//         return;
//     }

//     const balance = await provider.getBalance(signer.address);
//     if (balance <= amount) {
//         setError(true);

//         return;
//     }

//     const tx = await contract.buyTokensNative({ value: amount });

//     setLoading(true);

//     await tx.wait();
//     await updateTokenHoldings();
//     setLoading(false);
//     setSuccessful(true);

//     await fetch('https://back.flary.finance/api/user/boughtTokens', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             amount: Number(tokensToAmount),
//             address: signer.address,
//             chain: network === NETWORK_ETHEREUM ? 'eth' : 'bsc',
//         }),
//     });
// };

// const buyTokensUsdt = async (network) => {
//     const decimals = network === NETWORK_ETHEREUM ? 6 : 18;
//     const amount = ethers.parseUnits(Number(tokensFromAmount).toFixed(decimals), decimals);

//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();

//     const contract = getContract(network, signer);

//     const usdtAddress = network === NETWORK_ETHEREUM ? ETH_USDT_ADDRESS : BSC_USDT_ADDRESS;

//     const usdt = new ethers.Contract(usdtAddress, ERC_20_ABI, signer);

//     const paused = await contract.paused();
//     if (paused) {
//         console.log('Token presale is PAUSED!!!');
//         return;
//     }

//     const balance = await usdt.balanceOf(signer.address);
//     if (balance < amount) {
//         setError(true);

//         return;
//     }

//     const allowance = await usdt.allowance(signer.address, await contract.getAddress());

//     setLoading(true);

//     if (allowance < amount) {
//         const approveTx = await usdt.approve(await contract.getAddress(), amount);
//         await approveTx.wait();
//     }

//     const tx = await contract.buyTokensUSDT(amount);
//     await tx.wait();
//     await updateTokenHoldings();
//     setLoading(false);
//     setSuccessful(true);
//     // TODO: enable front
//     const progressInPercent = (parseFloat(tokensFromAmount) / Amount_FOR_STAGE) * 100;

//     setProgress((prevProgress) => prevProgress + progressInPercent);
// };