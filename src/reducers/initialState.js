export default {
	isFetching: false,
	isAuthenticated: localStorage.getItem('usertoken') ? true: false,
	auth: {}
};
