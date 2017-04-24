import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar} from 'react-bootstrap';
import validator from 'validator';

const emailisValid = "Must Enter Valid Email.",
	emailMatch = "Emails Must Match.",
	passisValid = "Password Length must be more than 8 characters.",
	passMatch = "Passwords Must Match.";

export default class SignupForm extends Component {
	constructor(props){
		super(props);
		this.state ={
			first: '',
			last: '',
			email:'',
			emailConfirm:'',
			pass:'',
			passConfirm:'',
		};
		this.errors = {passerror:'', emailerror:''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.passValid = this.passValid.bind(this);
		this.emailValid = this.emailValid.bind(this);
	}

	passValid(){
		if((this.state.pass === '') && (this.state.passConfirm === '')){
			return null;
		}
		if((this.state.pass!=='')&& (this.state.pass.length < 8)){
			this.errors.passerror = passisValid;
			return 'warning';
		}
		if((this.state.passConfirm!=='')&&(this.state.passConfirm!==this.state.pass)){
			this.errors.passerror = passMatch;
			return 'error';
		}
		if(this.state.pass === this.state.passConfirm){
			this.errors.passerror = '';
			return 'success';
		}
	}

	emailValid(){
		if((this.state.email === '') && (this.state.emailConfirm === '')){
			return null;
		}
		if( (this.state.email !== '') && (!validator.isEmail(this.state.email))){
			this.errors.emailerror = emailisValid;
			return 'warning';
		}
		if((this.state.email!== '') && (this.state.email !== this.state.emailConfirm)){
			this.errors.emailerror = emailMatch;
			return 'error';
		}
		if(this.state.email === this.state.emailConfirm){
			this.errors.emailerror = '';
			return 'success';
		}

	}

	handleReset(e){
		if(e){e.preventDefault();}
		for(let key in this.state){
			this.setState({[key]:''});
		}
		return;
	}

	handleSubmit(e){
		if(e){ e.preventDefault();  }
		if(!(this.state.email === '' || this.state.pass === '')){
			if((this.errors.emailerror==='') &&
				(this.errors.passerror==='')){
				let creds ={
					first: this.state.first,
					last: this.state.last,
					email: this.state.email,
					password: this.state.pass
				};
				this.props.signupUser(creds);
			}
		}
		else{
			return;
		}

	}

	handleChange(e){
		if(e){e.preventDefault();}
		const name = e.target.name;
		this.setState({[name]: e.target.value});
	}

	render(){

		return(
			<div>
			<h2>Signup</h2>
			<hr/>
			<Form inline className="formbody">
				<FormGroup className="control-group">
					<ControlLabel><h3>First Name</h3></ControlLabel>
					<br/>
					<FormControl
						className="form-control"
						name="first"
						ref="first"
						type="text"
						placeholder="First Name"
						value={this.state.first}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<FormGroup className="control-group">
					<ControlLabel><h3>Last Name</h3></ControlLabel>
					<br/>
					<FormControl
						className="form-control"
						name="last"
						ref="last"
						type="text"
						placeholder="Last Name"
						value={this.state.last}
						onChange={this.handleChange}
					/>
				</FormGroup>
				{this.state.nameError && <HelpBlock>{this.state.nameError}</HelpBlock>}
			</Form>
			<Form inline className="formbody">
				<FormGroup validationState={this.emailValid()} className="control-group block pullLeft">
					<ControlLabel><h3>Email</h3></ControlLabel>
					<br/>
					<FormControl
						className="form-control"
						name="email"
						ref="email"
						type="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					{((this.errors.emailerror === emailisValid) && <HelpBlock>{emailisValid}</HelpBlock>) ||<HelpBlock>Required</HelpBlock> }
				</FormGroup>
				<FormGroup validationState={this.emailValid()} className="control-group block pullRight">
					<ControlLabel><h3>Confirm Email</h3></ControlLabel>
					<br/>
					<FormControl
						className="form-control"
						name="emailConfirm"
						ref="emailConfirm"
						type="email"
						placeholder="Confirm your Email"
						value={this.state.emailConfirm}
						onChange={this.handleChange}
					/>
					{((this.errors.emailerror === emailMatch) && <HelpBlock>{emailMatch}</HelpBlock>) ||<HelpBlock>Required</HelpBlock> }
				</FormGroup>
			</Form>
			<Form inline className="formbody">
				<FormGroup validationState={this.passValid()} className="control-group">
					<ControlLabel><h3>Password</h3></ControlLabel>
					<br/>
					<FormControl
						className="form-control"
						name="pass"
						ref="pass"
						type="password"
						placeholder="Password"
						value={this.state.pass}
						onChange={this.handleChange}
					/>
					{((this.errors.passerror === passisValid) && <HelpBlock>{passisValid}</HelpBlock>) ||<HelpBlock>Required</HelpBlock> }
				</FormGroup>
				<FormGroup validationState={this.passValid()} className="control-group">
					<ControlLabel><h3>Confirm Password</h3></ControlLabel>
					<br/>
					<FormControl
						className="form-control"
						name="passConfirm"
						ref="passConfirm"
						type="password"
						placeholder="Confirm Password"
						value={this.state.passConfim}
						onChange={this.handleChange}
					/>
					{((this.errors.passerror === passMatch) && <HelpBlock>{passMatch}</HelpBlock>) ||<HelpBlock>Required</HelpBlock> }
				</FormGroup>
					<p>&nbsp;</p>
				<ButtonToolbar bsSize="large">
					<button
						onClick={this.handleSubmit}
						className="btn btn-lg btn-info btn-signup">
						Signup
					</button>
					<button
						onClick={this.handleReset}
						className="btn btn-lg btn-defualt btn-clear">
						Clear
					</button>
					<ButtonToolbar />
				</ButtonToolbar>

			</Form>
			</div>
			);
	}
}

SignupForm.propTypes = {
	signupUser: PropTypes.func.isRequired
};
