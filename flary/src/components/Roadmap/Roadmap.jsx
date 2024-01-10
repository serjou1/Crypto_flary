import React from 'react';
import style from './Roadmap.module.scss';

export const Roadmap = () => {
  return (
    <div className={style.Roadmap}>
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
      <div className={style.timeLine}>
        <div className={style.line}></div>
        <div className={style.tileLineBlok}>
          <div className={style.lineDotGreen}></div>
          <div className={style.lineTittle}>Stage 1</div>
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
          <div className={style.infoData}>
            <div className={style.dotGreen}></div>
            <div className={style.infoLine}>Team up</div>
          </div>
        </div>
        <div className={style.tileLineBlok}>
          <div className={style.lineDotYellow}></div>
          <div className={style.lineTittle}>Stage 2</div>
          <div className={style.infoData}>
            <div className={style.dotYellow }></div>
            <div className={style.infoLine}>Main functional development</div>
          </div>
          <div className={style.infoData}>
            <div className={style.dotYellow }></div>
            <div className={style.infoLine}>Main functional development</div>
          </div>
          <div className={style.infoData}>
            <div className={style.dotYellow }></div>
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
  );
};