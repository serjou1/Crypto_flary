import React from 'react'
import { Link } from 'react-router-dom'

import style from'./Header.module.scss'
import HeaderImage from '../../assets/Heder.png'


export const Header = () => {
  return (
    <div className={style.Header} id='hero'>
        <div className={style.description}>
            <h1>The First Lending & Borrowing platform that really cares about you</h1>
            <p>First of all, Flary finance Is an innovative project, offering completely new solutions to its customers. We take care of all the crucial infrastructure and services that called to rise profitability, beat commissions, and assure smooth experience for all those, who are ready to develop and not afraid of making a real fire.</p>
            <div className={style.btn}>
                <Link to=''>Launch App</Link>
            </div>

        </div>
        <div className={style.img}>
            <img src={HeaderImage} alt="" />
        </div>

    </div>
  )
}
