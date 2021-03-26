import React from 'react';
// component
import AuthFormLogo from './logo';
import Loading from '../loading';
// styles
import classnames from 'classnames/bind';
import styles from './styles/authForm.module.scss';

const cx = classnames.bind(styles);

export interface AuthFormProps {
    authType: 'login' | 'signup' | false,
    emailError: string;
    loadingMessage: string;
    passwordError1: string;
    passwordError2: string;
    passwordError3: string;
    isAuthOn: boolean;
    isEmailAuthenticated: boolean;
    isPWAuthenticated: boolean;
    email: string;
    password: string;
    onContainerClick: React.MouseEventHandler;
    onEmailChange: React.ChangeEventHandler;
    onKeyDown: React.KeyboardEventHandler;
    onPwChange: React.ChangeEventHandler;
    onSubmit: React.FormEventHandler;
    onBack: (e?: React.MouseEvent) => void;
}
const AuthForm = React.forwardRef<HTMLDivElement, AuthFormProps>(({
    authType,
    email,
    loadingMessage,
    password,
    isAuthOn,
    isEmailAuthenticated,
    isPWAuthenticated,
    onBack,
    onContainerClick,
    onEmailChange,
    onKeyDown,
    onSubmit,
    onPwChange,
    emailError = '',
    passwordError1 = '',
    passwordError2 = '',
    passwordError3 = '',
}, ref) => {
    return (
        <section
            className={cx('container', {
                on: isAuthOn
            })}
            onClickCapture={onContainerClick}
            onKeyDown={onKeyDown}
            ref={ref}
        >
            {
                loadingMessage &&
                <Loading 
                    loadingMessage={loadingMessage}
                    colorOption="light"
                />
            }
            {
                !loadingMessage &&
                <section
                    className={cx('form')}
                >
                    <header
                        className={cx('header')}
                    >
                        <AuthFormLogo />
                        <h2
                            data-testid="authform_heading"
                        >{ authType === 'login' ? '로그인' : '회원가입'}</h2>
                    </header>
                    <form
                        className={cx('main')}
                        onSubmit={onSubmit}
                    >
                        <div
                            className={cx('wrapper')}
                        >
                            <label
                                htmlFor="userEmail"
                            >이메일</label>
                            <input 
                                className={cx('input', {
                                    authenticated: isEmailAuthenticated,
                                    error: !isEmailAuthenticated && !!emailError
                                })}
                                type="text"
                                value={email}
                                autoComplete="username"
                                onChange={onEmailChange}
                                id="userEmail"
                            />
                            <p
                                className={cx('message', {
                                    authenticated: isEmailAuthenticated,
                                    error: !isEmailAuthenticated && !!emailError
                                })}
                            >{isEmailAuthenticated ? '올바른 이메일입니다.'  : emailError}</p>
                        </div>
                        <div
                            className={cx('wrapper')}
                        >
                            <label
                                htmlFor="userPassword"
                            >비밀번호</label>
                            <input 
                                className={cx('input', {
                                    authenticated: isPWAuthenticated,
                                    error: !isPWAuthenticated && (passwordError1 || passwordError2 || passwordError3),
                                })}
                                type="password"
                                autoComplete={"current-password"}
                                value={password}
                                onChange={onPwChange}
                                id="userPassword"
                            />
                            <p
                                    className={cx('message', {
                                        authenticated: isPWAuthenticated,
                                        error: !isPWAuthenticated && !!passwordError1,
                                    })}
                                >{passwordError1}
                            </p>
                            <p
                                    className={cx('message', {
                                        authenticated: isPWAuthenticated,
                                        error: !isPWAuthenticated && !!passwordError2,
                                    })}
                                >{passwordError2}
                            </p>
                            <p
                                    className={cx('message', {
                                        authenticated: isPWAuthenticated,
                                        error: !isPWAuthenticated && !!passwordError3,
                                    })}
                                >{passwordError3}
                            </p>
                        </div>
                        <div
                            className={cx('buttons')}
                        >
                            <button
                                className={cx('button', {
                                    authenticated: isPWAuthenticated && isEmailAuthenticated
                                })}
                                disabled={!(isEmailAuthenticated && isPWAuthenticated)}
                                type="submit"
                            >{ authType === 'login' ? '로그인' : '회원가입'}</button>
                            <button
                                className={cx('button')}
                                onClick={onBack}
                            >돌아가기</button>
                        </div>
                    </form>
                </section>
            }
        </section>
    )
});
export default AuthForm;
