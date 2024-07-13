import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import style from './ContactForm.module.scss';

export const ContactForm = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_uhw8slr",
        "template_5omh1yw",
        form.current,
        "gaWz-pkJdZjnKYvxA",
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    e.target.reset();
  };

  const animation = {
    hidden: {
      x: 75,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <motion.form
    ref={form}
    onSubmit={sendEmail}
      className={style.ContactForm}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      <motion.div
        className={style.entreated}
        variants={animation}
        transition={{ duration: '1', delay: 0.25 }}>
        <input type="text" required name="name" />
        <div className={style.labelLine}>Enter you name</div>
      </motion.div>
      <motion.div className={style.entreated} variants={animation}
        transition={{ duration: '1', delay: 0.5 }}>
        <input type="email" required name="email" />
        <div className={style.labelLine}>Enter you email</div>
      </motion.div>
      <motion.div className={style.entreated} variants={animation}
        transition={{ duration: '1', delay: 0.75 }}>
        <textarea rows="2" type="text" required name="message_new"/>
        <div className={style.labelLine}>Enter you massage...</div>
      </motion.div>
      <motion.button type="submit" variants={animation}
        transition={{ duration: '1', delay: 0.75 }}> Send Message</motion.button>
    </motion.form>
  );
};
