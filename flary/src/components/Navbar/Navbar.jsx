import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/FLARY svg.png';
import { Select } from '../Select/Select';
import style from './Navbar.module.scss';

import {FaBars,FaTimes} from 'react-icons/fa'

export const Navbar = () => {
  const [mobileNav, SetMobileNav] = useState(false);

  const handlerMobileNav = () => {
    SetMobileNav(!mobileNav)
  };
  return (
    <div className={style.Navbar}>
      <div className={style.bgBlur}></div>
      <div className={style.flexbox}>
        <div className='logo'>
          <img src={logo} alt="" />
        </div>
        <ul className={style.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Fair Launch</Link>
          </li>
        </ul>
        <Select />
        <div className={style.left}>
          
          <div className={style.btn}>Connect Wallet</div>
        </div>
        <div className={style.mobile_button} onClick={handlerMobileNav}>
          {
            mobileNav?(<FaTimes size = {20} style ={{color:'#fff',cursor:'pointer'}}/>):(<FaBars size = {20} style ={{color:'#fff',cursor:'pointer'}}/>)
          }
        </div>

        <div className={mobileNav? style.mobile_open:style.mobile_close} >
        <ul className={style.mobile_list} onClick={handlerMobileNav}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Fair Launch</Link>
          </li>
        </ul>
        <div className=''>
          
          <div className={style.btn}>Connect Wallet</div>
        </div>
        </div>
      </div>
    </div>
  );
};
