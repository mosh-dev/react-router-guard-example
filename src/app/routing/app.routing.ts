import { lazy } from 'react';
import { asyncAuthGuardObservable } from './guards/auth.guard';
import { RouteModel } from './routing';
import { publicGuard } from './guards/public.guart';

export const APP_ROUTES: RouteModel[] = [
  {
    path: '',
    component: lazy(() => import('../pages/login/login-page.component')),
    exact: true,
    guards: [publicGuard]
  },
  {
    path: 'dashboard',
    component: lazy(() => import('../pages/dashboard/dashboard-main.component')),
    guards: [asyncAuthGuardObservable]
  }
];
