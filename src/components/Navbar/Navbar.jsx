import React, { useState } from 'react';
import { Link as LinkSmooth } from 'react-scroll';
import logo from '../../assets/Flary Logo.png';
import style from './Navbar.module.scss';

import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ nav, navLink }) => {
  const params = useLocation().pathname.slice(1);

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
              style={params === '' ? { color: '#ffd975' } : {}}
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
          {navLink.map((item, i) => (
            // console.log(item.tittle.toLowerCase())
            <li key={i}>
              <Link to={item.link} style={params === item.id ? { color: '#ffd975' } : {}}>
                {item.tittle}
              </Link>
            </li>
          ))}

          <li>
            <Link to="/contact" style={params === 'contact' ? { color: '#ffd975' } : {}}>
              Contact Us
            </Link>
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
            {navLink.map((item, i) => (
              <li key={i}>
                <Link to={item.link}>{item.tittle}</Link>
              </li>
            ))}
            <li>
              <Link to="/contact">Contact Us</Link>
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
