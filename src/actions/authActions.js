import axios from 'axios';
import {browserHistory} from 'react-router';
import {
	SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
	LOGOUT_REQUEST, LOGOUT_SUCCESS,
    LOAD_USER_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_FAILURE,

} from './actionTypes';
import notifications from './notificationActions';

function signupRequest(user){ return {type:SIGNUP_REQUEST, isFetching:true, isAuthenticated: false, user: user};}
function signupSuccess(user){ return {type:SIGNUP_SUCCESS, isFetching:false, isAuthenticated: false, user: user};}
function signupFailure(message){ return {type:SIGNUP_FAILURE, isFetching:false, isAuthenticated: false, error: message};}

export function signupUser(creds){
    let body = {
        name : (creds.first + creds.last),
        email: creds.email,
        password: creds.password
    };

    return dispatch => {
        dispatch(signupRequest(body.email));
        return axios.post('/auth/signup', body)
            .then(response => {
                return {data:response.data, response};
            })
            .then(({data, response}) =>{
                if(response.status !== 200){
                    //console.log(response.status);
                    dispatch(signupFailure(data.message));
                    return Promise.reject(data);
                }
                else{
                    dispatch(notifications.Success('Thank you for signing up'));
                    dispatch(signupSuccess(data.email));
                }
            })
            .catch((err)=>{
                dispatch(signupFailure(err));
            });

    };
}

function LoginRequest(user){ return {type:LOGIN_REQUEST, isFetching:true, isAuthenticated: false, user: user};}
function LoginSuccess(user){ return {type:LOGIN_SUCCESS, isFetching:false, isAuthenticated: true, user: user};}
function LoginFailure(message){ return {type:LOGIN_FAILURE, isFetching:false, isAuthenticated: false, error: message};}

export function loginUser(creds) {
    return dispatch => {
        dispatch(LoginRequest(creds.email));
        return axios.post('/auth/login', creds)
            .then((response)=>{
                return {response, data: response.data};
            })
            .then(({response, data}) => {
                if(response.status === 200){
                    if(data.attempt === true){
                        dispatch(notifications.Error("Could not login\n" + data.message));
                        dispatch(LoginFailure(data.message));
                        return Promise.reject(data);
                    }
                    localStorage.setItem('usertoken', data.token);
                    dispatch(LoginSuccess(data.token, data.user));
                    dispatch(loadCurrentUser(true));
                }
                else{
                    dispatch(notifications.Default(data.message));
                    throw(response.status);
                }
            })
            .catch((err) => {
                dispatch(LoginFailure(err));
                dispatch(notifications.Error('Something went wrong. \nPlease try again later.'));
                throw(err);
            });
    };
}

function loadUserRequest(token){return {type:LOAD_USER_REQUEST, isFetching: true, isAuthenticated:false, token: token};}
function loadUserSuccess(user){return {type:LOAD_USER_SUCCESS, isFetching: false, isAuthenticated:true, user:user};}
function loadUserFailure(message){return {type:LOAD_USER_FAILURE, isFetching: false, isAuthenticated:false, error: message};}

export function loadCurrentUser(isLoggingIn = false){
    return (dispatch) => {

        let token = localStorage.getItem('usertoken');
        if(token){

            dispatch(loadUserRequest(token));
            return getUser()
                .then((data) => {
                    return Promise.resolve(data.user);
                })
                .then((currentUser) => {
                    let user = currentUser;
                    console.log(user);
                    if(isLoggingIn){
                        dispatch(notifications.Default('Welcome back ' + user.profile.name, 'tr'));
                        browserHistory.push('/');
                    }
                    dispatch(loadUserSuccess(user));
                    return user;
                })
                .catch((err) =>{
                    dispatch(notifications.Error('Could not load user'));
                    dispatch(loadUserFailure(err));
                    throw(err);
                });
        }
        else{
            dispatch(loadUserFailure('No User Logged in.'));
        }
    };
}

function logoutRequest(user){ return {type:LOGOUT_REQUEST, isFetching:true, isAuthenticated: true, user: user};}
function logoutSuccess(user){ return {type:LOGOUT_SUCCESS, isFetching:false, isAuthenticated: false, user: user};}

export function logoutUser(){
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.removeItem('usertoken');
        browserHistory.push('/');
        dispatch(notifications.Info('You have logged out'));
        dispatch(logoutSuccess());
        return;
    };

}


//helpers
function getAuthHeader(){
    let token = localStorage.getItem('usertoken');
    return {headers: {'Authorization': `Bearer ${token}`} };
}

function request(endpoint, data=null){
    //get Auth Headers
    let authHeader = getAuthHeader();
    return axios.post(endpoint, data, authHeader)
        .then(response => { 
            return {response, data:response.data};})
        .then(({response, data}) => {
            if(response.status === 200){
                return Promise.resolve(data);
            }
            else{ return { err:data.message, data}; }
        })
        .catch((err) => {
            throw(err);
        });
}

function getUser(){
    const endpoint = "/api/user/me";
    const user = request(endpoint);
    console.log(user);
    if(user){ 
        return user;
    }
    else{ 
        return false; 
    }
}
