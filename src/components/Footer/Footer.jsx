import React from 'react';
import logo from '../../assets/FLARY svg.png';
import style from './Footer.module.scss';

import discord from '../../assets/discord.svg';
import telegram from '../../assets/telegram.svg';
import X from '../../assets/top-X.svg';

export const Footer = () => {
  return (
    <div className={style.Footer}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className={style.social}>
        {/* <div className={style.socialItem}>
           <a href="https://impossible.finance" className="">
            <img src={Blog} alt="" />
            <span> IF Blog</span>
          </a> 
          </div> */}
        <div className={style.socialItem}>
          <a href="#" className={style.socialLink}>
            <img src={X} alt="" />
            <span>X</span>
          </a>
        </div>
        <div className={style.socialItem}>
          <a href="#" className={style.socialLink}>
            <img src={telegram} alt="" />
            <span>Telegram</span>
          </a>
        </div>
        <div className={style.socialItem}>
          <a href="#" className={style.socialLink}>
            <img src={discord} alt="" />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </div>
  );
};
