import React from 'react';
import { Bajan, Navbar } from '../../components';
import style from './HowToBuy.module.scss';

export const HowToBuy = () => {
  const example = [];
  return (
    <>
      <Navbar nav={example} />
      <div className={style.HowToBuy}>
        <h1 className={style.header}>How to Buy Flary Presale</h1>
        <div className={style.content_wrapper}>
          <h3>Welcome to the Flary Presale Purchase Guide!</h3>
          <p>Discover the steps to acquire Retik Finance's RETIK tokens.</p>
          <p>
            Choose the option that matches your preference and get started.
          </p>
          <Bajan/>
        </div>
      </div>
    </>
  );
};
