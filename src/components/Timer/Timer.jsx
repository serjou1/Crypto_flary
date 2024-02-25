import React, { useEffect, useState } from 'react';
import style from './Timer.module.scss';
// import { differenceInMilliseconds, parseISO } from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz';



export const Timer = () => {
  const [time, setTime] = useState(new Date('2024-03-01T00:00:00')-new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' })));
  const [date, setDate] = useState({});
   

// // Установите целевую дату в формате UTC
// const targetDateUTC = parseISO('2024-03-01T00:00:00');

// // Преобразуйте текущую дату в формат UTC
// const currentDateUTC = new Date(Date.now()).toISOString();

// // Определите временную зону по вашему выбору
// const timeZone = 'Europe/Paris';

// // Преобразуйте текущую дату в формат времени с учетом временной зоны
// const currentDate = utcToZonedTime(currentDateUTC, timeZone);

// // Определите временную зону для целевой даты
// const targetDate = utcToZonedTime(targetDateUTC, timeZone);

// // Вычислите разницу в миллисекундах между текущим временем и целевой датой
// const timeRemainingMillis = differenceInMilliseconds(targetDate, currentDate);

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
    getFormatDate(time);
  }, [time]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const getFormatDate = (milliseconds) => {
    let total_seconds = parseInt(Math.floor(milliseconds / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));
    let total_hours = parseInt(Math.floor(total_minutes / 60));
    let days = parseInt(Math.floor(total_hours / 24));

    let seconds = parseInt(Math.floor(total_seconds % 60));
    let minutes = parseInt(Math.floor(total_minutes % 60));
    let hours = parseInt(Math.floor(total_hours % 24));
    return setDate({ days, hours, minutes, seconds });
  };
  return (
    <div className={style.Timer}>
      <p className={style.text_grey}>Left before the end of the fair launch</p>
      <div className={style.counter}>
        <div className={style.blockCounter}>
          {date.days >= 10 ? <p>{date.days}</p> : <p>0{date.days}</p>}
          <span className={style.text_grey}>D</span>
        </div>

        <span>:</span>
        <div className={style.blockCounter}>
          {date.hours >= 10 ? <p>{date.hours}</p> : <p>0{date.hours}</p>}
          <span className={style.text_grey}>H</span>
        </div>

        <span>:</span>
        <div className={style.blockCounter}>
          {date.minutes >= 10 ? <p>{date.minutes}</p> : <p>0{date.minutes}</p>}
          <span className={style.text_grey}>M</span>
        </div>

        <span>:</span>
        <div className={style.blockCounter}>
          {date.seconds >= 10 ? <p>{date.seconds}</p> : <p>0{date.seconds}</p>}
          <span className={style.text_grey}>S</span>
        </div>
      </div>
    </div>
  );
};
