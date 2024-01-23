import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

import HeaderImage from '../../assets/Heder.png';
import style from './Header.module.scss';

const animation = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom * 0.2, duration: custom * 1.5 },
  }),
};

export const Header = () => {
  return (
    <div className={style.Header} id="hero">
      <motion.div
        id="hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={style.description}>
        <motion.h1 custom={1} variants={animation}>
        The First Cross-Chain Lending & Borrowing platform that really cares about you
        </motion.h1>
        <motion.p custom={2} variants={animation}>
        Flary Finance is an innovative cross-chain lending platform focused on the bitcoin space, including BRC20 and Inscriptions, which provides its users with brand new solutions and services designed to greatly simplify cross-chain transactions and help distribute liquidity across different networks
        </motion.p>
        <motion.div custom={3} variants={animation} className={style.btn}>
          <Link to="">Launch App</Link>
        </motion.div>
      </motion.div>

      <div className={style.img}>
        <img
          src={HeaderImage}
          alt="HeaderImage"
          // variants={animationImg}
          // transition={{ duration: '1' }}
        />
      </div>
    </div>
  );
};
