import React from 'react';
import { Jumbotron, Button, ButtonToolbar, Row, Col, ListGroup } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
//import { Link } from 'react-router';

const AboutPage = () =>{
	return(
		<div>
			<Jumbotron>
				<h1>Node Server Boiler Plate</h1>

				<p>React Node Boilerplate is here to help developers get a jump-start
				on their projects.  We help by generating a project structured with NodeJS server
				seperated from the front-end source.</p>
				<ButtonToolbar>
					<ButtonToolbar />
					<LinkContainer to="/about">
						<Button bsStyle="default">Learn Details</Button>
					</LinkContainer>
					<LinkContainer to="/login">
						<Button bsStyle="success">Get Started »</Button>
					</LinkContainer>
					<ButtonToolbar />
				</ButtonToolbar>
			</Jumbotron>
			<h2>Some Useful Features:</h2>
			<Row className="show-grid">
				<Col sm={8} md={4}>
					<h3>Node</h3>
					<ListGroup bsClass="unstyled">
						<li><a href="https://nodejs.org/">NodeJS</a> is an event-drivin server-side JavaScript Environment that uses non-blocking I/O for light-weight and efficient code</li>
						<li>NodeJS utilizes asynchronous calls to build scalable network applications</li>
						<li><a href="https://expressjs.com/">ExpressJS</a> is a NodeJS framework that provides a large set of features for web application servers out of the box</li>
					</ListGroup>
				</Col>
				<Col sm={8} md={4}>
					<h3>React</h3>
					<ListGroup bsClass="unstyled">
						<li>We use <a href="https://facebook.github.io/react/">ReactJS</a> to create extremely quick Responsive front end designs.</li>
						<li>React uses a built in routing system to traverse a series of webpages efficiently</li>
						<li>Add <a href="https://react-bootstrap.github.io/">React-Bootstrap</a> on top to easily build out entire pages in minutes</li>
					</ListGroup>
				</Col>
				<Col sm={8} md={4}>
					<h3>Webpack and Babel</h3>
					<ListGroup bsClass="unstyled">
						<li><a href="https://webpack.github.io">Webpack</a> is a module bundler that packages your code into a single bundle in memory</li>
						<li><a href="https://bablejs.io">Babel</a> is a JavaScript Compiling Engine that allows developers to use the lasest features of new versions of JavaScript</li>
						<li>Babel takes all the next generation JavaScript you type and converts it down into a stable, supported version of JavaScript</li>
					</ListGroup>
				</Col>
			</Row>
		</div>
		);
};

export default AboutPage;