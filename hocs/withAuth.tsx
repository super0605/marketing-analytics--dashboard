import React, { Component } from 'react'
import { loggedIn, logout } from '../util/authentication';
import Router from 'next/router'

export default function withAuth(AuthComponent) {

  interface AuthenticatedState {
    isAuthenticated: Boolean;
  }
  return class Authenticated extends Component<{}, AuthenticatedState> {

    constructor(props: {}) {
      super(props)
      this.state = {
        isAuthenticated: false
      };
    }

    async componentDidMount() {
      if (loggedIn() == false) {
        // logout();
        this.setState({ isAuthenticated: false });
        Router.push('/');
      } else {
        this.setState({ isAuthenticated: true })
      }
    }

    render() {
      return (
        <div>
          {
            this.state.isAuthenticated == false ?
            (
              <div>LOADING....</div>
            ) :
            (
              <AuthComponent {...this.props} isAuthenticated={this.state.isAuthenticated} />
            )
          }
        </div>
      )
    }
  }
}