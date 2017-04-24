import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import LoginForm from './LoginForm';
import validator from 'validator';


class LoginPage extends Component {
	constructor(props){
		super(props);
		this.state ={
			email:'',
			pass:'',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signupUser = this.signupUser.bind(this);
	}

	handleSubmit(e){
		if(e){ e.preventDefault();  }
		if(!(this.state.email === '' || this.state.pass === '')){
			if(validator.isEmail(this.state.email)){
				let creds ={
					email: this.state.email,
					password: this.state.pass
				};
				console.log(this.state);
				this.props.actions.loginUser(creds);
			}
		}
		else{
			return;
		}

	}

	signupUser(creds){
		this.props.actions.signupUser(creds);
	}

	handleChange(e){
		if(e){e.preventDefault();}
		const name = e.target.name;
		this.setState({[name]: e.target.value});
	}

	render(){
		return (
			<div>
				<LoginForm
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				/>
			</div>
			);
	}
}

LoginPage.propTypes = {
	actions: PropTypes.object.isRequired
};


function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(LoginPage);