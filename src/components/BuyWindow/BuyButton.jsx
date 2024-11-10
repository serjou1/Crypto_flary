import React from 'react';
import style from './BuyWindow.module.scss';
import { NETWORK_SOLANA } from './constants';
import { useBuy } from './BuyContext';
import { BuyButtonSolana } from './BuyButtonSolana';
import { BuyButtonEvm } from './BuyButtonEvm';

export const BuyButton = () => {
  const { network } = useBuy();

  return (
    <>
      {
        network === NETWORK_SOLANA
          ? <BuyButtonSolana />
          : <BuyButtonEvm />
      }
    </>
  );
};

export const MakeAPurchaseButton = ({
  onClick
}) => {
  const { inputAmountInUsd } = useBuy();

  return (
    <div
      className={style.pay_button}
      onClick={onClick}
      style={
        inputAmountInUsd < 50
          ? {
            opacity: '0.3',
            pointerEvents: 'none',
            cursor: 'not-allowed',
          }
          : { opacity: '1' }
      }>
      {inputAmountInUsd < 50 ? 'Minimum purchase is $50' : 'Buy FLFI'}
    </div>
  )
};