import React from 'react';
import  potato  from '../../assets/potato-logo.png';
import { Animate } from '../Header/Animate';
import style from './Tiker.module.scss';

export const Tiker = () => {
  return (
    <div className={style.Tiker}>
      <Animate custom={1}>
        <h1>Featured In</h1>
      </Animate>
      <div className={style.ticker}>
        <div className={style.ticker_wrapper}>
          <img src={potato} alt="" />
          <img src={potato} alt="" />
          <img src={potato} alt="" />
          <img src={potato} alt="" />
          <img src={potato} alt="" />
          <img src={potato} alt="" />
        </div>
      </div>
    </div>
  );
};
