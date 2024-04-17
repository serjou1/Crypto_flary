import React, { useContext, useState } from 'react';

import ETH from '../../../assets/ETH.svg';
import { TransactionContext } from '../../../context/TransactionContext';
import { Timer } from '../../Timer/Timer';
import { Progress } from '../Progress/Progress';
import style from './Form.module.scss';
import { Loader } from './Loader';

export const Form = ({ tab }) => {
  const [time, setTime] = useState(
    new Date('2024-04-23T00:00:00') -
      new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' })),
  );

  const { balance } = useContext(TransactionContext);
  const [riseValue, setRiseValue] = useState(0);

  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const curs = 1000;
  const totalValue = 800000;
  const currentBalance = parseFloat(balance).toFixed(3);

  const handleClick = () => {
    if (inputValue > 0) {
      const progressInPercent = ((parseFloat(inputValue) * curs) / totalValue) * 100;
      setRiseValue((prevRiseValue) => prevRiseValue + parseFloat(inputValue));
      setProgress((prevProgress) => prevProgress + progressInPercent);
      setInputValue('');
    } else {
      alert('Please enter value more than 0');
      setInputValue('');
    }
  };
  const handleKeyPress = (event) => {
    const charCode = event.which || event.keyCode;

    // Разрешаем ввод только цифр и точки
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={style.Form}
      style={tab === 'Round 1' ? { display: 'block' } : { display: 'none' }}
      id="fairLaunch">
      <div className={style.header}>
        <div className={style.totalValue}>
          <Timer time={time} setTime={setTime} />
        </div>
        <div className={style.balance}>
          <div className={style.borderRight}>
            <div className={style.icon}>
              <img src={ETH} alt="Eth" />
            </div>

            <div className={style.value}>{riseValue.toFixed(3)}</div>
            <p>Raised (Quantity of ETH)</p>
          </div>
          <div className={style.borderLeft}>
            <div className={style.value}>800,000</div>
            <p>Total value ($)</p>
          </div>
        </div>
      </div>
      <Progress progress={progress.toFixed(2)} />
      <div className={style.formStyle}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <p>Deposit</p>
          </div>
          <div className={style.infoRight}>
            <p>Balance: {!balance ? 0 : `${currentBalance}`} ETH</p>
          </div>
        </div>
        <div className={style.input_container}>
          <input
            type="text"
            value={inputValue}
            placeholder="0"
            onKeyPress={handleKeyPress}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p>ETH</p>
        </div>
        <div className={style.valueBlock}>
          <p onClick={() => setInputValue(1)}>1 ETH</p>
          <p onClick={() => setInputValue(3)}>3 ETH</p>
          <p onClick={() => setInputValue(5)}>5 ETH</p>
        </div>
        {false ? (
          <Loader />
        ) : (
          <div
            className={style.btn}
            onClick={handleClick}
            style={
              time <= 0
                ? { opacity: '0.3', pointerEvents: 'none', cursor: 'not-allowed' }
                : { opacity: '1' }
            }>
            <div className={style.button}>Donate</div>
          </div>
        )}
      </div>
    </div>
  );
};
