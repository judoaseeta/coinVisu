import { 
    useCallback,
    useState
} from 'react';
import useCalendar from '../../useCalendar';

const UseHourlyController = (startValue: number = 10, maxValue: number = 200) => {

    const [ isCalendarOn, setIsCalendarOn] = useState(false);
    const toggleCalendar = useCallback((toggle: boolean) => {
        setIsCalendarOn( toggle);
    },[]);
    const calendar = useCalendar({
        notUseAfterToday: true
    });

    const [ hour, setHour ] = useState(startValue);
    const onDecrease:React.MouseEventHandler = useCallback((e) => {
        e.preventDefault();
        if(hour > 0 ) {
            setHour(hour-1);
        }
    },[
        hour
    ]);
    const onIncrease:React.MouseEventHandler= useCallback((e) => {
        e.preventDefault();
        if(hour < maxValue ) {
            setHour(hour+1);
        }
    },[
        hour,
        maxValue
    ]);
    const onChange:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        e.preventDefault();
        const value = e.target.value;
        const numbered = Number(value);
        if(value === '' || numbered <= maxValue ) {
            setHour(numbered);
        }
    },[
        maxValue
    ]);
    return {
        isCalendarOn,
        toggleCalendar,
        onChange,
        onDecrease,
        onIncrease,
        calendar,
        hour,
        maxValue
    }
}

export default UseHourlyController;
