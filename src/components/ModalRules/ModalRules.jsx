import React from 'react';

import { IoMdClose } from 'react-icons/io';
import style from './ModalRules.module.scss';

export const ModalRules = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className={style.modal}>
          <div className={style.modal_wrapper}>
            <div className={style.modal_content}>
              <button onClick={() => onClose()} className={style.close_button}>
                <IoMdClose size={24} />
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
