import { useMemo, MutableRefObject } from 'react';
import { 
    ScaleBand,
    scaleBand,
    scaleLinear,
    scaleLog,
    ScaleContinuousNumeric
} from 'd3-scale';
import { HistoData } from '../entities/cryptoData';
import useDimensions, { InitialDimensions,ResizedDimensions } from 'use-react-dimensions';

interface UseScalesProps {
    initialDimensions: InitialDimensions;
    datas: HistoData[] | null;
    isVolumeNeeded?: boolean;
}

type ReturnTypeUseScales = {
    ref: MutableRefObject<HTMLDivElement|null>;
    dimensions: ResizedDimensions;
    xScale: ScaleBand<Date>| null;
    yScale: ScaleContinuousNumeric<number,number>| null;
    volumeScale:ScaleContinuousNumeric<number,number>|null;
};
const useScales = ({
    initialDimensions,
    datas,
    isVolumeNeeded = false
}: UseScalesProps):ReturnTypeUseScales => {
    const { ref, dimensions } = useDimensions<HTMLDivElement>(initialDimensions);
    const xScale = useMemo(() => {
        if(datas) {
            return scaleBand<Date>()
            .domain([...datas.map(d => d.time)])
            .range([0, dimensions.boundedWidth]);
        } else {
            return null;
        }
    },[
        dimensions,
        datas
    ]);
    const yScale = useMemo(() => {
        if(datas) {
            const min = Math.min(...datas.map(d => d.low));
            const max =  Math.max(...datas.map(d => d.high));
            const ratio = max / min;
            if(ratio > 10000 ) {
                return scaleLog<number,number>()
                .domain([min, max])
                .range([ dimensions.boundedHeight, 0]);
            } else {
                return scaleLinear<number,number>()
                .domain([min, max])
                .range([ dimensions.boundedHeight, 0]);
            }
            
        } else {
            return null;
        }
    },[
        dimensions.boundedHeight,
        datas
    ]);
    const volumeScale = useMemo(() => {
        if(datas) {
            const volumes = [...datas.map(d => d.volumefrom)];
            if(isVolumeNeeded) {
                const min = Math.min(...volumes);
                const max =  Math.max(...volumes);
                const ratio = max / min;
                if(ratio > 10000 ) {
                    return scaleLog<number,number>()
                    .domain([min, max])
                    .range([dimensions.marginBottom -40,33]);
                } else {
                    return scaleLinear<number,number>()
                    .domain([min, max])
                    .range([dimensions.marginBottom -40,33]);
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    },[
        dimensions.marginBottom,
        datas,
        isVolumeNeeded
    ])
    return {
        ref,
        dimensions,
        xScale,
        yScale,
        volumeScale
    }
};

export default useScales;
