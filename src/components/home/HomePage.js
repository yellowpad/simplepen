import React from 'react';
import BodyStyle from '../common/BodyStyle';
import {Row, Col} from 'react-bootstrap';

const Home = () => {
	return (
		<BodyStyle>
			<h1>React-Node-Boilerplate</h1>
			<p className="lead"> A ReactJS boilerplate for Node.js web applications</p>
			<div>
				<Row>
					<Col sm={6}>
						<h2>Header</h2>
						<p>
						Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
						tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
						massa justo sit amet risus. Etiam porta sem malesuada magna mollis
						euismod. Donec sed odio dui.
						</p>
						<p>
						<a className="btn btn-default" href="#" role="button">Learn More »</a>
						</p>
					</Col>
					<Col sm={6}>
						<h2>Header</h2>
						<p>
						Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
						tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
						massa justo sit amet risus. Etiam porta sem malesuada magna mollis
						euismod. Donec sed odio dui.
						</p>
						<p>
						<a className="btn btn-default" href="#" role="button">Learn More »</a>
						</p>
					</Col>
					<Col sm={6}>
						<h2>Header</h2>
						<p>
						Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
						tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
						massa justo sit amet risus. Etiam porta sem malesuada magna mollis
						euismod. Donec sed odio dui.
						</p>
						<p>
						<a className="btn btn-default" href="#" role="button">Learn More »</a>
						</p>
					</Col>
					<Col sm={6}>
						<h2>Header</h2>
						<p>
						Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
						tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
						massa justo sit amet risus. Etiam porta sem malesuada magna mollis
						euismod. Donec sed odio dui.
						</p>
						<p>
						<a className="btn btn-default" href="#" role="button">Learn More »</a>
						</p>
					</Col>
				</Row>
			</div>

		</BodyStyle>

		);
};

Home.propTypes = {};

export default Home;