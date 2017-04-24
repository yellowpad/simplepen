import React from 'react';
import {	Navbar, Nav, NavItem	} from 'react-bootstrap';

const Footer = () => {
	return (
		<Navbar bsStyle="default" fixedBottom>
			<Nav pullLeft>
				<NavItem disabled><p>© 2016 Project, Inc. All Rights Reserved </p></NavItem>
			</Nav>
			<Nav pullRight>
				<NavItem>GitHub Project</NavItem>
				<NavItem>Issues</NavItem>
			</Nav>
		</Navbar>
		);
};

export default Footer;