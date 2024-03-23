import React from 'react';

import { IoMdClose } from 'react-icons/io';
import style from './ModalRules.module.scss';

export const ModalRules = ({ isOpen, onClose, children, title }) => {
  return (
    <>
      {isOpen && (
        <div className={style.modal} onClick={() => onClose()}>
          <div className={style.modal_wrapper} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onClose()} className={style.close_button}>
              <IoMdClose size={24} />
            </button>
            {title}
            <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
