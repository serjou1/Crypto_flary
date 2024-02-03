import React, { useState } from 'react';
import { Link as LinkSmooth } from 'react-scroll';
import logo from '../../assets/Flary Logo.png';
import style from './Navbar.module.scss';

import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const [mobileNav, SetMobileNav] = useState(false);

  const handlerMobileNav = () => {
    SetMobileNav(!mobileNav);
  };
  return (
    <div className={style.Navbar}>
      <div className={style.bgBlur}></div>
      <div className={style.flexbox}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className={style.list}>
          <li className="active">
            <LinkSmooth to="hero" spy={true} offset={-150} smooth={true} duration={500}>
              Home
            </LinkSmooth>
          </li>
          <li>
            <LinkSmooth to="about" spy={true} offset={-100} smooth={true} duration={500}>
              About Us
            </LinkSmooth>
          </li>
          <li>
            <LinkSmooth to="tekenomics" spy={true} offset={-150} smooth={true} duration={500}>
              Tokenomics
            </LinkSmooth>
          </li>
          <li>
            <LinkSmooth to="roadmap" spy={true} offset={-150} smooth={true} duration={500}>
              Roadmap
            </LinkSmooth>
          </li>
        </ul>
        {/* <Select /> */}
        <div className={style.mobile_button} onClick={handlerMobileNav}>
          {mobileNav ? (
            <FaTimes size={20} style={{ color: '#fff', cursor: 'pointer' }} />
          ) : (
            <FaBars size={20} style={{ color: '#fff', cursor: 'pointer' }} />
          )}
        </div>

        <div className={mobileNav ? style.mobile_open : style.mobile_close}>
          <ul className={style.mobile_list}>
            <li>
              <LinkSmooth
                to="hero"
                spy={true}
                offset={-150}
                smooth={true}
                duration={500}
                onClick={handlerMobileNav}>
                Home
              </LinkSmooth>
            </li>
            <li>
              <LinkSmooth
                to="about"
                spy={true}
                offset={-100}
                smooth={true}
                duration={500}
                onClick={handlerMobileNav}>
                About Us
              </LinkSmooth>
            </li>
            <li>
              <LinkSmooth
                to="tekenomics"
                spy={true}
                offset={-150}
                smooth={true}
                duration={500}
                onClick={handlerMobileNav}>
                Tokenomics
              </LinkSmooth>
            </li>
            <li>
              <LinkSmooth
                to="roadmap"
                spy={true}
                offset={-150}
                smooth={true}
                duration={500}
                onClick={handlerMobileNav}>
                Roadmap
              </LinkSmooth>
            </li>
          </ul>
          
        </div>
      </div>
    </div>
  );
};
