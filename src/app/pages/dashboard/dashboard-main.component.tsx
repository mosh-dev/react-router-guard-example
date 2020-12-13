import React, { Component } from 'react';
import { AppRouterOutlet } from '../../routing/app-router-outlet.component';
import { DASHBOARD_ROUTES } from './routing/dashboard.routing';

class DashboardMainComponent extends Component {
  public render() {
    const logOut = () => {
      localStorage.removeItem('loggedIn');
      window.location.href = '/';
    };
    return (
      <>
        <button onClick={logOut}>Log Out</button>
        <AppRouterOutlet {...this.props} rootPath={'dashboard'} routes={DASHBOARD_ROUTES}/>
      </>
    );
  }
}

export default DashboardMainComponent;
