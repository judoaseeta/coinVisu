import React from 'react';
// components
import CalendarComponent from '../calendar';
// hook returnTypes
import { ReturnTypeUseCalendar } from '../../hooks/useCalendar';
// styles
import styles from './styles/calendars.module.scss';

export interface DailyControllerProps {
    startCalendar: ReturnTypeUseCalendar;
    endCalendar: ReturnTypeUseCalendar;
    isStartCalendarOn: boolean;
    isEndCalendarOn: boolean;
    toggleStartCalendar: (toggle: boolean) => void;
    toggleEndCalendar: (toggle: boolean) => void;
    request: () => void;
    getDistances: () =>number;
}   
const DailyController: React.FC<DailyControllerProps> = ({
    startCalendar,
    endCalendar,
    isStartCalendarOn,
    isEndCalendarOn,
    toggleEndCalendar,
    toggleStartCalendar,
    request,
    getDistances
}) =>
<div
    className={styles.calendars}
>
    <div
        className={styles.wrapper}
    >
        <h3 className={styles.label}>챠트 시작일:</h3>
        <CalendarComponent 
            calendar={startCalendar.currentCalendar}
            isCalendarOn={isStartCalendarOn}
            currentItem={startCalendar.currentDate}
            currentMonth={startCalendar.currentMonth}
            currentYear={startCalendar.currentYear}
            onPrevMonth={startCalendar.prevMonth}
            onNextMonth={startCalendar.nextMonth}
            onCalendarItemClick={startCalendar.setDate}
            onToggle={toggleStartCalendar}
        />
    </div>
    <div className={styles.wrapper}>
        <button 
            className={styles.request}
            onClick={request}    
        >{getDistances()}일치 데이터 요청</button>
    </div>
    <div
        className={styles.wrapper}
    >
        <CalendarComponent 
            calendar={endCalendar.currentCalendar}
            isCalendarOn={isEndCalendarOn}
            currentItem={endCalendar.currentDate}
            currentMonth={endCalendar.currentMonth}
            currentYear={endCalendar.currentYear}
            onPrevMonth={endCalendar.prevMonth}
            onNextMonth={endCalendar.nextMonth}
            onCalendarItemClick={endCalendar.setDate}
            onToggle={toggleEndCalendar}
        />
        <h3 className={styles.label}>:챠트 종료일</h3>
    </div>
</div>;

export default DailyController;
