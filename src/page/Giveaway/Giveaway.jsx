import React from 'react'
import { Navbar } from '../../components'
import style from './Giveaway.module.scss'

export const Giveaway = () => {
  const example = [];
  return (
    <>
    <Navbar nav={example} />
    <div className={style.Giveaway}>
        <h1 className={style.header}>Win $999k With Flary Finance</h1>
        <div className={style.content_wrapper}>
          <h3>$999k Flary Finance Mega Giveaway</h3>
          <p>Participate in Flary Finance's Mega $999k Giveaway and stand a chance to be one of the 10 fortunate winners to claim $33,300 worth of Flary each! Enhance your winning prospects by sharing and participating. Complete all tasks to unlock additional bonus entries, increasing your odds of winning. Act now and participate to seize this opportunity!</p>
          <h4>
          NOTE: To be eligible, it's mandatory to have a minimum $100 participation in the Retik Finance Presale.
          </h4>
          <a href='\' className={style.button}>Open Competition in New Tab</a>
        </div>
        </div>
    </>
  )
}
