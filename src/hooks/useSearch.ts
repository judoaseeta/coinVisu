import React, {
    useCallback,
    useEffect,
    useState,
    useRef
} from 'react';
// hook
import UseTabTrap from './useTabTrap';


const UseSearch = () => {
    const [ on, setOn] = useState(false);
    const setFocus = useCallback((toggle: boolean) => {
        if(toggle) {
            document.body.classList.add('lock');
            setOn(toggle);
        } else {
            document.body.classList.remove('lock');
            setOn(toggle);
        }
    },[
    ]);
    const ref = useRef<HTMLFormElement>(null);
    const onKeyDown: React.KeyboardEventHandler = UseTabTrap({
        ref,
        cleanUp: () => setFocus(false),
        focusables: 'input, a'
    })
    // when input focused, set true to show results
    const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true);
    },[
        setFocus
    ]);
    const onClick = useCallback((e: MouseEvent) => {
        const container = ref.current;
        if(container) {
            const input = container.querySelector('input');
            if(e.target !== input) {
                setFocus(false);
            }
        }
    },[
        ref,
        setFocus
    ]);
    useEffect(() => {
       document.addEventListener('click',onClick,true);
       return () => {
        document.removeEventListener('click',onClick);
       }
    },[
        onClick
    ]);
    return {
        on,
        ref,
        onKeyDown,
        onFocus,
        onClick,
    }
}

export default UseSearch;
