import React from 'react';
import * as reactRedux from 'react-redux';
import {
    requestLogin
} from '../../state/actions';
import { rootState } from '../../state/reducers';
import { 
    act,
    render,
    mockInitialState,
    fireEvent,
    userEvent,
} from '../../utils/richTest';
import AuthForm from '../authForm';

describe('Testing Page <AuthForm />',() => {
    it("should be hidden when 'authType' is false ", () => {
        
        // with initialState, the value of 'authType' in auth reducer is false. 
        const { container } = render(<AuthForm />,{
            initialState: mockInitialState
        });
        const authFormContainer = container.querySelector('.container');
        expect(authFormContainer).toBeInTheDocument();
        // DOM is rendered, but it doesn't have class 'on'
        expect(authFormContainer?.classList.contains('on')).toBe(false);
    });
    it("when 'authType' is signup", async () => {
        const signUpState: rootState = {
            ...mockInitialState,
            auth: {
                ...mockInitialState.auth,
                authType: 'signup'
            }
        }
        // with authType 'signup'
        const { container , getByTestId } = render(<AuthForm />,{
            initialState: signUpState
        });
        const authFormContainer = container.querySelector('.container');
        expect(authFormContainer).toBeInTheDocument();
        // authType is not false, container should have class 'on'
        expect(authFormContainer?.classList.contains('on')).toBe(true);
        // h2 element on AuthForm should have text "회원가입"
        const heading = await getByTestId("authform_heading");

        expect(heading.textContent).toEqual('회원가입');
    });
    it("when press 돌아가기 button ", async () => {
        const signUpState: rootState = {
            ...mockInitialState,
            auth: {
                ...mockInitialState.auth,
                authType: 'signup'
            }
        }
        // with authType 'signup'
        const { container , getByText } = render(<AuthForm />,{
            initialState: signUpState
        });
        const authFormContainer = container.querySelector('.container');
        // authType is not false, container should have class 'on'
        expect(authFormContainer?.classList.contains('on')).toBe(true);
        // find button text is '돌아가기'
        const backButton = getByText(/돌아가기/);
        // click 돌아가기 button
        act(() => userEvent.click(backButton));
        // container' class 'on' removed
        expect(authFormContainer?.classList.contains('on')).toBe(false);
    });
    it('testing validating email input', () => {
        const signUpState: rootState = {
            ...mockInitialState,
            auth: {
                ...mockInitialState.auth,
                authType: 'signup'
            }
        }
        // with authType 'signup'
        const { container  } = render(<AuthForm />,{
            initialState: signUpState
        });

        // when putting non valid email...
        const emailInput = container.querySelector('#userEmail');
        const nonValidEmail = 'efewfwe';
        fireEvent.change(emailInput!,{ target: { value: nonValidEmail }})
        // email input value is same as non valid email
        expect(emailInput?.getAttribute('value')).toEqual(nonValidEmail);
        // email input should have 'error' class.
        expect(emailInput?.classList.contains('error')).toBe(true);
        const emailErrorMessage = container.getElementsByClassName('message')[0];
        expect(emailErrorMessage.textContent).toEqual('올바르지 못한 이메일입니다');
        // when email is too long(over 20 chars)
        const tooLongMail = 'f32e23f23ff23f3fefewffewfeewefeewwfew2@mgage.com';
        fireEvent.change(emailInput!, { target : { value: tooLongMail}});
        expect(emailErrorMessage.textContent).toEqual('이메일이 너무 깁니다');
        // when vaild email address
        const vaildEmail = 'judoaseeta@gmail.com';
        fireEvent.change(emailInput!, { target : { value: vaildEmail}});
        // input element should have 'authenticated'class
        expect(emailInput?.classList.contains('authenticated')).toBe(true);
        // error message should be gone
        expect(emailErrorMessage.textContent).toEqual('올바른 이메일입니다.');
    });
    it('testing validating password input',() => {
        const loginState: rootState = {
            ...mockInitialState,
            auth: {
                ...mockInitialState.auth,
                authType: 'login'
            }
        }
        // with authType 'login'
        const { container  } = render(<AuthForm />,{
            initialState: loginState
        });
        const password = container.querySelector('#userPassword');
        const nonValidPW = 'dvdsvs';
        fireEvent.change(password!,{ target: { value: nonValidPW}});
        // when input non valid password
        expect(password?.getAttribute('value')).toEqual(nonValidPW);
        // password input should have a 'error' class
        expect(password?.classList.contains('error')).toBe(true);
        // password error message1 notify password's length
        const pwErrorMessage1 = container.getElementsByClassName('message')[1];
        expect(pwErrorMessage1.textContent).toEqual('암호의 길이는 8자이상 20자 이하이어야 합니다.');
        // password error message2 notify if there is a capital letter
        const pwErrorMessage2 = container.getElementsByClassName('message')[2];
        expect(pwErrorMessage2.textContent).toEqual('최소한 한 개 이상의 대문자가 있어야 합니다');
        // password error message3 notify if there is a special char
        const pwErrorMessage3 = container.getElementsByClassName('message')[3];
        expect(pwErrorMessage3.textContent).toEqual('최소한 한 개 이상의 특수문자가 있어야 합니다');
        // when password is valid

        const validPW = 'dvdsvs!Aaa';
        fireEvent.change(password!,{ target: { value:validPW }});
        expect(password?.getAttribute('value')).toEqual(validPW);
        // password input should have a 'authenticated' class
        expect(password?.classList.contains('authenticated')).toBe(true);
        // all error message should be gone.
        expect(pwErrorMessage1.textContent).toEqual('');
        expect(pwErrorMessage2.textContent).toEqual('');
        expect(pwErrorMessage3.textContent).toEqual('');
    });
    it('when submit',() => {
        // MOCK useDispatch in react-redux
        const mockDispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);

        const loginState: rootState = {
            ...mockInitialState,
            auth: {
                ...mockInitialState.auth,
                authType: 'login'
            }
        }
        // with authType 'login'
        const { container  } = render(<AuthForm />,{
            initialState: loginState
        });
        // putting non valid email and password
        const email = container.querySelector('#userEmail');
        const nonVaildEmail = 'judoaseeta@gmailm';
        fireEvent.change(email!, { target : { value: nonVaildEmail}});
        const password = container.querySelector('#userPassword');
        const nonValidPW = 'dvdsvsaa';
        fireEvent.change(password!,{ target: { value: nonValidPW }});

        const submit = container.querySelector('[type="submit"]');
        expect(submit?.textContent).toEqual('로그인');
        // with non valid value submit button should be disabled
        expect(submit?.hasAttribute('disabled')).toBe(true);
        //when submit with non valid value
        fireEvent.submit(submit!);
        expect(mockDispatch).not.toHaveBeenCalled();
        
        
        // putting valid email and password
        const vaildEmail = 'judoaseeta@gmail.com';
        fireEvent.change(email!, { target : { value: vaildEmail}});
        const validPW = 'dvdsvs!Aaa';
        fireEvent.change(password!,{ target: { value:validPW }});

        // find submit button with text '로그인'
       
        fireEvent.submit(submit!);
        // when submit
        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch.mock.calls[0][0]).toEqual(requestLogin(vaildEmail,validPW))
    });
});