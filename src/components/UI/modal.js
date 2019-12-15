import React from 'react';
import { IoIosClose } from 'react-icons/io';
import classes from './modal.module.scss';
const Modal = props =>
  !props.dismiss && (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <p>{props.children}</p>{' '}
        <span onClick={props.close}>
          <IoIosClose className={classes.modal__icon} />
        </span>
        {props.btnstate && (
          <button onClick={props.restockstate} className={classes.modal__btn}>
            {props.btnInfo}
          </button>
        )}
      </div>
    </div>
  );

export default Modal;
