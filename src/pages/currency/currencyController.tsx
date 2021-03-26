import React from 'react';
import {
    withRouter,
    RouteComponentProps
} from 'react-router-dom';
// COMPONENTS
import DailyController from '../../components/controllers/daily';
import HourlyController from '../../components/controllers/hourly';
import MinuteController from '../../components/controllers/minute';
import Selector from '../../components/controllers/selector';
// hook
import useController from '../../hooks/page/currency/useController';
// styles
import styles from './styles/currency.module.scss';

type CurrencyControllerProps = {

} & RouteComponentProps<{ symbol: string }>
const CurrencyController: React.FC<CurrencyControllerProps> = ({
    match: {
        params: {
            symbol
        }
    }
}) => {
    const {
        dailyController,
        hourlyController,
        minuteController,
        timeType,
        setTimeType,
        request
    } = useController({
        symbol,
        initialDataTimeType: 'hourly'
    });
    return (
        <div
            className={styles.controllers}
        >
        <Selector 
            timeType={timeType}
            setTime={setTimeType}
        />
        {
            timeType === 'daily' &&
            <DailyController 
                {...dailyController}
                request={request}
            />
        }
        {
            timeType === 'hourly' && 
            <HourlyController 
                {...hourlyController}
                onCalendarItemClick={hourlyController.calendar.setDate}
                onNextMonth={hourlyController.calendar.nextMonth}
                onPrevMonth={hourlyController.calendar.prevMonth}
                calendar={hourlyController.calendar.currentCalendar}
                currentItem={hourlyController.calendar.currentDate}
                currentYear={hourlyController.calendar.currentYear}
                currentMonth={hourlyController.calendar.currentMonth}
                onToggle={hourlyController.toggleCalendar}
                value={hourlyController.hour}
                onSubmit={request}
            />
        }   
        {
            timeType === 'minute' &&
            <MinuteController 
                value={minuteController.minute}
                onSubmit={request}
                {...minuteController}
            />
        }
    </div>
    )
}

export default withRouter(CurrencyController);