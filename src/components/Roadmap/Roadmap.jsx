import { motion } from 'framer-motion';
import React from 'react';
import style from './Roadmap.module.scss';
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

export const Roadmap = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={animation}
      transition={{ duration: '1' }}
      viewport={{amount:0.2,once:true}}
      className={style.Roadmap}
      id="roadmap">
      <div className="tittle">Roadmap</div>
      <div className={style.littleTittle}>
        <div className={style.infoData}>
          <div className={style.dotGreen}></div>
          <div className={style.info}>Done</div>
        </div>
        <div className={style.infoData}>
          <div className={style.dotYellow}></div>
          <div className={style.info}>In progress</div>
        </div>
        <div className={style.infoData}>
          <div className={style.dotWhite}></div>
          <div className={style.info}>Upcoming</div>
        </div>
      </div>
      <div className={style.response}>
        <div className={style.timeLine}>
          <div className={style.line}></div>
          <div className={style.tileLineBlok}>
            <div className={style.lineDotGreen}></div>
            <div className={style.lineTittle}>Stage 1</div>
            <div className={style.infoData}>
              <div className={style.dotGreen}></div>
              <div className={style.infoLine}>Team up hhhhhhh</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotGreen}></div>
              <div className={style.infoLine}>Team up</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotGreen}></div>
              <div className={style.infoLine}>Team up</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotGreen}></div>
              <div className={style.infoLine}>Team up</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotGreen}></div>
              <div className={style.infoLine}>Team up</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotGreen}></div>
              <div className={style.infoLine}>Team up</div>
            </div>
          </div>
          <div className={style.tileLineBlok}>
            <div className={style.lineDotYellow}></div>
            <div className={style.lineTittle}>Stage 2</div>
            <div className={style.infoData}>
              <div className={style.dotYellow}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotYellow}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotYellow}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotWhite}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
          </div>
          <div className={style.tileLineBlok}>
            <div className={style.lineDotWhite}></div>
            <div className={style.lineTittle}>Stage 3</div>
            <div className={style.infoData}>
              <div className={style.dotWhite}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotWhite}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotWhite}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotWhite}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
            <div className={style.infoData}>
              <div className={style.dotWhite}></div>
              <div className={style.infoLine}>Main functional development</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
