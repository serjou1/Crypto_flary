import React from 'react';

import Marquee from 'react-fast-marquee';
import Featuret1 from '../../assets/Featured/60106d0b3fb5ed2f78de2ed1_decrypt-wordmark.png';
import Featuret2 from '../../assets/Featured/6347044b139a26c3204c84d4_image14.png'
import Featuret3 from '../../assets/Featured/BozKWqDFxuBSpMRmcNPALViwfyXqWiHN6lRZAYZo.png'
import Featuret4 from '../../assets/Featured/CoinPedia-Logo.png'
import Featuret5 from '../../assets/Featured/Coinmarketcap_svg_logo.svg.png'
import Featuret6 from '../../assets/Featured/Cointelegraph.webp'
import Featuret7 from '../../assets/Featured/The_Financial_Express_logo.png'
import Featuret8 from '../../assets/Featured/forbes-seeklogo.com (1).svg'
import Featuret9 from '../../assets/Featured/coinsniper.png'
import Featuret10 from '../../assets/Featured/CoinGApe.png'
import Featuret11 from '../../assets/Featured/crypto-news-flash-logo-2x.webp'

import { Animate } from '../Header/Animate';
import style from './Tiker.module.scss';

export const Tiker = () => {
  return (
    <div className={style.Tiker}>
      <Animate custom={1}>
        <h1>Featured In</h1>
      </Animate>

      <div className={style.ticker}>
        <Marquee gradient={true} gradientColor='#05090f'>
          <div className={style.ticker_wrapper}>
            <img src={Featuret1} alt=""  style={{width:'300px'}} />
            
            
            <img src={Featuret4} alt="" style={{width:'270px',height:'190px'}} />
           
            <img src={Featuret6} alt="" style={{width:'265px',height:'80px'}} />
            <img src={Featuret7} alt="" style={{width:'465px',height:'70px'}}/>
            <img src={Featuret9} alt="" style={{width:'380px',height:'70px'}}/>
            <img src={Featuret10} alt=""  style={{height:'70px',width:'315px'}} />
            <img src={Featuret11} alt=""  style={{height:'70px',width:'246px'}} />
            <img src={Featuret8} alt=""  style={{height:'70px',width:'246px'}} />
            
          </div>
        </Marquee>
      </div>
    </div>
  );
};
