import React from 'react';
import { BiSolidError } from 'react-icons/bi';
import style from './Error.module.scss';

export const Error = ({ setError }) => {
  return (
    <div className={style.Error}>
      <BiSolidError size={35} color="rgba(255, 204, 0)" />
      <p>You don't have enough funds to complete the transaction.</p>
      <div onClick={() => setError(false)} className={style.button_error}>
        close
      </div>
    </div>
  );
};
