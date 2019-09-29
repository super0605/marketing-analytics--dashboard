import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ADAuthAction, getMyAccountAction } from '../redux/constants';
import { AuthState, MsalUserData } from '../redux/types/auth';

import jsCookie from 'js-cookie';
import Cookies from 'next-cookies';
import jwtDecode from 'jwt-decode';
import { login, logout, acquireUserTokenSilent, getUser } from '../util/authentication';

import styled from "styled-components";
import { TopNav, H1 } from "../components/";
import { HeadStyle } from "../constants/head";

import InputField from "../components/ui/inputs/InputField";
import Button from "../components/ui/inputs/Button";
import TextLink from "../components/ui/inputs/TextLink";
import { BaseCSS } from 'styled-bootstrap-grid';
import { px, sizes } from '../constants/constants';

const currentTime = Date.now();

const ContentArea = styled.div`
  width: 456px;
  margin: 132px auto 0;
`;

const PasswordFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: end;
  align-items: end;
  margin-top: ${px(sizes.junior)};
  margin-bottom: ${px(sizes.junior)};
`;

const TextLinkWrapper = styled.div`
  margin-top: ${px(sizes.fine)};
`;

interface HomeProps {
  dispatch: Dispatch,
  authInfo?: AuthState,
}

interface HomeStates {
  isAuth: boolean;
}

class Home extends Component<HomeProps, HomeStates> {
  static async getInitialProps(context) {
    const curTime = new Date().getTime();
    const userAgent = 'node';
    const { store } = context;

    const isServer = !!context.req

    const { access_token } = Cookies(context)
    const login_user: MsalUserData = access_token ? jwtDecode(access_token) : null

    if (login_user && isServer) {
      if (curTime < login_user.exp * 1000) {
        await store.dispatch({
          type: ADAuthAction.AUTHENTICATION_SUCCESS,
          token: access_token
        })
      } 
    } 

    return { userAgent: userAgent }
  }

  constructor(props: HomeProps) {
    super(props)
    this.state = {
      isAuth: this.props.authInfo.user ? true : this.props.authInfo.isAuth
    }
  }

  async componentDidMount() {

    // await this.renewToken();
    await this.authCheck();

  }

  validatedIdToken = (idToken) => {
    const loginUser: MsalUserData = jwtDecode(idToken);
    if (loginUser.exp * 1000 < currentTime) {
      return null;
    }

    return idToken;
  }

  authCheck = async () => {
    const { dispatch }: HomeProps = this.props;
    const idToken: string = localStorage.getItem('msal.idtoken') ? this.validatedIdToken(localStorage.getItem('msal.idtoken')) : null;

    if (getUser() && this.state.isAuth) {
      dispatch({ type: getMyAccountAction.GET_MY_ACCOUNT_REQUEST });
    }

    if (!this.state.isAuth && idToken !== null && idToken && getUser()) {
      this.setState({ isAuth: true })
      var inSixtyMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);

      jsCookie.set("access_token", idToken, { expires: inSixtyMinutes });

      await dispatch({ type: ADAuthAction.AUTHENTICATION_SUCCESS, token: idToken });
      await dispatch({ type: getMyAccountAction.GET_MY_ACCOUNT_REQUEST });
      // Router.push('/clients');
    }

    // if (idToken == undefined || idToken == null) {
    //   this.initLogin();
    // }
  }

  renewToken = () => {
    const loginUser: MsalUserData = localStorage.getItem('msal.idtoken') ? jwtDecode(localStorage.getItem('msal.idtoken')) : null;

    if (loginUser && loginUser.exp * 1000 < currentTime) {
      if (this.state.isAuth) {
        const user = getUser();
        acquireUserTokenSilent(user).then(data => {
          const { newIdToken } = { ...data }
          if (newIdToken) {
            jsCookie.remove('access_token');
            const inSixtyMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);
            jsCookie.set("access_token", newIdToken, { expires: inSixtyMinutes });
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }

  initLogin = () => {
    if (!this.state.isAuth) {
      const { dispatch } = this.props

      dispatch({ type: ADAuthAction.AUTHENTICATION_START });

      login();

    }
    else {
      jsCookie.remove('access_token');
      this.setState({ isAuth: false });
      logout();
    }

  }

  handleLogClick = () => {
    this.initLogin();
  }

  render() {
    return (
      <div>
        {
          !this.state.isAuth && (
            // <div>LOADING....</div>
            <div className="hero">
              <h1 className="title">Welcome to 10thMan!</h1>
              <div className="row">
                <button className="btn btn-primary" onClick={() => this.handleLogClick()}>{this.state.isAuth ? "logout" : "login"}</button>
              </div>
            </div>
          )
        }

        {
          this.state.isAuth && (
            <div>
              <HeadStyle />
              <BaseCSS />
              <TopNav loggedIn={this.state.isAuth} />

              <ContentArea>
                <H1 content="Login"></H1>

                <InputField label="Email address" placeholder="hello@10thman.media" theme="login" />

                <PasswordFieldContainer>
                  <InputField label="Password" type="password" theme="login" />
                  <TextLinkWrapper>
                    <TextLink label="Forgot password?" />
                  </TextLinkWrapper>
                </PasswordFieldContainer>

                <Link href='/clients' as='/clients'><a><Button label="Login" /></a></Link>
                <a onClick={() => this.handleLogClick()}><Button label="Logout" /></a>
              </ContentArea>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authInfo: state.auth
});

export default connect(mapStateToProps)(Home);
