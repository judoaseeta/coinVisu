import {
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useDispatch } from 'react-redux';
// sub hooks
import UseDailyController from './useDailyController';
import UseHourlyController from './useHourlyController';
import UseMinuteController from './useMinuteController';

// entity
import { 
    HistoDataTimeType
} from '../../../entities/cryptoData';
// action
import { requestHistoData } from '../../../state/actions';
interface UseControllerProps {
    initialDataTimeType: HistoDataTimeType
    symbol: string;
}
const UseController = ({
    initialDataTimeType,
    symbol,
}: UseControllerProps) => {
    const dispatch = useDispatch();

    // dataTimeType,
    const [ timeType, setTimeType ] = useState<HistoDataTimeType>(initialDataTimeType);

    // Daily Controller
    const dailyController = UseDailyController({
        startDays: 50,
        limit: 500
    });
    // Hourly Controller 
    const hourlyController = UseHourlyController(50, 500);
    // Minute Controller
    const minuteController = UseMinuteController(50,500);
    // memos for variables of requestHistoData
    // timestamps for api request by each time-type
    const tots = useMemo(() => {
        if(timeType === 'daily') {
            // 크립토 컴페어 api특성때문에 12시간을 더해줘야함.
            const tt = dailyController.endCalendar.currentDate.getTime() + (12 * 60 * 60000);
            return Math.floor(tt / 1000);
        } else if(timeType === 'hourly') {
            return Math.floor(hourlyController.calendar.currentDate.getTime() / 1000);
        } else {
            return Math.floor(new Date().getTime()/ 1000);
        }
    },[
        dailyController.endCalendar.currentDate,
        hourlyController.calendar.currentDate,
        timeType
    ]);
    const limit = useMemo(() => {
        if(timeType === 'daily') {
            return dailyController.getDistances() -1;
        } else if (timeType === 'hourly') {
            return hourlyController.hour - 1;
        } else {
            return minuteController.minute - 1;
        }
    },[
        dailyController,
        hourlyController.hour,
        minuteController.minute,
        timeType
    ]);
    const request = useCallback((e?: FormEvent) => {
        if(e) {
            e.preventDefault();
        }
        dispatch(requestHistoData(symbol, tots,limit,timeType));
    },[
        dispatch,
        timeType,
        symbol,
        tots,
        limit,
    ]);
    // request initial histoDatas;
    useEffect(() => {
        request();
    },[ 
        symbol,
    ]);
    return {
        dailyController,
        minuteController,
        hourlyController,
        timeType,
        request,
        setTimeType
    }
}

export default UseController;