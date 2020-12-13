import React, { Component, Suspense } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { ObjectMap } from '../../typings';
import { from, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OutLetProps, RouteModel } from './routing';

enum RenderState {
  resolved,
  resolving,
  notResolved
}

class RenderedRouteComponent extends Component<RouteModel & RouteComponentProps> {
  state: ObjectMap = {
    renderState: RenderState.resolving,
  };
  private componentDestroyed = new Subject();

  componentDidMount(): void {
    /**
     * Lets run Guard Resolvers
     */
    if (this.props.guards) {
      from(this.resolveGuards(this.props.guards))
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(result => {
          const renderState = result ? RenderState.resolved : RenderState.notResolved;
          this.setState({renderState});
        });
    } else {
      this.setState({renderState: RenderState.resolved});
    }
  }

  componentWillUnmount(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  private async resolveGuards(guards: any[]): Promise<boolean> {
    guards = [...guards.reverse()];
    return new Promise(resolve => {
      const runGuards = async (guards) => {
        /**
         *  Run guards One By One Using Recursive Call
         */
        const guard = guards.pop();
        if (guard) {
          const result = guard(this.props);
          switch (true) {
            case typeof result === 'boolean':
              result ? await runGuards(guards) : resolve(result);
              break;
            case result instanceof Promise:
              const promiseResult = await result;
              promiseResult ? await runGuards(guards) : resolve(promiseResult);
              break;
            case result instanceof Observable:
              const obResult = await result.toPromise();
              obResult ? await runGuards(guards) : resolve(obResult);
              break;
          }
        } else {
          /**
           * When all Guards Passed or no guard
           */
          resolve(true);
        }
      };
      runGuards(guards);
    });
  }


  /**
   * Lazy Component DoesNot Work Directly in render Prop
   * And We Should also Pass Props Given From React Router
   * as we may need tem inside our Rendered Components
   */
  render() {
    const {component: Children, ...rest} = this.props;
    switch (this.state.renderState) {
      case RenderState.resolved:
        return <Route {...rest} render={props => <Children {...props}/>}/>;
      case RenderState.resolving:
        return <p>Loading</p>;
      case RenderState.notResolved:
        return null;
    }
  }
}

const RenderedRoute = withRouter(RenderedRouteComponent);

const AppRouterOutlet = ({rootPath, routes = [], ...rest}: OutLetProps) => {
  /**
   * Resolve '/' mismatch in paths
   * So that we dont need to worry about putting '/' before or after in out routes
   */
  const PARSED_ROUTES = routes
    .map((r: RouteModel) => ({...r, path: (rootPath ? rootPath + '/' : '') + r.path}))
    .map((r: RouteModel) => ({...r, path: '/' + r.path.split(/\/?\//).join('/')}));
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Switch>
        {PARSED_ROUTES.map((route, index) => <RenderedRoute {...rest} {...route} key={index}/>)}
      </Switch>
    </Suspense>
  );
};


export { AppRouterOutlet }
