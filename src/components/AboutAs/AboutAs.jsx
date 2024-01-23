import { motion } from 'framer-motion';

import style from './AboutAs.module.scss';

import AboutAsImg from '../../assets/AboutAs.png';
import BgBlik from '../../assets/bg_blik.png';

const animation = {
  hidden: {
    scale: 1.4,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

export const AboutAs = () => {
  return (
    <div className={style.AboutAs} id="about">
      <motion.div
        className={style.block}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>
        <motion.div
          variants={animation}
          transition={{ duration: '1' }}
          className={style.contentHelperImg}>
          <img src={AboutAsImg} alt="AboutAsImg" />
        </motion.div>
        <motion.div variants={animation} transition={{ duration: '2' }} className={style.content}>
          <div className={style.contentTitle}>One platform - multiple solution </div>
          <div className={style.contentText}>
            Built by a team of professionals, we know how to satisfy the most demanding users. As
            the leading cross-chain lending platform, Flary Finance has developed an advanced
            protocol that supports a wide range of networks and tokens. Yielding, lending, borrowing
            and bridging all in one place, Flary is the ultimate aggregator.
          </div>
        </motion.div>
        <div className={style.containerBlik}>
          <img className={style.bgBlik} src={BgBlik} alt="" />
        </div>
      </motion.div>
      <section className={style.netBackground}>
        <motion.div
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          className={style.block}>
          <motion.div variants={animation} transition={{ duration: '2' }} className={style.content}>
            <div className={style.contentTitleLittle}>Problem </div>
            <div className={style.contentText}>
              <p>
                {' '}
                Today, in the prime of the crypto-era and volatile bull market, there is a great
                need to increase the mobility of your assets so as not to lose the best
                opportunities.
                <br />
                <br /> Imagine a scenario where you need USDT tokens on the ERC-20 network urgently
                to participate in some promising event, but you only have bitcoin Inscriptions that
                you are bullish on and wouldn’t like to sell, what would you do?
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={animation}
            transition={{ duration: '2' }}
            className={style.contentHelper}>
            <span className={style.numSpan}>01</span>
            <h3>
              Get the <span className={style.textSpan}>maximum</span> with Flary finance
            </h3>
          </motion.div>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          className={style.block}>
          <motion.div
            variants={animation}
            transition={{ duration: '2' }}
            className={style.contentHelper}>
            <span className={style.numSpan}>02</span>
            <h3>
              We work to <span className={style.textSpan}>make</span> your life easier
            </h3>
          </motion.div>
          <motion.div variants={animation} transition={{ duration: '2' }} className={style.content}>
            <div className={style.contentTitleSolution}>Solution</div>
            <div className={style.contentText}>
              <p>
              Flary Finance is innovatively designed to tackle such complex tasks as lending assets from one network while borrowing on completely another one. Our unique developments allow us to combine advanced lending & borrowing protocol with cross-chain bridges enhanced by yielding solutions. Great liquidity, low commissions, and absolute flexibility. All in one place. All for your convenience. All is Flary.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
