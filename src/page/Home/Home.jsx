import React from 'react'
import { AboutAs, Header, Roadmap, Tekenomics } from '../../components'

import style from './Home.module.scss'

export const Home = () => {
  return (
    <div className={style.Home}>
    <Header/>
    <AboutAs/>
    <Tekenomics/>
    <Roadmap/>
    </div>
  )
}
