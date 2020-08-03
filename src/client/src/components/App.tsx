import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header } from './Header';
import { Landing } from './Landing';
import { Dashboard } from './Dashboard';
import { SurveyNew } from './surveys/SurveyNew';
import { fetchUser } from '../actions';
import history from '../history';

interface AppProps {
  fetchUser(): void;
}

class _App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Router history={history}>
          <div className="container">
            <Header />
            <Route path="/" exact component={Landing}></Route>
            <Route path="/surveys" exact component={Dashboard}></Route>
            <Route path="/surveys/new" component={SurveyNew}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export const App = connect(null, { fetchUser })(_App);
