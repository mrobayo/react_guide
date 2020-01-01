import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const API_KEY = 'AIzaSyDzM_2oppOJqLlAlj6q7FE2v4VhLuKUEKI';
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const auth = (email, password, isSignup) => {
    console.log('auth', email);
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        axios.post(isSignup ? SIGNUP_URL : SIGNIN_URL, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });

    }
};