import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/Flary Logo.png';
import GitBook from '../../assets/GitBook.svg';
import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <>
      <div className={style.Footer}>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className={style.social}>
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
            <a
              className={style.socialLink}
              href="https://flary-finance.gitbook.io/"
              target="_blank"
              rel="noreferrer">
              <img src={GitBook} alt="GitBook" />
              <span>GitBook</span>
            </a>
          </div>
          <div className={style.socialItem}>
            <a
              className={style.socialLink}
              href="https://discord.gg/yUtkcMns"
              target="_blank"
              rel="noreferrer">
              <FaDiscord size={24} style={{ color: '#ffa957' }} />
              <span>Discord</span>
            </a>
          </div>
        </div>
      </div>
      <div className={style.rules} >
        <div>&copy; Flary 2024</div>
        <Link to="/policy" className={style.copy}>Privacy policy</Link>
      </div>
    </>
  );
};
