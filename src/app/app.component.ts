import {Component} from 'react';

class AppComponent extends Component {
  render() {
    return this.props.children;
  }
}

const App = AppComponent;

export {App};
