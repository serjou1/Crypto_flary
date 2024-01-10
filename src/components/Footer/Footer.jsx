import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import logo from '../../assets/FLARY svg.png';
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
          <a href="#" className={style.socialLink}>
            <BsTwitterX size={24} style={{ color: '#ffa957' }} />
            <span>X</span>
          </a>
        </div>
        <div className={style.socialItem}>
          <a href="#" className={style.socialLink}>
            <FaTelegramPlane size={24} style={{ color: '#ffa957' }} />
            <span>Telegram</span>
          </a>
        </div>
        <div className={style.socialItem}>
          <a href="#" className={style.socialLink}>
            <FaDiscord size={24} style={{ color: '#ffa957' }} />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </div>
  );
};
