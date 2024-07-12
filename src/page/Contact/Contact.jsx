import React from 'react'
import style from './Contact.module.scss'
import { ContactForm, ContactInfo, Navbar } from '../../components'

export const Contact = () => {
  return (
    <>
    <Navbar nav={[]} />
    <div className={style.Contact}>
    <h1 className={style.header}>Contact Us</h1>
    <div className={style.content}>
        <ContactInfo/>
        <ContactForm/>
    </div>
    </div>
    </>
  )
}
