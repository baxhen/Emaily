import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState } from '../reducers';
import { User } from '../actions';
import { Payments } from './Payments';

interface HeaderProps {
  auth: User;
}

class _Header extends React.Component<HeaderProps> {
  renderContent() {
    switch (this.props.auth._id) {
      case 'default':
        return;
      case undefined:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0 10px' }}>
              Credits: {this.props.auth.credits}
            </li>
            <li>
              <a href="/api/logout">Log out</a>
            </li>
          </>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth.googleId ? '/surveys' : '/'}
            className="brand-logo"
          >
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return { auth: state.auth };
};

export const Header = connect(mapStateToProps)(_Header);
