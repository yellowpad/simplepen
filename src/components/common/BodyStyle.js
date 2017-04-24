import React, {	PropTypes  } from 'react';

class BodyStyle extends React.Component {

	componentDidMount() {
		document.body.classList.toggle('home', this.props.isHome);
	}
	componentWillReceiveProps(nextProps)	{
		document.body.classList.toggle('home', nextProps.isHome);
	}
	componenetWillUnmount()	{
		document.body.classList.remove('home');
	}
	render(){
		return	(
			<div>
				{this.props.children}
			</div>
		);
	}
}

BodyStyle.propTypes ={
	children: PropTypes.node,
	isHome: PropTypes.bool
};

BodyStyle.defaultProps = {
	isHome: false
};

export default BodyStyle;