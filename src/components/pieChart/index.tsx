import React, { 
    useState,
    useMemo, 
} from 'react';
import { ResizedDimensions } from 'use-react-dimensions';
import { scaleOrdinal } from 'd3-scale';
import { arc, PieArcDatum, pie } from 'd3-shape';

//styles
import classnames from 'classnames/bind';
import styles from './styles/pieChart.module.scss';

const cx = classnames.bind(styles);
type PossibleData = { [key: string] : any};
type PossibleKeys = keyof PossibleData;

export interface PieChartProps {
    dimensions: ResizedDimensions;
    datas: PossibleData[];
    pieKey: PossibleKeys;
    coreKey: PossibleKeys;
    colorScheme: readonly string[];
    startAngle: number;
    endAngle: number;
    symbol:string;
    title: string;
}
const PieChart: React.FC<PieChartProps> = ({
    dimensions,
    datas,
    pieKey,
    coreKey,
    colorScheme,
    title,
    symbol,
    startAngle= 0,
    endAngle = Math.PI * 2
}) => {
    // set innerRadius dynamically by width

    const innerRadius = useMemo(() => {
        const width = dimensions.boundedWidth;
        if(width >= 350) {
            return width * 0.2;
        } else if(width >= 300) {
            return width * 0.2;
        } else {
            return width * 0.3;
        }
    },[
        dimensions.boundedWidth
    ]);
    // D3 pie generate-related functions
    const pieGenerator = useMemo(() => {
        return pie<PossibleData>()
                    .value( d => d[pieKey] as number)
                    .startAngle(startAngle)
                    .endAngle(endAngle)
    },[
        startAngle,
        endAngle,
        pieKey,
    ])
    const pData = useMemo(() => {
        return pieGenerator(datas);
    },[
        pieGenerator,
        datas
    ]);
    const arcGenerator = useMemo(() => {
        const pRadius = dimensions.boundedHeight < dimensions.boundedWidth ? dimensions.boundedHeight : dimensions.boundedWidth;
        return arc<PieArcDatum<any>>()
        .innerRadius(innerRadius)
        .outerRadius(pRadius / 2)
    },[
        innerRadius,
        dimensions.boundedHeight,
        dimensions.boundedWidth
    ]);
    const colorScale = useMemo(() => {
        return scaleOrdinal<string>()
                    .domain(datas.map( (d: PossibleData) => d[coreKey] as string))
                    .range(colorScheme);  
    },[
        colorScheme,
        coreKey,
        datas
    ]);
    
    // mouse hover handler;

    const [selectedIndex, setSelectedIndex ] = useState(-1);
    const outerArcs =  useMemo(() => {
        const pRadius = dimensions.boundedHeight < dimensions.boundedWidth ? dimensions.boundedHeight : dimensions.boundedWidth;
        const radius = (pRadius /2 );
        const oRadius = ( radius- innerRadius) * 0.2;
        return arc<PieArcDatum<any>>()
        .innerRadius(radius+ 3)
        .outerRadius( radius + oRadius)
    },[
        innerRadius,
        dimensions.boundedHeight,
        dimensions.boundedWidth
    ]);
    const sum = useMemo(() => {
        return datas.reduce((acc,curr) => (
            acc + (curr[pieKey] as number)
        ),
        0);
    },[
        datas,
        pieKey
    ]);
    const perForSelected = useMemo(() => {
        if(selectedIndex > -1) {
            return pData[selectedIndex].data[pieKey] / sum
        }
    },[
        pData,
        selectedIndex,
        sum,
        pieKey
    ])
    return <svg
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        width={dimensions.width}
        height={dimensions.height}
    >
        <g
            transform={`translate(${dimensions.marginLeft + dimensions.boundedWidth/2}, ${dimensions.marginTop + dimensions.boundedHeight/ 2})`}
        >
        {
            pData.map( (d,i) => 
                <path 
                    onMouseEnter={() => setSelectedIndex(i)}
                    onMouseLeave={() => setSelectedIndex(-1)}
                    key={'arc' + d.data[coreKey]}
                    className={cx('arc',{
                        unselected: selectedIndex > -1 && selectedIndex !== i
                    })}
                    d={arcGenerator(d)!}
                    fill={colorScale(d.data[coreKey] as string)}
                />
            )
        }
        <g>
            <text 
                className={styles.symbol}
                x={0}
                y={0}
                textAnchor="middle"
                transform={`translate(0,-30)`}
                >
                {symbol}
            </text>
            <text 
                className={styles.title}
                x={0}
                y={0}
                transform={`translate(0,-10)`}
                textAnchor="middle"
            >
                {title}
            </text>
            {
                selectedIndex > -1 &&
                perForSelected &&
                <g>
                    <rect 
                        className={cx('bar')}
                        x={0}
                        y={0}
                        width={innerRadius}
                        height={20}
                        transform={`translate(-${innerRadius/ 2},0)`}
                    />
                    <rect 
                        x={0}
                        y={0}
                        width={innerRadius * perForSelected}
                        height={20}
                        fill={colorScale(pData[selectedIndex].data[coreKey])}
                        transform={`translate(-${innerRadius/ 2},0)`}
                    />
                    <text
                        className={cx('pct')}
                        x={0}
                        y={13}
                    >
                        {(perForSelected * 100).toFixed(2)}%
                    </text>
                    <text
                        x={0}
                        y={0}
                        transform={`translate(0,+35)`}
                        textAnchor="middle"
                    >
                        {(pData[selectedIndex].data[pieKey] as number).toFixed(4)}
                    </text>
                    <text
                        className={cx('coreKey')}
                        x={0}
                        y={0}
                        transform={`translate(0,+50)`}
                        textAnchor="middle"
                    >
                        {pData[selectedIndex].data[coreKey]}
                    </text>
                </g>
            }
            {
                pData.map( (d,i) => 
                    <path 
                        key={'oarc' + d.data[coreKey]}
                        className={cx('subArc',{
                            selected: selectedIndex === i
                        })}
                        d={outerArcs(d)!}
                        fill={colorScale(d.data[coreKey] as string)}
                    />
                )
            }
        </g>
        </g>
       
    </svg>
}

export default PieChart;