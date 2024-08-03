import React, { useEffect } from 'react';
import { AboutAs, Blocks, Header, Navbar, Roadmap, Tekenomics, Tiker, TokenInfo } from '../../components';

import style from './Home.module.scss';

export const Home = () => {
  const example = [
    { to: 'about', offset: -150, name: 'About Us' },
    { to: 'tekenomics', offset: -150, name: 'Tokenomics' },
    { to: 'roadmap', offset: -200, name: 'Roadmap' },
  ];
  useEffect(()=>{
    window.scrollTo({
      top: 0,
    })
  })
  return (
    <>
      <Navbar nav={example} navLink={[]} />
      <div className={style.Home}>
        <Header />
        {/* <Tiker/> */}
        <Blocks/>
        <AboutAs />
        <TokenInfo/>
        <Tekenomics />
        <Roadmap />
      </div>
    </>
  );
};
