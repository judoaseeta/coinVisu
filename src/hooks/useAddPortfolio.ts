import {
    useCallback,
    useEffect,
    useState,
    useRef
} from 'react';
import { 
    useDispatch,
    useSelector,
} from 'react-redux';
import { useHistory } from 'react-router-dom';
// hook
import UseTabTrap from '../hooks/useTabTrap';
// action
import { 
    addPortfolio,
    toggleAddPortfolio,
    clickLogin
} from '../state/actions';
import {
    rootState
} from '../state/reducers';

interface UseAddPortfolioProps {
    symbol: string;
    minPrice: number;
    maxPrice: number;
    minAmount: number;
    maxAmount: number;
}

const UseAddPortfolio = ({
    symbol,
    minPrice,
    maxPrice,
    minAmount,
    maxAmount
}: UseAddPortfolioProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector<rootState,boolean>( state => state.auth.isLogin);
    const on = useSelector<rootState, boolean>(state => state.portfolios.on);
    const addPortfolioLoading = useSelector<rootState, string>(state => state.portfolios.addPortfolioLoading);
    const ref = useRef<HTMLDivElement|null>(null);

    // 로그인 창 작동
    const onLoginClick: React.MouseEventHandler = useCallback((e) => {
        dispatch(clickLogin());
    },[
        dispatch
    ]);
    const toggle = useCallback((toggle: boolean) => (
        dispatch(toggleAddPortfolio(toggle))
    ),[
        dispatch
    ]);
    
    // states related input
    const [ purchasePrice, setPurchasePrice] = useState('');
    const [ purchaseAmount, setPurchaseAmount ] = useState('');
    const [ priceError, setPriceError ] = useState('');
    const [ amountError, setAmountError ] = useState('');
    // clear function
    const clear = useCallback(() => {
        toggle(false);
        setPurchasePrice('');
        setPurchaseAmount('');
        setPriceError('');
        setAmountError('');
    },[
        toggle
    ]);


    const onContainerClick: React.MouseEventHandler = useCallback((e) => {
        if(e.target === ref.current) {
            e.preventDefault();
            clear();
        }
    },[
        clear,
        ref,
    ]);
    // event handlers related input
    const onPriceChange:React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const num = Number(e.target.value);
        if(e.target.validity.patternMismatch) {
            setPriceError('소수 혹은 숫자로만 입력해주세요 ㅠㅠ');
        } else if(num > maxPrice) {
            setPurchasePrice(e.target.value);
            setPriceError(`구매가격은 ${maxPrice}이하입니다.`);
        } else if(num < minPrice) {
            setPurchasePrice(e.target.value);
            setPriceError(`구매가격은 ${minPrice}이상입니다.`);
        } else  {
            setPriceError('');
            setPurchasePrice(e.target.value);
        }

    },[
        minPrice,
        maxPrice
    ]);
    const onAmountChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const num = Number(e.target.value);
        if(e.target.validity.patternMismatch) {
            setAmountError('소수 혹은 숫자로만 입력해주세요 ㅠㅠ');
        } else if(num > maxAmount) {
            setPurchaseAmount(e.target.value);
            setAmountError(`구매수량은 ${maxAmount}이하입니다.`);
        } else if(num < minAmount) {
            setPurchaseAmount(e.target.value);
            setAmountError(`구매수량은 ${minAmount}이상입니다.`);
        } else  {
            setAmountError('');
            setPurchaseAmount(e.target.value);
        }

    },[
        minAmount,
        maxAmount
    ]);
    const onKeyDown: React.KeyboardEventHandler = UseTabTrap({
        ref,
        cleanUp: clear,
        focusables: 'button, input, a'
    });
    
    useEffect(() => {
        if(!on) {
            clear();
            document.body.classList.remove('lock');
        } else {
            document.body.classList.add('lock');

            history.listen(() => {
                clear();
                document.body.classList.remove('lock');
            });
            if(ref.current) {
                const focusables = ref.current.querySelectorAll<HTMLElement>('button, input, a');
                focusables[0].focus();
            }
        }
    },[
        clear,
        on,
        ref,
        history
    ]);
    // onSubmit - dispatch addPortfolio
    const onSubmit: React.FormEventHandler = useCallback((e) => {
        e.preventDefault();
        const amount = Number(purchaseAmount);
        const price = Number(purchasePrice);
        if(
            !priceError &&
            !amountError &&
            amount > 0 &&
            price > 0 
        ) {
            dispatch(addPortfolio(symbol, amount, price));
        }
    },[
        dispatch,
        symbol,
        purchasePrice,
        purchaseAmount,
        priceError,
        amountError
    ]);
    return {
        purchaseAmount,
        purchasePrice,
        priceError,
        amountError,
        isLogin,
        ref,
        on,
        addPortfolioLoading,
        onContainerClick,
        onPriceChange,
        onAmountChange,
        onLoginClick,
        onKeyDown,
        onSubmit,
        toggle
    }
}

export default UseAddPortfolio;
