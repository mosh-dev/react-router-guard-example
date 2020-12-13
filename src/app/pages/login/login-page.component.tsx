import React, { Component, ReactNode } from 'react';
import { ObjectMap } from '../../../typings';

class LoginPageComponent extends Component<ObjectMap, ObjectMap> {

  private navigate(path: string) {
    this.props.history.push(path);
  }

  private handleSubmit = async event => {
    event.preventDefault();
    localStorage.setItem('loggedIn', '1');
    this.navigate('dashboard');
  };


  render(): ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Sign In</button>
      </form>
    );

  }

}

export const LoginPage = LoginPageComponent;
export default LoginPage;
