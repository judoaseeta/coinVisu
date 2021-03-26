import React from 'react';
import { yAxisTick, yAxisProps } from '../types';
import styles from '../styles/axis.module.scss';
const YAxis: React.FC<yAxisProps> = ({
    linearScale,
    xPad,
    x,
    y
}) => {
    const ticks: yAxisTick[] = React.useMemo(() => {
        const height = linearScale.range()[0]-linearScale.range()[1];
        const tickNums = Math.max(
            1,
            height/ 30
        );
        return linearScale.ticks(tickNums).map( tick => ({
            yPos: linearScale(tick),
            value: tick
        }))
    },[
        linearScale
    ]);
    return (
        <g
            transform={`translate(${x},${y})`}
        >
            <path 
                d={[
                    "M", xPad - 6, 0,
                    "h", 6,
                    "V", linearScale.range()[0] - linearScale.range()[1],
                    "h", -6
                ].join(' ')}
                fill="none"
                stroke="black"
            />
            {
                ticks.map( ({value, yPos}) => 
                    <g
                        key={'yTickg' + value}
                    >
                        <line 
                            x1={xPad-6}
                            x2={xPad}
                            y1={yPos}
                            y2={yPos}
                            key={'tickline' + value}
                            stroke="black"
                            fill="none"
                        />
                        <text 
                            className={styles.yAxisText}
                            x={xPad - 8}
                            y={yPos}
                            key={'tickvalue' + value}
                        >{value}</text>
                    </g>    
                )
            }
        </g>
    );
}

export default YAxis;
