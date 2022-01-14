import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      invalMiLen: true,
      loginName: '',
      isLoading: false,
      isready: false,
    };
    this.callCreateUser = this.callCreateUser.bind(this);
  }

  async callCreateUser() {
    const { loginName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: loginName });
    this.setState({ ready: true });
  }

  render() {
    const { invalMiLen, isLoading, isready } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          {!isready ? (
            <label htmlFor="login">
              <input
                data-testid="login-name-input"
                onChange={ ({ target }) => {
                  const minLen = 3;
                  if (target.value.length >= minLen) {
                    this.setState({
                      invalMiLen: false,
                      loginName: target.value,
                    });
                  } else {
                    this.setState({
                      invalMiLen: true,
                      loginName: target.value });
                  }
                } }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ invalMiLen }
                onClick={ this.callCreateUser }
              >
                Entrar
              </button>
            </label>
          ) : (
            <Redirect to="/search" />
          )}

          {isLoading
            ? <Loading />
            : null }
        </form>
      </div>);
  }
}

export default Login;
