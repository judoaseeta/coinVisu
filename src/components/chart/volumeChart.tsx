import React from 'react';
import {
    ScaleBand,
    ScaleContinuousNumeric
} from 'd3-scale';
import { ResizedDimensions } from 'use-react-dimensions';
// entity
import { HistoData } from '../../entities/cryptoData';

// styles
import styles from './styles/volumeChart.module.scss';

interface VolumeChartProps {
    dimensions: ResizedDimensions;
    xScale: ScaleBand<Date>;
    volumeScale: ScaleContinuousNumeric<number,number>;
    datas: HistoData[];
}
const VolumeChart:React.FC<VolumeChartProps> = ({
    dimensions,
    datas,
    xScale,
    volumeScale
}) => {

    return (
        <g
            transform={`translate(${dimensions.marginLeft},${dimensions.height - dimensions.marginBottom + 40})`}
        >
        {
            datas.map( (data,i) => {
                const pad = xScale.bandwidth() * 0.15;
                const width = xScale.bandwidth() * 0.7;
                return (
                    <rect 
                        className={styles.volume}
                        key={`volume${i}+${data.volumefrom}`}
                        x={xScale(data.time)! + pad}
                        y={volumeScale(data.volumefrom) - 33}
                        width={width}
                        height={dimensions.marginBottom - 40  - volumeScale(data.volumefrom)}
                    />  
                )
            })
        }
        </g>
    )
};

export default VolumeChart;