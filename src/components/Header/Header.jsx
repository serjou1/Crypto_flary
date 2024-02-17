import React from 'react';

import HeaderImage from '../../assets/Heder.png';
import style from './Header.module.scss';
import { Animate } from './Animate';
import { Link } from 'react-router-dom';



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
        <div className={style.btn}>
          <Link to='/fairlaunch' className={style.button}>Launch App</Link>
        </div>
        </Animate>
      </div>

      <div className={style.img}>
        <img src={HeaderImage} alt="HeaderImage" />
      </div>
    </div>
  );
};
