import React from 'react';


import style from './Header.module.scss';
import { Animate } from './Animate';
import { Link } from 'react-router-dom';
import { HeaderNav } from '../HeaderNav/HeaderNav';
import { BuyWindow } from '../BuyWindow/BuyWindow';




export const Header = () => {
  return (
    <div className={style.Header} id="hero">
      <div className={style.description}>
        <Animate custom={1}>
        <h1>The First Cross-Chain Lending & Borrowing platform that really cares about you</h1></Animate>
        <Animate custom={2}>
        <p>
          Flary Finance is an innovative cross-chain lending platform connecting EVM and non-EVM
          networks including bitcoin ordinals, which provides its users with brand new solutions and
          services designed to greatly simplify cross-chain transactions and help distribute
          liquidity across different networks.
        </p>
        </Animate>
        <Animate custom={3}>

          <HeaderNav/>
        
        </Animate>
      </div>

      <div className={style.img}>
        <BuyWindow/>
      </div>
    </div>
  );
};
