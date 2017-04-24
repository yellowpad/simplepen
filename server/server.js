import express from 'express';
import webpack from 'webpack';
import { connect } from './db';
import expressConfig from './config/express';
import routesConfig from './config/routes';
import path from 'path';  
import config from '../webpack.config.dev';

console.log('Server Environment: ' + process.env.NODE_ENV);
/* eslint-disable no-console */

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();
const port = process.env.PORT || 3009;
const app = express();


if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Bootstrap application settings
 */
expressConfig(app);

routesConfig(app);

app.use(function (err, req, res, next) {
  // error handling from promises
  console.log('MIDDLEWARE FOR HANDLING ERRORS FROM PROMISES');
  if (err) {
    console.log('ERROR FROM PROMISE');
    console.log(err);
    return res.status(500).send(err);
  }
  next();
});

app.get('*', function(req, res) {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join( __dirname, '../public/index.html'));
  } else {
    res.sendFile(path.join( __dirname, '../src/index.html'));
  }
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`serving from http://localhost:${port}`);
  }
});
