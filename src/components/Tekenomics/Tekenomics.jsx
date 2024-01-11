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
const animationSchedule = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
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
        transition={{ duration: '0.5' }}>
        Tokenomics
      </motion.p>
      <div className={style.tekenomicsInfo}>
        <div className={style.description}>
          <motion.div initial="hidden" whileInView="visible" className={style.data}>
            <motion.div
              className={style.titleSchedule}
              variants={animation}
              transition={{ duration: '0.5' }}>
              Total supply:
            </motion.div>
            <div className={style.adapt}>
              <div>
                <motion.div variants={animationSupply} custom={1} className={style.infoData}>
                  <div className={style.dot}></div>
                  <div className={style.info}>50% lorem</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={2} className={style.infoData}>
                  <div className={style.dot}></div>
                  <div className={style.info}>50% lorem</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={3} className={style.infoData}>
                  <div className={style.dot}></div>
                  <div className={style.info}>50% lorem</div>
                </motion.div>
              </div>
              <div>
                <motion.div variants={animationSupply} custom={4} className={style.infoData}>
                  <div className={style.dot}></div>
                  <div className={style.info}>50% lorem</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={5} className={style.infoData}>
                  <div className={style.dot}></div>
                  <div className={style.info}>50% lorem</div>
                </motion.div>
                <motion.div variants={animationSupply} custom={6} className={style.infoData}>
                  <div className={style.dot}></div>
                  <div className={style.info}>50% lorem</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={animationSchedule}
          transition={{ duration: '5.5' }}
          className={style.schedule}>
          <Schedule />
        </motion.div>
      </div>
    </div>
  );
};
