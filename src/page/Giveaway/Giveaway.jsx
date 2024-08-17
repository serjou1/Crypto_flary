import React from 'react';
import { Navbar } from '../../components';
import style from './Giveaway.module.scss';

export const Giveaway = () => {
  const buttonContent = [
    { link: '/how-to-buy', tittle: 'How To Buy', id: 'how-to-buy' },
    { link: '/giveaway', tittle: 'Win $333K', id: 'giveaway' },
  ];
  return (
    <>
      <Navbar nav={[]} navLink={buttonContent} />
      <div className={style.Giveaway}>
        <h1 className={style.header}>Win $333k With Flary Finance</h1>
        <div className={style.content_wrapper}>
          <h3>$333k Flary Finance Mega Giveaway</h3>
          <p>
            Participate in Flary Finance's Mega $333k Giveaway and stand a chance to be one of the
            10 fortunate winners to claim a share of $333k worth of $FLFI! Enhance your winning
            prospects by sharing and participating. Complete all tasks to unlock additional bonus
            entries, increasing your odds of winning. Act now and participate to seize this
            opportunity!
          </p>
          <h4>
            NOTE: To be eligible, it's mandatory to have a minimum $100 participation in the Flary
            Finance Presale.
          </h4>
          <a
            class={style.button}
            href="https://gleam.io/49RhQ/win-333k-win-flaryfinance"
            rel="nofollow">
            Open competition in new tab
          </a>
          <iframe style={{width:'110%'}} src="https://gleam.io/49RhQ/win-333k-win-flaryfinance" allow='storage-access *; attribution-reporting *; autoplay *; fullscreen *' fullscreen='true'  title='FlaryGleam' allowfullscreen></iframe>

        </div>
      </div>
    </>
  );
};
