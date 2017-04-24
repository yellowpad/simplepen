import React, { PropTypes } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, ButtonToolbar} from 'react-bootstrap';


const LoginForm = ({handleChange, handleSubmit}) => {
		return(
			<div>
			<h2>Login</h2>
			<hr/>
			<Form inline className="formbody">
				<FormGroup className="control-group">
					<ControlLabel><h3>Email</h3></ControlLabel>
					<br/>
					<FormControl
						className="form-control"
						name="email"
						type="email"
						placeholder="Email"
						onChange={handleChange}
					/>
					<br/>
					<ControlLabel><h3>Password</h3></ControlLabel>
					<br/>
					<FormControl
						className="form-control"
						name="pass"
						type="password"
						onChange={handleChange}
					/>
				</FormGroup>
					<p>&nbsp;</p>
				<ButtonToolbar bsSize="large">
					<button
						onClick={handleSubmit}
						className="btn btn-lg btn-info btn-login">
						Login
					</button>
					<ButtonToolbar />
				</ButtonToolbar>

			</Form>
			</div>
			);
};

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired
};

export default LoginForm;
