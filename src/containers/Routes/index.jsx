import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppWrapper from '../../components/AppWrapper';
// Pages
import Home from '../Home';
import Explore from '../Explore';
import Booking from '../Booking';
import Flights from '../Flights';
import Membership from '../Membership';
import Details from '../Details';
import Login from '../Login';
import Signup from '../Signup';
import Admin from '../Admin';
import PageNotFound from '../PageNotFound';
import axios from 'axios';

function AuthenticateRoute({component: Component, ...props}) {
  return (
    <Route
      {...props}
      render={(props) => !!localStorage.token ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}}/>
      }
    />
  )
}

class Routes extends Component {
  render() {
    return (
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Explore} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/flights" component={Flights} />
          <Route exact path="/flights/details/:schedule_id/:flight_schedule_id" component={Details} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <AuthenticateRoute path="/booking" component={Booking} />
          <AuthenticateRoute path="/membership" component={Membership} />
          <AuthenticateRoute path="/admin" component={Admin} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </AppWrapper>
    );
  }
}

export default Routes;