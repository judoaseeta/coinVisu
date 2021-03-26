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
import {
    useHistory
} from 'react-router-dom';
// hooks
import UseTabTrap from './useTabTrap';

// state
import {
    clickBack,
    requestLogin,
    requestSignUp
} from '../state/actions';
import {
    rootState,
    AuthState,
} from '../state/reducers';


const UseAuthForm = () => {
    const dispatch =  useDispatch();
    const history =  useHistory();
    // state
    const AuthState = useSelector<rootState, AuthState>(state => state.auth);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ emailError, setEmailError ]=  useState('');
    const [ passwordError1, setPasswordError1 ] = useState('');
    const [ passwordError2, setPasswordError2 ] = useState('');
    const [ passwordError3, setPasswordError3 ] = useState('');

    // event
    const clear = useCallback(() => {
        dispatch(clickBack());
        setEmail('');
        setEmailError('');
        setPassword('');
        setPasswordError1('');
        setPasswordError2('');
        setPasswordError3('');
    },[
        dispatch
    ]);
    const onBack = useCallback((e?:React.MouseEvent) => {
        if(e) {
            e.preventDefault();
        }
        clear();
    },[
        clear
    ]);
    const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value;
        setEmail(value);
        if(value.length > 3) {
            const emailRegex = /(\w+\.)*\w@(\w+\.)+[A-Za-z]+/;
            if(!emailRegex.test(value)) {
                setEmailError('올바르지 못한 이메일입니다');
            } else if(value.length > 30) {
                setEmailError('이메일이 너무 깁니다');
            } else {
                setEmailError('');
            }
        }
    },[

    ]);
    const onPwChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.target.value;
        setPassword(value);
        if(value.length > 3) {
            const upperCaseRegex = new RegExp(/([A-Z])+/g)
            const specialCaseRegex = /[!@#$%^&*()_+?/><~]{1,}/g;
            const notProperLength = (value.length <= 7 || value.length > 20);
            if(notProperLength) {
                setPasswordError1('암호의 길이는 8자이상 20자 이하이어야 합니다.');
            } else if(!notProperLength) {
                setPasswordError1('');
            }

            if(value.match(upperCaseRegex) === null) {
                setPasswordError2('최소한 한 개 이상의 대문자가 있어야 합니다');
            } else if(value.match(upperCaseRegex) !== null){
                setPasswordError2('');
            }

            if(!specialCaseRegex.test(value)) {
                setPasswordError3('최소한 한 개 이상의 특수문자가 있어야 합니다');
            } else {
                setPasswordError3('');
            }
            if(!notProperLength && value.match(upperCaseRegex) !== null&& specialCaseRegex.test(value)) {
                setPasswordError1('');
                setPasswordError2('');
                setPasswordError3('');
            }
        }
    },[
    ]);
    const onSubmit: React.FormEventHandler = useCallback((e) => {
        e.preventDefault();
        const noError = !emailError && !passwordError3 && !passwordError2 && !passwordError1;
        if(noError) {
            if(AuthState.authType === 'login') {
                dispatch(requestLogin(email, password));
            } else if(AuthState.authType === 'signup') {
                dispatch(requestSignUp(email, password));
            }
        }
    },[
        AuthState.authType,
        dispatch,
        email,
        password,
        passwordError1,
        passwordError2,
        passwordError3,
        emailError
    ]);



    const ref = useRef<HTMLDivElement>(null);
    // click event capture handler for background clicking
    const onContainerClick = useCallback((e: React.MouseEvent) => {
        if(e.target === ref.current) {
            e.preventDefault();
            clear();
        }
    },[
        clear,
        ref,
    ]);
    // tab trapping and esc for authentication form component
    const onKeyDown: React.KeyboardEventHandler = UseTabTrap({
        ref,
        cleanUp: onBack,
        focusables: 'input, button'
    });
    // when authentication form is rendered, focus the first focusable element
    // to activate tab trap
    useEffect(() => {
        const { authType, loadingMessage  } = AuthState;
        const container = ref.current;
        
        if(!authType) {
            document.body.classList.remove('lock');
        }
        if(!!authType) {
            if(container) {
                document.body.classList.add('lock');
                const focusable = container.querySelectorAll<HTMLElement>('button, input');
                if(focusable.length > 0) {
                    focusable[0].focus();
                }
            }
            history.listen(clear);
        } else if(!!authType && !loadingMessage) {
            document.body.classList.add('lock');
        }
    },[
        AuthState,
        clear,
        history,
        ref,
    ])
    return {
        authType: AuthState.authType,
        ref,
        email,
        emailError,
        loadingMessage: AuthState.loadingMessage,
        password,
        passwordError1,
        passwordError2,
        passwordError3,
        onBack,
        onEmailChange,
        onContainerClick,
        onKeyDown,
        onPwChange,
        onSubmit,
    }
}

export default UseAuthForm;
