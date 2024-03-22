import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const checkIfWalletIsConnected = async () => {
    try {;
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    // const balance = await ethereum.request({
    //   method: 'eth_getBalance',
    //   params: [accounts[0], 'latest'],
    // });
    
   
    if (accounts.length) { 
      setConnectedAccount(accounts[0]);
      getBalance(accounts[0])
    }else{
      console.log('No Accounts Available')
    }
      
    } catch (error) {
      console.log(error);
    }
    
  };
  const getBalance = async (account)=>{
    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [account, 'latest'],
    })
    setBalance(ethers.formatEther(balance));
  }
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      getBalance(accounts[0])
      setConnectedAccount(accounts[0]);
    } catch (error) {
      throw new Error('No ethereum object.');
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider value={{ connectWallet, connectedAccount, balance }}>
      {children}
    </TransactionContext.Provider>
  );
};
