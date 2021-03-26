import React from 'react';
import { line } from 'd3-shape';
// hook
import useScales from '../../hooks/useScales';
// entity
import { HistoData } from '../../entities/cryptoData';
//styles
import classname from 'classnames/bind';
import styles from './styles/coinInfoItem.module.scss';

const cx = classname.bind(styles);

export interface CoinInfoChartProps {
    histoDatas: HistoData[];
}
const CoinInfoChart:React.FC<CoinInfoChartProps> = ({
    histoDatas,
}) => {
    const { ref, dimensions, xScale, yScale  } = useScales({
        initialDimensions: {
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            width: 100,
            height: 50
        },
        datas: histoDatas
    });
    const chartLine = React.useMemo(() => {
        if(xScale && yScale) {
            return line<HistoData>()
                .x( d => xScale(d.time)! + xScale.bandwidth() / 2)
                .y( d => yScale(d.close))
        }
    },[
        xScale,
        yScale
    ]);
    return <div
        ref={ref}
        className={cx('chartWrapper')}
    >
        {
            dimensions.isResized &&
            chartLine &&
            <svg
                width={dimensions.width}
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            >
                <g
                    transform={`translate(${dimensions.marginLeft},0)`}
                >
                    <path 
                        className={cx('chartLine')}
                        d={chartLine(histoDatas)!}
                    />
                </g>
            </svg>
        }
    </div>;
}
export default CoinInfoChart;
