import initialState from './initialState';
import {
	SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
	LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
	LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE
} from '../actions/actionTypes';

export default function auth(state= {
	isFetching: initialState.isFetching,
	isAuthenticated: initialState.isAuthenticated,
	user: null
	}, action){
	switch(action.type){
		case SIGNUP_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: false,
				user: action.creds
			});
		case SIGNUP_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false,
				user: action.creds
			});
		case SIGNUP_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false,
				error: action.error
			});
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: false,
				user: action.creds
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: true,
				user: action.creds
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false,
				error: action.error
			});
		case LOGOUT_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: true,
				user: action.creds
			});
		case LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false,
				user: action.creds
			});
		case LOGOUT_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false,
				error: action.error
			});
		case LOAD_USER_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: false,
				token: action.token
			});
		case LOAD_USER_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: true,
				user: action.user
			});
		case LOAD_USER_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false,
			});

		default:
			return state;
	}
}