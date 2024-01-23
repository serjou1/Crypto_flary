import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import logo from '../../assets/Flary Logo.png';
import style from './Footer.module.scss';

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
          <a
            href="https://twitter.com/FlaryFinance"
            target="_blank"
            rel="noreferrer"
            className={style.socialLink}>
            <BsTwitterX size={24} style={{ color: '#ffa957' }} />
            <span>X</span>
          </a>
        </div>
        <div className={style.socialItem}>
          <div className={style.socialLink}>
            <div className={style.prompting}>Coming soon</div>
            <FaTelegramPlane size={24} style={{ color: '#ffa957' }} />
            <span>Telegram</span>
          </div>
        </div>
        <div className={style.socialItem}>
          <div className={style.socialLink}>
            <div className={style.prompting}>Coming soon</div>
            <FaDiscord size={24} style={{ color: '#ffa957' }} />
            <span>Discord</span>
          </div>
        </div>
      </div>
    </div>
  );
};
