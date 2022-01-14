/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      username: '',
    };
    this.callGetUser = this.callGetUser.bind(this);
  }

  componentDidMount() {
    console.log('componente montado');
    this.callGetUser();
  }

  async callGetUser() {
    const handleUserName = await getUser();
    this.setState({
      isLoading: true,
      username: handleUserName.name,
    });
    return handleUserName;
  }

  render() {
    const { isLoading, username } = this.state;
    return (
      <header data-testid="header-component">
        <h1>
          <p data-testid="header-user-name"> {
            isLoading
              ? username
              : <Loading />
          }
          </p>

        </h1>
        {

        }
      </header>
    );
  }
}