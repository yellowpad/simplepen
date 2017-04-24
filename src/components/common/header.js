import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {	Navbar, Nav, NavItem	} from 'react-bootstrap';

const Header = ({ isAuthenticated, user, logoutUser}) => {
	return (
		<Navbar className="navnav" inverse fixedTop collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">Project Name</Link>
				</Navbar.Brand>
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<LinkContainer to="/">
						<NavItem>HOME</NavItem>
					</LinkContainer>
					<LinkContainer to="/about">
						<NavItem>ABOUT</NavItem>
					</LinkContainer>
					<LinkContainer to="/contact">
						<NavItem>CONTACT</NavItem>
					</LinkContainer>
				</Nav>
				{!isAuthenticated &&
					<Nav pullRight>
						<LinkContainer to="/login">
							<NavItem>LOGIN</NavItem>
						</LinkContainer>
						<LinkContainer to="/signup">
							<NavItem>SIGNUP</NavItem>
						</LinkContainer>
					</Nav>
				}
				{isAuthenticated && user &&
					<Nav pullRight>
						<NavItem>name</NavItem>
						<NavItem onClick={logoutUser}>Logout</NavItem>
					</Nav>
				}
			</Navbar.Collapse>
		</Navbar>
		);
};
Header.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
};

export default Header;

//account --> user.Name