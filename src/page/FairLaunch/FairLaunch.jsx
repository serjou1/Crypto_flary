import React from 'react';
import { Form, HeaderFairLaunch, Navbar, Timer } from '../../components';
import style from './FairLaunch.module.scss';

export const FairLaunch = () => {
  const example = [{ to: 'fairLaunch', offset: -150, name: 'FairLaunch' }];

  
  return (
    <>
      <Navbar nav={example} />
      <div className={style.Header}>
        <HeaderFairLaunch />
      </div>
      <Form />
    </>
  );
};
