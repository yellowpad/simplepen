import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ButtonToolbar, ControlLabel } from 'react-bootstrap';


export default class ContactPage extends Component {
	constructor(props){
		super(props);
		this.state ={
			name:"",
			email:"",
			subject:"",
			body:""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit(e){
		if(e){e.preventDefault();}
		const email = this.refs.email;
		console.log(email);
		for(let key in this.state){
			if (this.state[key] === ""){
				//console.log("form is not complete");
				return;
			}
		}
		//console.log(this.state);

	}

	handleClear(e){
		if(e){e.preventDefault();}

	}

	handleChange(e){
		if(e){ e.preventDefault();}
		const field = e.target.name;
		this.setState({[field] : e.target.value});
	}

	render(){
		return(
			<Form name="contact-form" className="formbody">
				<FormGroup>
					<ControlLabel>Name</ControlLabel>
					<FormControl
						type="text"
						id="name"
						name="name"
						onChange={this.handleChange}
						/>
					<p>&nbsp;</p>
					<ControlLabel>Email Address</ControlLabel>
					<FormControl
						type="text"
						id="email"
						name="email"
						onChange={this.handleChange}
						/>
				</FormGroup>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<FormGroup>
					<ControlLabel>Subject</ControlLabel>
					<FormControl
						type="text"
						id="subject"
						name="subject"
						onChange={this.handleChange}
						/>
					<p>&nbsp;</p>
					<ControlLabel>Body</ControlLabel>
					<FormControl
						type="textarea"
						componentClass="textarea"
						placeholder="Place the body of your email here"
						id="contactbody"
						name="body"
						onChange={this.handleChange}
						/>
				</FormGroup>
				<ButtonToolbar bsSize="large">
					<button
						onClick={this.handleSubmit}
						className="btn btn-lg btn-info">
						Submit
					</button>
					<button
						onClick={this.handleClear}
						className="btn btn-lg btn-defualt">
						Clear
					</button>
				</ButtonToolbar>

			</Form>
			);
	}
}
