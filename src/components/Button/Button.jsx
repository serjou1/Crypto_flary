import React, { useContext, useState } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { AccountOverview } from '../AccountOverview/AccountOverview';
import style from './Button.module.scss';

export const Button = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { connectWallet, connectedAccount, balance} = useContext(TransactionContext);
  const button = 'Connect Wallet';
  const shortAddress = `${connectedAccount.slice(0, 5)}...${connectedAccount.slice(
    connectedAccount.length - 4,
  )}`;
  const nameButton ='Profile'

  const showOverview = () => {
    setOpenSideBar(!openSideBar)
  };
  
  return (
    <>
      <button
        className={style.button}
        style={{ marginTop: '0px' }}
        onClick={!connectedAccount ? connectWallet : showOverview}>
        {!connectedAccount ? `${button}` : `${nameButton}`}
      </button>
      <AccountOverview address={shortAddress} openSideBar={openSideBar} showOverview={()=>showOverview()} balance={balance} />
    </>
  );
};
