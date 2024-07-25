import React from 'react';

import Marquee from 'react-fast-marquee';
import Featuret1 from '../../assets/Featured/60106d0b3fb5ed2f78de2ed1_decrypt-wordmark.png';
import Featuret2 from '../../assets/Featured/6347044b139a26c3204c84d4_image14.png'
import Featuret3 from '../../assets/Featured/BozKWqDFxuBSpMRmcNPALViwfyXqWiHN6lRZAYZo.png'
import Featuret4 from '../../assets/Featured/CoinPedia-Logo.png'
import Featuret5 from '../../assets/Featured/Coinmarketcap_svg_logo.svg.png'
import Featuret6 from '../../assets/Featured/Cointelegraph.webp'
import Featuret7 from '../../assets/Featured/The_Financial_Express_logo.png'
import Featuret8 from '../../assets/Featured/beincrypto_the_latest_high_quality_blockchain_and_cryptocurrency.png'
import Featuret9 from '../../assets/Featured/coinsniper.png'
import Featuret10 from '../../assets/Featured/png_clipart_logo_investing_com_product_brand_investment_logo_investingcom.png'
import Featuret11 from '../../assets/Featured/png_transparent_forbes_chief_executive_united_states_logo_art_director.png'

import { Animate } from '../Header/Animate';
import style from './Tiker.module.scss';

export const Tiker = () => {
  return (
    <div className={style.Tiker}>
      <Animate custom={1}>
        <h1>Featured In</h1>
      </Animate>

      <div className={style.ticker}>
        <Marquee gradient={true} gradientColor='black'>
          <div className={style.ticker_wrapper}>
            <img src={Featuret1} alt="" />
            
            
            <img src={Featuret4} alt="" style={{width:'270px',height:'150px'}} />
            <img src={Featuret5} alt=""  style={{width:'270px',height:'100px'}}/>
            <img src={Featuret6} alt="" style={{width:'265px',height:'80px'}} />
            <img src={Featuret7} alt="" style={{width:'465px',height:'70px'}}/>
            <img src={Featuret9} alt="" style={{width:'265px',height:'70px'}}/>
            
          </div>
        </Marquee>
      </div>
    </div>
  );
};
