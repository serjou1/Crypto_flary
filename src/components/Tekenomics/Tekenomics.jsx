import React from 'react';
import { Schedule } from '../Schedule/Schedule';
import style from './Tekenomics.module.scss';

import BgImage from '../../assets/bg-tekenomics.png'

export const Tekenomics = () => {
  return (
    <div className={style.Tekenomics}>
      <img src={BgImage} alt="" />
      <p>Tekenomics</p>
      <div className={style.tekenomicsInfo}>
        <div className={style.description}>
          <div className={style.data}>
            <div className={style.titleSchedule}>Total supply:</div>
            <div className={style.adapt}>
              <div className="">
            <div className={style.infoData}>
              <div className={style.dot}></div>
              <div className={style.info}>50% lorem</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dot}></div>
              <div className={style.info}>50% lorem</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dot}></div>
              <div className={style.info}>50% lorem</div>
            </div>
            </div>
            <div className="">
            <div className={style.infoData}>
              <div className={style.dot}></div>
              <div className={style.info}>50% lorem</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dot}></div>
              <div className={style.info}>50% lorem</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dot}></div>
              <div className={style.info}>50% lorem</div>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className={style.schedule}>
          <Schedule />
        </div>
      </div>
    </div>
  );
};
