import React, { useEffect } from 'react';
import { AboutAs, AdditionalFeatures, Blocks, Header, Navbar, Roadmap, Tekenomics, Tiker, TokenInfo } from '../../components';

import style from './Home.module.scss';

export const Home = () => {
  const navLink = [
    { link: '/how-to-buy', tittle: 'How To Buy',id: 'how-to-buy'},
    { link: '/giveaway', tittle: 'Win $333K',id: 'giveaway'},
  ];
  useEffect(()=>{
    window.scrollTo({
      top: 0,
    })
  })
  return (
    <>
      <Navbar  navLink={navLink} />
      <div className={style.Home}>
        <Header />
        {/* <Tiker/> */}
        <Blocks/>
        <AboutAs />
        <AdditionalFeatures/>
        <TokenInfo/>
        <Tekenomics />
        <Roadmap />
      </div>
    </>
  );
};
