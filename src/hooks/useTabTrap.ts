import {
    useCallback,
    KeyboardEventHandler,
    RefObject
} from 'react';

interface UseTabTrapProps {
    ref: RefObject<HTMLElement|null>;
    cleanUp: () => void;
    focusables: string;
}

const UseTabTrap = ({
    ref,
    cleanUp,
    focusables
}: UseTabTrapProps): KeyboardEventHandler  => useCallback((e) => {
const container = ref.current;
const focusable = container!.querySelectorAll<HTMLElement>(focusables);
if(e.key === 'Esc' || e.key === 'Escape') {
    focusable[0].blur();
    cleanUp();
}
if(e.shiftKey && e.key === 'Tab') {
    if(document.activeElement === focusable[0]) {
        focusable[focusable.length -1].focus();
        e.preventDefault();
    }
} else if(e.key === 'Tab') {
    if(document.activeElement === focusable[focusable.length -1]) {
        focusable[0].focus();
        e.preventDefault();
    }
} else if(e.key === 'ArrowDown') {
    if(document.activeElement === focusable[focusable.length -1]) {
        focusable[0].focus();
        e.preventDefault();
    } else {
        const id = Array.from(focusable).findIndex( element => document.activeElement === element);
        if(id > -1) {
            focusable[id+1].focus();
        }
    }
} else if(e.key === 'ArrowUp') {
    if(document.activeElement === focusable[0]) {
        focusable[focusable.length -1].focus();
        e.preventDefault();
    } else if(document.activeElement !== focusable[0]) {
        const id = Array.from(focusable).findIndex( element => document.activeElement === element);
        if(id > -1) {
            focusable[id-1].focus();
        }
    }
}
},[
    ref,
    cleanUp,
    focusables
]);

export default UseTabTrap;

