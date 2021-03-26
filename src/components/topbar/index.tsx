import React from 'react';
import styles from './styles/topbar.module.scss';

export interface TopBarProps {
    onLoginHandler: React.MouseEventHandler;
    onLogoutHandler: React.MouseEventHandler;
    onSignUpHandler: React.MouseEventHandler;
    isLogin: boolean;
}
const TopBar:React.FC<TopBarProps> = ({
    onLoginHandler,
    onLogoutHandler,
    onSignUpHandler,
    isLogin
}) => 
<div
    className={styles.topbar}
>   
   {
       !isLogin &&
       <>
            <p
                className={styles.topbarItem}
                onClick={onSignUpHandler}
            >회원가입</p>
            <p
                className={styles.topbarItem}
                onClick={onLoginHandler}
            >로그인</p>
        </>
   }
   {
       isLogin &&
        <p
            className={styles.topbarItem}
            onClick={onLogoutHandler}
        >로그아웃</p>
   }
</div>;

export default TopBar;
