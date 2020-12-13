import { ComponentType, LazyExoticComponent } from 'react';
import { Observable } from 'rxjs';


export interface OutLetProps {
  routes: RouteModel[];
  rootPath?: string;
}

export interface RouteModel {
  path: string;
  component: ComponentType | LazyExoticComponent<any>;
  exact?: boolean;
  title?: string;
  guards?: any[];
}

export type GuardReturnType = boolean | Promise<boolean> | Observable<boolean>;
export type GuardProps = RouteModel & RouteComponentProps;
