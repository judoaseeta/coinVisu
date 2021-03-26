import React, {
    useCallback
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
//COMPONENTS
import TopBarComponent from '../components/topbar';
// actions
import {
    clickLogin,
    clickSignup,
    clickLogout
} from '../state/actions';
// state
import {
    AuthState,
    rootState
} from '../state/reducers';
const TopBar = () => {
    const dispatch = useDispatch();
    const authState = useSelector<rootState, AuthState>( state => state.auth);
    const onLoginHandler:React.MouseEventHandler = useCallback(() => {
        dispatch(clickLogin());
    },[
        dispatch
    ]);
    const onSignUpHandler:React.MouseEventHandler = useCallback(() => {
        dispatch(clickSignup());
    },[
        dispatch
    ]);
    const onLogOutHandler:React.MouseEventHandler = useCallback(() => {
        dispatch(clickLogout());
    },[
        dispatch
    ]);
    return <TopBarComponent 
        isLogin={authState.isLogin}
        onLoginHandler={onLoginHandler}
        onSignUpHandler={onSignUpHandler}
        onLogoutHandler={onLogOutHandler}
    />
}

export default TopBar;
