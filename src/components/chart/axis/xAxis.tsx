import React from 'react';

import { 
    xAxisTick,
    xAxisProps,
} from '../types';

//styles
import classnames from 'classnames/bind';
import styles from '../styles/axis.module.scss';
const cx = classnames.bind(styles);

const dateValue = (date: Date) => 
`${date.getMonth() + 1}월 ${date.getDate()}일`;


const XAxis: React.FC<xAxisProps> = ({
    bandScale,
    timeType,
    x,
    y
}) => {
    const ticks: xAxisTick[] = React.useMemo(() => {
        return bandScale.domain().map( (item,index,arr) => {
            if(timeType === 'daily') {
                const date = item.getDate();
                const prevYear = index > 0 ? arr[index - 1].getFullYear() : item.getFullYear();
                const currentYear = item.getFullYear();
                if(prevYear !== currentYear) {
                    return {
                        value: `${String(currentYear).slice(2)}년 ${String(item.getMonth() + 1)}월`,
                        xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                        type: 'year'
                    }
                } else if(date === 1) {
                    return {
                        value: String(item.getMonth() + 1) + '월',
                        xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                        type: 'month'
                    }
                } else {
                    return {
                        value: dateValue(item),
                        xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                        type: 'normal'
                    }
                }
            } else if(timeType ==='hourly') {
                const prevMonth = index > 0 ? arr[index-1].getMonth() : item.getMonth();
                const prevDate = index > 0 ? arr[index-1].getDate() : item.getDate();
                const thisMonth = item.getMonth();
                const thisDate = item.getDate();
                if(prevMonth !== thisMonth) {
                    return {
                        value: `${String(item.getFullYear()).slice(2)}년 ${String(item.getMonth() + 1)}월`,
                        xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                        type: 'month'
                    }
                }
                else if(prevDate !== thisDate) {

                    if(bandScale.domain().length >= 400 && thisDate % 2 !== 0) {
                        return {
                            value: `${String(item.getMonth() + 1)}월 ${String(thisDate)}일`,
                            xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                            type: 'day'
                        }
                    } else if (bandScale.domain().length >= 400 && thisDate % 2 === 0) {
                        return {
                            value: ``,
                            xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                            type: 'day'
                        }
                    } else if(bandScale.domain().length < 400 ) {
                        return {
                            value: `${String(item.getMonth() + 1)}월 ${String(thisDate)}일`,
                            xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                            type: 'day'
                        }
                    } else {
                        return {
                            value: dateValue(item),
                            xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                            type: 'normal'
                        }
                    }
                } else {
                    return {
                        value: dateValue(item),
                        xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                        type: 'normal'
                    }
                }
            } else {
                const prevDate = index > 0 ? arr[index-1].getDate() : item.getDate();
                const thisDate = item.getDate();
                const prevHour = index > 0 ?  arr[index-1].getHours() : item.getHours();
                const thisHour = item.getHours();
                if(prevDate !== thisDate) {
                    return {
                        value: String(thisDate) + '일',
                        xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                        type: 'day'
                    }
                } else if(prevHour !== thisHour) {
                    return {
                        value: String(thisHour) + '시',
                        xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                        type: 'hour'
                    }
                } else {
                    return {
                        value: dateValue(item),
                        xPos: bandScale(item)! + (bandScale.bandwidth() / 2),
                        type: 'normal'
                    }
                }
            }
        })
    },[
        bandScale,
        timeType
    ]);
    return (
        <g
            transform={`translate(${x},${y})`}
        >
            <line 
                x1={bandScale.range()[0]}
                x2={bandScale.range()[1]}
                y1={0}
                y2={0}
                stroke="#192a56"
            />
            {
                ticks.map(({value, xPos,type },i) => {
                    if(timeType === 'daily') {
                        if(
                            type === 'month'|| 
                            type === 'year') {
                            return <g
                                key={`x_tick_${value}_${i}`}
                                transform={`translate(${xPos},0)`}
                            >
                                <line 
                                    y2={type === 'year' ? 10 : 7}
                                    stroke="#c23616"
                                    strokeWidth={2}
                                />
                                <text
                                    className={cx('xAxisText',{
                                        tier1: type === 'year',
                                        tier2: type === 'month'
                                    })}
                                    key={value}
                                    y={type === 'year' ? 20 : 16}
                                >{value}</text>
                            </g>
                        }
                    } else if (timeType === 'hourly') {
                        if( type === 'month'|| type === 'day') {
                            return <g
                                key={`x_tick_${value}_${i}`}
                                transform={`translate(${xPos},0)`}
                            >
                                <line 
                                    y2={type === 'month' ? 10 : 7}
                                    stroke="#c23616"
                                    strokeWidth={2}
                                />
                                <text
                                    className={cx('xAxisText',{
                                        tier1: type === 'month',
                                        tier2: type === 'day'
                                    })}
                                    key={value}
                                    y={type === 'month' ? 20 : 16}
                                >{value}</text>
                            </g>
                        }
                    } else if (timeType === 'minute') {
                        if(
                            type === 'day'|| 
                            type === 'hour') {
                            return <g
                                key={`x_tick_${value}_${i}`}
                                transform={`translate(${xPos},0)`}
                            >
                                <line 
                                    y2={type === 'day' ? 10 : 7}
                                    stroke="#c23616"
                                    strokeWidth={2}
                                />
                                <text
                                    className={cx('xAxisText',{
                                        tier1: type === 'day',
                                        tier2: type === 'hour'
                                    })}
                                    key={value}
                                    y={type === 'day' ? 20 : 16}
                                >{value}</text>
                            </g>
                        }
                    }
                    return <g
                    key={`x_tick_${value}_${i}`}
                    transform={`translate(${xPos},0)`}
                >
                    <line 
                        y2="3"
                        stroke="black"
                        strokeWidth={0.2}
                    />
                </g>
                }
                )
            }
        </g>
    );
}

export default XAxis;
/**
 * 
 * 
 */