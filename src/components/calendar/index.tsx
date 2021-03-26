import React, {
    useCallback,
    useEffect,
    useRef,
} from 'react';
// components
import CalendarNav, { CalendarNavProps} from './calendarNav';
import CalendarComponent, { CalendarProps } from './calendar';
// styles
import classnames from 'classnames/bind';
import styles from './styles/calendar.module.scss';

const cx = classnames.bind(styles);

export type CalendarCombinedProps =  {
    isCalendarOn: boolean;
} & CalendarNavProps & CalendarProps;


const Calendar: React.FC<CalendarCombinedProps> = ({
    calendar,
    currentItem,
    currentMonth,
    currentYear,
    isCalendarOn,
    onCalendarItemClick,
    onToggle,
    onPrevMonth,
    onNextMonth
}) => {

    const ref = useRef<HTMLDivElement| null> (null);

    const onClick = useCallback((e: MouseEvent) => {
        const container = ref.current;
        if(container && isCalendarOn) {
            // arrow buttons of calendarNav;
            const nonClickable = Array.from(container.querySelectorAll('span, h2'));
            if(!nonClickable.find( ele => ele === e.target)) {
                onToggle(false);
            }
        }
    },[
        onToggle,
        isCalendarOn,
        ref
    ]);
    useEffect(() => {
        window.addEventListener('click', onClick, true);
        return () => {
            window.removeEventListener('click',onClick,true);
        }
    },[
        onClick
    ]);
    return (
        <div
            className={cx('container')}
        >
            <CalendarNav 
                currentItem={currentItem}
                currentMonth={currentMonth}
                currentYear={currentYear}
                isCalendarOn={isCalendarOn}
                onToggle={onToggle}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
                ref={ref}
            />
            <div
                className={cx('hiddenContainer', {
                    on: isCalendarOn
                })}
            >
                <CalendarComponent 
                    calendar={calendar}
                    currentItem={currentItem}
                    currentMonth={currentMonth}
                    onCalendarItemClick={onCalendarItemClick}
                />
            </div>
        </div>
    )
};

export default Calendar;
