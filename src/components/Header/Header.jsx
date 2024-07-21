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
        Say goodbye to the old ways of banking and embrace a future with Flary Finance,
          where your assets are truly mobile and your financial needs are met with ease.
          Apart of lending & borrowing our protocol is powered with yielding, bridging, and other
          comprehensive solutions, all in one place. Flary is the ultimate aggregator.
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
