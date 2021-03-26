import React from 'react';

import AuthFormComponent from '../components/authForm';
// hook
import UseAuthForm from '../hooks/useAuthForm';
const AuthForm:React.FC = () => {
    const authState = UseAuthForm();
    return <AuthFormComponent
        {...authState}
        isAuthOn={!!authState.authType}
        isEmailAuthenticated={authState.email.length > 4 && !authState.emailError}
        isPWAuthenticated={authState.password.length > 7 && !authState.passwordError1 && !authState.passwordError2 && !authState.passwordError3}
    />
}

export default AuthForm;
