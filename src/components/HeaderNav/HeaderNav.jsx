import React from 'react';
import { Link } from 'react-router-dom';

import style from './HeaderNav.module.scss';

export const HeaderNav = () => {
  const buttonContent = [
    { link: '/how-to-buy', tittle: 'How To Buy' },
    { link: '/giveaway', tittle: 'Win $333K' },
  ];
  return (
    <div className={style.HeaderNav}>
      {buttonContent.map((content, i) => (
        <Link key={i} to={content.link} className={style.button}>
          <span>{content.tittle}</span>
          
        </Link>
      ))}
    </div>
  );
};
