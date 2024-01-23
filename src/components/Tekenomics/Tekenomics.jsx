import { motion } from 'framer-motion';
import React from 'react';
import { Schedule } from '../Schedule/Schedule';
import style from './Tekenomics.module.scss';

import BgImage from '../../assets/bg-tekenomics.png';
const animation = {
  hidden: {
    opacity: 0,
    scale: 0.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const animationSupply = {
  hidden: {
    x: -200,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export const Tekenomics = () => {
  return (
    <div className={style.Tekenomics} id="tekenomics">
      <img src={BgImage} alt="BgImage" />
      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={animation}
        transition={{ duration: '0.5' }}
        viewport={{ once: true }}>
        Tokenomics
      </motion.p>
      <div className={style.tekenomicsInfo}>
        <div className={style.description}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={style.data}>
            <motion.div
              className={style.titleSchedule}
              variants={animation}
              transition={{ duration: '0.5' }}>
              Total supply:
            </motion.div>
            <div className={style.adapt}>
              <div>
                <motion.div variants={animationSupply} custom={1} className={style.infoData} >
                  <div className={style.dot} style={{background:'#6f29d1'}}></div>
                  <div className={style.info}>30% Public</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={2} className={style.infoData}>
                  <div className={style.dot} style={{background:'#36a3eb'}}></div>
                  <div className={style.info}>19% Staking&Liquidity rewards</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={3} className={style.infoData}>
                  <div className={style.dot} style={{background:'#e67e10'}}></div>
                  <div className={style.info}>15% Marketing/Treasury </div>
                </motion.div>
                <motion.div variants={animationSupply} custom={3} className={style.infoData}>
                  <div className={style.dot} style={{background:'#00c763'}}></div>
                  <div className={style.info}>12% Adv&Team </div>
                </motion.div>
              </div>
              <div>
                <motion.div variants={animationSupply} custom={4} className={style.infoData}>
                  <div className={style.dot} style={{background:'#ffcf56'}}></div>
                  <div className={style.info}>12% Community&Ecosystem</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={5} className={style.infoData}>
                  <div className={style.dot} style={{background:'#ff6456'}}></div>
                  <div className={style.info}>7% Liquidity</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={6} className={style.infoData}>
                  <div className={style.dot} style={{background:'#ff56c9'}}></div>
                  <div className={style.info}>5% Early invest</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className={style.schedule}>
          <Schedule />
        </div>
      </div>
    </div>
  );
};
