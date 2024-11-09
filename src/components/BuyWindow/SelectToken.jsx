import React from 'react';
import style from './BuyWindow.module.scss';
import { TOKEN_BNB, TOKEN_ETHEREUM, TOKEN_SOL, TOKEN_USDC, TOKEN_USDT } from './constants';

import BNB from '../../assets/bnb logo.webp';
import ETH from '../../assets/ETH.svg';
import SOL from '../../assets/solana.svg';
import USDT from '../../assets/USDT.svg';
import USDC from '../../assets/USDC.svg';

export const SelectEthToken = ({
    handlerSelectPaymentCoin,
    ethEthValue,
    ethEthValueFiat,
    ethUsdtValue
}) => {
    return (
        <div className={style.drop_token}>
            <SelectPaymentCoinListItem
                coin={TOKEN_ETHEREUM}
                imgSrc={ETH}
                coinBalane={ethEthValue}
                coinBalaneUsd={ethEthValueFiat}
                handlerSelectPaymentCoin={handlerSelectPaymentCoin}
            />

            <SelectPaymentCoinListItem
                coin={TOKEN_USDT}
                imgSrc={USDT}
                coinBalane={ethUsdtValue}
                coinBalaneUsd={ethUsdtValue}
                handlerSelectPaymentCoin={handlerSelectPaymentCoin}
            />
        </div>
    )
}

export const SelectSolToken = ({
    handlerSelectPaymentCoin,
    solanaSolValue,
    solanaSolValueFiat,
    solanaUsdcValue
}) => {
    return (
        <div className={style.drop_token}>
            <SelectPaymentCoinListItem
                coin={TOKEN_SOL}
                imgSrc={SOL}
                coinBalane={solanaSolValue}
                coinBalaneUsd={solanaSolValueFiat}
                handlerSelectPaymentCoin={handlerSelectPaymentCoin}
            />

            <SelectPaymentCoinListItem
                coin={TOKEN_USDC}
                imgSrc={USDC}
                coinBalane={solanaUsdcValue}
                coinBalaneUsd={solanaUsdcValue}
                handlerSelectPaymentCoin={handlerSelectPaymentCoin}
            />
        </div>
    );
};

export const SelectBscToken = ({
    handlerSelectPaymentCoin,
    bnbBNBValue,
    bnbBNBValueFiat,
    bnbUsdtValue
}) => {
    return (
        <div className={style.drop_token}>
            <SelectPaymentCoinListItem
                coin={TOKEN_BNB}
                imgSrc={BNB}
                coinBalane={bnbBNBValue}
                coinBalaneUsd={bnbBNBValueFiat}
                handlerSelectPaymentCoin={handlerSelectPaymentCoin}
            />

            <SelectPaymentCoinListItem
                coin={TOKEN_USDT}
                imgSrc={USDT}
                coinBalane={bnbUsdtValue}
                coinBalaneUsd={bnbUsdtValue}
                handlerSelectPaymentCoin={handlerSelectPaymentCoin}
            />
        </div>
    )
};

const SelectPaymentCoinListItem = ({
    coin,
    imgSrc,
    coinBalane,
    coinBalaneUsd,
    handlerSelectPaymentCoin
}) => {
    const coinBalanceFormatted = coinBalane >= 0.001 ? coinBalane.toFixed(3) : "0";

    return (
        <div
            className={style.button_drop}
            onClick={() => handlerSelectPaymentCoin(
                coin,
                imgSrc,
                coinBalanceFormatted,
                coinBalaneUsd
            )}>
            <div className={style.button_drop_left}>
                <img src={imgSrc} alt="" />
                <p>{coin}</p>
            </div>
            <div className={style.button_drop_right}>
                <p className={style.balanceValue}>
                    {coinBalanceFormatted}
                </p>
                <p
                    className={style.balanceValue}
                    style={{ color: 'gray', fontWeight: '300' }}>
                    ${coinBalaneUsd}
                </p>
            </div>
        </div>
    );
};