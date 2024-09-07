import React from 'react';
import style from './Progress.module.scss';

export const Progress = ({ progress }) => {
  return (
    <div className={style.progress} >
      <p style={progress<=100?{ marginLeft: `${progress-2}%` }:{marginLeft:'95%'}}>{progress}%</p>
      <div className={style.progress_bar}>
        <div className={style.progress_thumb} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};