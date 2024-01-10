import React from 'react';
import style from './AboutAs.module.scss';

import AboutAsImg from '../../assets/AboutAs.png';

export const AboutAs = () => {
  return (
    <div className={style.AboutAs}>
      <div className={style.block}>
        <div className={style.contentHelperImg}>
          <img src={AboutAsImg} alt="" />
        </div>
        <div className={style.content}>
          <div className={style.contentTitle}>About us - </div>
          <div className={style.contentText}>
            Founded by the team of great friends, we believe to be family with the whole community
            of ours. As a leading lending and borrowing platform Flary Finance do care about it’s
            family, and that’s why we are so eager to provide you with the most useful solutions,
            powerful services and technical advantages.
          </div>
        </div>
      </div>
      <div className={style.block}>
        <div className={style.content}>
          <div className={style.contentTitleLittle}>Problem </div>
          <div className={style.contentText}>
            <p>
              {' '}
              Today, in the prime of the crypto-era, many different networks and platforms exist. We
              know how annoying it could be what you constantly need to bridge and swap your tokens,
              loosing your time and paying commissions.
              <br />
              <br /> We also feel, how strongly you are proud of your actives, and how passionate
              you are about feeling the financial return of your efforts, especially at times when
              you need even more funds for the future investments.
            </p>
          </div>
        </div>
        <div className={style.contentHelper}>
          <h3>
            Get the <span>maximum</span> with Flary finance
          </h3>
        </div>
      </div>
      <div className={style.block}>
        <div className={style.contentHelper}>
          <h3>
            Get the <span>maximum</span> with Flary finance
          </h3>
        </div>
        <div className={style.content}>
          <div className={style.contentTitleSolution}>Solution</div>
          <div className={style.contentText}>
            <p>
              Flary helps you to cut the corners and solve these issues. Thanks to our technical
              developments, we make lending and borrowing actives based on different platforms
              possible, which is the game-changing feature in industry. <br />
              <br />
              Borrowing and earning is possible - Made full of care for our fellow cryptans,
              auto-staking feature helps you to earn additional rewards for staking actives you
              pledge in our system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
