import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    console.log('APP.onTryAutoSignup');
    this.props.onTryAutoSignup();
  }

  /**state = {
    show: true
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({show: false});
    }, 5000);
  }*/
  render () {
    //{this.state.show ? <BurgerBuilder /> : null}
    let routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/Orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/"/>
          </Switch>);
    }
    return (
      <div>
        <Layout>      
          {routes}
           {/* <BurgerBuilder />
            <Checkout />*/}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
