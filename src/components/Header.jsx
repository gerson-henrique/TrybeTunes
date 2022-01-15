/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
          <p
            data-testid="header-user-name"
          >
            {' '}
            {
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
