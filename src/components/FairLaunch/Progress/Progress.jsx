import React from 'react'
import style from './Progress.module.scss'

export const Progress = ({progress}) => {
  return (
    <div className={style.progress}>
            <div className={style.progress_bar}>
                <div className={style.progress_thumb} style={{width:`${progress}%`}}></div>
            </div>
            <p >{progress}%</p>
        </div>
  )
}
