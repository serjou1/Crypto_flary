import React, { useState } from 'react';
import { Form, HeaderFairLaunch, Navbar } from '../../components';
import { Form2 } from '../../components/FairLaunch/Form/Form2';
import { Form3 } from '../../components/FairLaunch/Form/Form3';
import style from './FairLaunch.module.scss';

export const FairLaunch = () => {
  const [tab, setTab] = useState('Round 1');
  const example = [{ to: 'fairLaunch', offset: -150, name: 'FairLaunch' }];

  return (
    <>
      <Navbar nav={example} />
      <div className={style.Header}>
        <HeaderFairLaunch />
      </div>
      <div className={style.tab}>
        <button
          onClick={() => setTab('Round 1')}
          style={
            tab === 'Round 1'
              ? { background: 'linear-gradient(90deg, #ffa957, #ffd975)', color: '#000' }
              : {}
          }>
          Round 1
        </button>
        <button
          onClick={() => setTab('Round 2')}
          style={
            tab === 'Round 2'
              ? { background: 'linear-gradient(90deg, #ffa957, #ffd975)', color: '#000' }
              : {}
          }>
          Round 2
        </button>
        <button
          onClick={() => setTab('Round 3')}
          style={
            tab === 'Round 3'
              ? { background: 'linear-gradient(90deg, #ffa957, #ffd975)', color: '#000' }
              : {}
          }>
          Round 3
        </button>
      </div>
      <Form tab={tab} />
      <Form2 tab={tab} />
      <Form3 tab={tab} />
    </>
  );
};
