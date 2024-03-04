import React from 'react'
import style from './PrivacyPolicy.module.scss'
import { Navbar } from '../../components'

export const PrivacyPolicy = () => {
    const example = [{ to: 'PrivacyPolicy', offset: -150, name: 'Privacy policy' }];
  return (
    <>
    <Navbar nav = {example}/>
    <div className={style.PrivacyPolicy}>PrivacyPolicy</div>
    </>
  )
}
