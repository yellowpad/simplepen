import {addNotification as notify} from 'reapop';

const DEFAULT_DISMISSAL = 3500;

function nDefault(message, pos='br', stat='default'){
	return (dispatch) => {
		dispatch(notify({
			message : message,
			closeButton : true,
			dismissible : true,
			dismissAfter : DEFAULT_DISMISSAL,
			allowHTML : true,
			position : pos,
			status : stat
		}));	
	};
}

function nInfo(message, pos='br'){
	return (dispatch) => {
		dispatch(notify({
			message : message,
			closeButton : true,
			dismissible : true,
			dismissAfter : DEFAULT_DISMISSAL,
			allowHTML : true,
			position : pos,
			status : 'info'
		}));	
	};
}

function nSuccess(message, pos='br'){
	return (dispatch) => {
		dispatch(notify({
			message : message,
			closeButton : true,
			dismissible : true,
			dismissAfter : DEFAULT_DISMISSAL,
			allowHTML : true,
			position : pos,
			status : 'success'
		}));	
	};
}

function nError(message, pos='br'){
	return (dispatch) => {
		dispatch(notify({
			message : message,
			closeButton : true,
			dismissible : true,
			dismissAfter : DEFAULT_DISMISSAL,
			allowHTML : true,
			position : pos,
			status : 'error'
		}));	
	};
}

function nWarn(message, pos='br'){
	return (dispatch) => {
		dispatch(notify({
			message : message,
			closeButton : true,
			dismissible : true,
			dismissAfter : DEFAULT_DISMISSAL,
			allowHTML : true,
			position : pos,
			status : 'warning'
		}));	
	};
}

const notification = {
	Default: nDefault,
	Info: nInfo, 
	Warn: nWarn, 
	Error: nError, 
	Success: nSuccess
};

export default notification;