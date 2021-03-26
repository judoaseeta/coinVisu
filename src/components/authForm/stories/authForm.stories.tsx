import React from 'react';

import { 
    Story,
    Meta  
} from '@storybook/react';

import AuthForm, { AuthFormProps } from '../';

export default {
    title: '어쎈티케이션 폼',
    argTypes: {
        onContainerClick: {
            action:'모달 페이드 클릭'
        },
        onEmailChange: {
            action: '이메일 입력'
        },
        onKeyDown: {
            action: '키보드 입력'
        },
        onPwChange: {
            action: '비밀번호 입력'
        },
        onBack: {
            action: '돌아가기'
        },
        onSubmit: {
            action: '제출하기'
        }
    }
} as Meta;


const AuthFormTemplate:Story<AuthFormProps> = (args) => <AuthForm {...args} />;

export const 회원가입시 = AuthFormTemplate.bind({});

회원가입시.args = {
    authType: 'signup',
    isAuthOn: true
}
export const 로그인시 = AuthFormTemplate.bind({});

로그인시.args = {
    authType: 'login',
    isAuthOn: true
}
export const 로딩시 = AuthFormTemplate.bind({});

로딩시.args = {
    authType: 'login',
    isAuthOn: true,
    loadingMessage: '로그인 중입니다...'
}


export const 에러시 = AuthFormTemplate.bind({});

에러시.args = {
    authType: 'signup',
    email:'judo@gmail.com',
    password: 'ewfewew1',
    isAuthOn: true,
    isEmailAuthenticated: true,
    isPWAuthenticated: false,
    passwordError1: '대문자가 최소한 하나는 있어야 합니다.',
    passwordError2: '길이가 최소한 8글자 이상이어야 합니다.'
}
export const 모든_조건_충족시 = AuthFormTemplate.bind({});

모든_조건_충족시.args = {
    authType: 'signup',
    email:'judo@gmail.com',
    password: 'ewfewew1',
    isAuthOn: true,
    isEmailAuthenticated: true,
    isPWAuthenticated: true,
    passwordError1: '',
    passwordError2: ''
}
