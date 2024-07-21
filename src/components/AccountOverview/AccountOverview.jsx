import React from 'react'
import style from './AccountOverview.module.scss'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export const AccountOverview = () => {
  return (
    <div className={style.AccountOverview}>
        <div className={style.arrowClose}><MdKeyboardDoubleArrowRight size={40} /></div>
        <div className={style.contentOverview}></div>
    </div>
  )
}
