import React, { useContext } from 'react'
import { TransactionContext } from '../../context/TransacionContext'
import style from './Button.module.scss'

export const Button = () => {
    const {connectWallet,connectedAccount} =useContext(TransactionContext)
    const button = 'Connect Wallet'
    const shortAddress = `${connectedAccount.slice(0,5)}...${connectedAccount.slice(connectedAccount.length - 4)}`
  return (
    
    <button className={style.button} onClick={connectWallet}>{!connectedAccount ? `${button}`:`${shortAddress}`}</button>
  )
}
