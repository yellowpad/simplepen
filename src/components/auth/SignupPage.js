import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import SignupForm from './SignupForm';


class SignupPage extends Component {
	constructor(props){
		super(props);
		this.signupUser = this.signupUser.bind(this);
	}

	signupUser(creds){
		//console.log('in page');
		this.props.actions.signupUser(creds);
	}

	render(){
		return (
			<SignupForm
				errorMessage={this.errorMessage}
				signupUser={this.signupUser}
			/>
			);
	}
}

SignupPage.propTypes = {
	actions: PropTypes.object.isRequired
};

//function mapStateToProps(state, ownProps){
//	return {
//		//errorMessage: state.errorMessage
//	};
//}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(SignupPage);