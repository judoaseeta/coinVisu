import useDimensions, {
    InitialDimensions
} from 'use-react-dimensions';
import { 
    useCallback, 
    useEffect,
    useState,
} from 'react';
// entities 
import {
    PairData,
    ToPairData,
    ExchangeData
} from '../../../entities/cryptoData';
// api
import {
    subChartsDatas
} from '../../../api';
interface UseSubChartsProps {
    symbol: string; 
    initialDimensions: InitialDimensions;
}
const UseSubCharts = ({
    symbol,
    initialDimensions
}: UseSubChartsProps) => {
    const {
        ref,
        dimensions
    } = useDimensions<HTMLDivElement>(initialDimensions);
    
    const [ error, setError ] = useState('');
    const [loadingMessage, setLoadingMessage ] = useState('');
    const [data1, setData1] = useState<ExchangeData[]|null>(null);
    const [data2, setData2] = useState<PairData[]|null>(null);
    const [data3, setData3] = useState<ToPairData[]|null>(null);
    const getDatas = useCallback(async() => {
        try {
            setLoadingMessage(() => `${symbol}에 관한 보조 차트데이터를 불러오고 있습니다...`);
            const data = await subChartsDatas(symbol);
            if(data) {
               const { 
                   topExchanges, 
                   topPairFrom, 
                   topPairTo
                } = data;
                setData1(topExchanges);
                setData2(topPairFrom);
                setData3(topPairTo);
                setLoadingMessage('');
            }
        } catch(e) {
            setError(e.message);
            console.log(e);
        } 
    },[
        symbol
    ]);
    useEffect(() => {
        getDatas();
    },[
        getDatas,
        symbol
    ]);
    return {
        data1,
        data2,
        data3,
        dimensions,
        ref,
        loadingMessage,
        error
    }
}

export default UseSubCharts;