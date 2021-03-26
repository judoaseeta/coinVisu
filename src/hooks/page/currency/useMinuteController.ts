import { 
    useCallback,
    useState,
} from 'react';

const UseMinuteController = (startValue: number, maxValue: number) => {
    const [ minute, setMinute ] = useState(startValue);
    const onDecrease:React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault();
        if(minute > 0 ) {
            setMinute(minute-1);
        }
    },[
        minute
    ]);
    const onIncrease:React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault();
        if(minute < maxValue ) {
            setMinute(minute+1);
        }
    },[
        minute,
        maxValue
    ]);
    const onChange:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        e.preventDefault();
        const value = e.target.value;
        const numbered = Number(value);
        if(value === '' || numbered <= maxValue ) {
            setMinute(numbered);
        }
    },[
        maxValue,
    ]);
    return {
        onChange,
        onIncrease,
        onDecrease,
        minute
    }
}

export default UseMinuteController;
