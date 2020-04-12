
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// improt 페이지 목록
import Main from 'Page/Main';
import Cart from 'Page/Cart';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/cart" component={Cart} />
      <Redirect to="/error" />
    </Switch>
  </Router>
);

export default Routes;
