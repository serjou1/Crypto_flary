import React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import IDL from './solana/IDL.json';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import { Transaction } from '@solana/web3.js';
import style from './BuyWindow.module.scss';
import { BN, Program } from "@coral-xyz/anchor";
import { Buffer } from 'buffer';
import { TOKEN_SOL } from './constants';
import { config } from '../../config';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { useWallet as useWalletSolana } from '@solana/wallet-adapter-react';
import { useBuy } from './BuyContext';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

window.Buffer = Buffer;

const {
    SOL_USDC_ADDRESS
} = config;

const flaryTokenSaleAddress = new PublicKey("2EBs8GKZGfrnQSdhQfHmxa1Mik2UgGXRV6kRjS4h8G8T");
const USDC_MINT_ADDRESS = new PublicKey(SOL_USDC_ADDRESS);

export const BuyButtonSolana = () => {
    const { connected: isSolanaConnected } = useWalletSolana();

    return (
        (isSolanaConnected ? <ProcessPaymentButtonSolana /> : <ConnectSolanaButton />)
    );
};

const ConnectSolanaButton = () => {
    const { setVisible } = useWalletModal();

    return (
        <div
            className={style.pay_button}
            style={{
                opacity: '0.5',
                cursor: 'pointer'
            }}
            onClick={() => setVisible(true)}>
            Connect Solana Wallet To Buy FLFI
        </div>
    )
};

const ProcessPaymentButtonSolana = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const { token, tokensFromAmount } = useBuy();

    const buyTokensWithSolana = async () => {
        const transaction = await getBuyWithSolanaTransaction(publicKey, connection, Number(tokensFromAmount));
        await sendTransaction(transaction, connection);
    };

    const buyTokensWithUsdc = async () => {
        const transaction = await getBuyWithUsdcTransaction(publicKey, connection, Number(tokensFromAmount));
        await sendTransaction(transaction, connection);
    };

    return (
        <div
            className={style.pay_button}
            onClick={() => (token === TOKEN_SOL ? buyTokensWithSolana : buyTokensWithUsdc)()}>
            Buy FLFI
        </div>
    )
}

const getBuyWithSolanaTransaction = async (publicKey, connection, amount) => {
    const saleProgram = new Program(IDL, { connection });

    const solanaAmountBn = new BN(amount * LAMPORTS_PER_SOL);

    const [userSaleState] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_sale_state"),
            publicKey.toBuffer()
        ],
        flaryTokenSaleAddress,
    );

    const [saleWallet] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("sale_wallet")
        ],
        flaryTokenSaleAddress,
    );

    const [sale] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("sale")
        ],
        flaryTokenSaleAddress,
    );

    const instruction = await saleProgram
        .methods
        .buyTokensSol(solanaAmountBn)
        .accounts({
            user: publicKey,
            systemProgram: SystemProgram.programId,
            userSaleState,
            saleWallet,
            sale
        })
        .instruction();

    const blockhash = await connection.getLatestBlockhash();

    const transaction = new Transaction({
        feePayer: publicKey,
        ...blockhash
    }).add(instruction);

    return transaction;
};

const getBuyWithUsdcTransaction = async (publicKey, connection, amount) => {
    const saleProgram = new Program(IDL, { connection });

    const amountBn = new BN(amount * 10 ** 6);

    const usdcAddress = await getAssociatedTokenAddress(
        USDC_MINT_ADDRESS,
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
    );

    const instruction = await saleProgram
        .methods
        .buyTokensUsdt(amountBn)
        .accounts({
            usdtMint: USDC_MINT_ADDRESS,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            signerUsdtMint: usdcAddress,
            user: publicKey,
            systemProgram: SystemProgram.programId,
        })
        .instruction();

    const blockhash = await connection.getLatestBlockhash();

    const transaction = new Transaction({
        feePayer: publicKey,
        ...blockhash
    }).add(instruction);

    return transaction;
};