import React from 'react';
// components
import ValueInput, { ValueInputProps } from './valueInput';
import Calendar, { CalendarCombinedProps } from '../calendar/index';
// styles
import styles from './styles/hourly.module.scss';

export type HourlyControllerProps = {
    onSubmit: React.FormEventHandler;
} & ValueInputProps & CalendarCombinedProps;
const HourlyController: React.FC<HourlyControllerProps> = ({
    value,
    onChange,
    onDecrease,
    onIncrease,
    isCalendarOn,
    calendar,
    currentYear,
    currentMonth,
    currentItem,
    onToggle,
    onPrevMonth,
    onNextMonth,
    onCalendarItemClick,
    onSubmit
}) => <form
    className={styles.container}
    onSubmit={onSubmit}
>
    <p
        className={styles.description}
    >{currentItem.getMonth()+1}월 {currentItem.getDate()}일로부터 {value}시간 전까지 데이터</p>
    <ValueInput 
        value={value}
        onChange={onChange}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
    />
    <Calendar 
        isCalendarOn={isCalendarOn}
        calendar={calendar}
        currentYear={currentYear}
        currentMonth={currentMonth}
        currentItem={currentItem}
        onToggle={onToggle}
        onCalendarItemClick={onCalendarItemClick}
        onNextMonth={onNextMonth}
        onPrevMonth={onPrevMonth}
    />
</form>;

export default HourlyController;
