import React, { PropTypes, Component } from 'react';
import Header from './common/header';
import Footer from './common/footer';
import {Grid} from './flexbox';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';


class App extends Component {
  constructor(props,context){
    super(props,context);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(){
    this.props.actions.logoutUser();
  }
  render() {

    const { isAuthenticated, user } = this.props;
    return (
      <div>
        <NotificationsSystem theme={theme} />
        <Grid fluid>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <Header 
                  isAuthenticated={isAuthenticated}
                  user={user} 
                  logoutUser={this.logoutUser}
                  />
              </div>
            </div>
          </div>
          {this.props.children}
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <Footer/>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  let user = {};
  const { auth } = state;
  const { isAuthenticated } = auth;
  if(state.auth.user){
    user = state.auth.user;
  }
  return {
    isAuthenticated,
    user
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);