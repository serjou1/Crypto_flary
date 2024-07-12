import React, { useState } from 'react';
import { Link as LinkSmooth } from 'react-scroll';
import logo from '../../assets/Flary Logo.png';
import style from './Navbar.module.scss';

import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';

export const Navbar = ({ nav }) => {
  const [mobileNav, SetMobileNav] = useState(false);

  const handlerMobileNav = () => {
    SetMobileNav(!mobileNav);
  };

  return (
    <div className={style.Navbar}>
      <div className={style.bgBlur}></div>
      <div className={style.flexbox}>
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        <ul className={style.list}>
          <li>
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              to="/">
              Home
            </Link>
          </li>
          {nav.map((item) => (
            <li key={item.name}>
              <LinkSmooth to={item.to} spy={true} offset={item.offset} smooth={true} duration={500}>
                {item.name}
              </LinkSmooth>
            </li>
          ))}
          <li>
            <Link to="/how-to-buy">How To Buy</Link>
          </li>
          <li>
            <Link to="/giveaway">Win $999K</Link>
          </li>
          {/* <li>
            <Button />
          </li> */}
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
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                  handlerMobileNav();
                }}>
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.name}>
                <LinkSmooth
                  to={item.to}
                  spy={true}
                  offset={item.offset}
                  smooth={true}
                  duration={500}
                  onClick={handlerMobileNav}>
                  {item.name}
                </LinkSmooth>
              </li>
            ))}
            <li>
            <Link to="/how-to-buy">How To Buy</Link>
          </li>
          <li>
            <Link to="/giveaway">Win $999K</Link>
          </li>
            {/* <li>
              <Button />
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
