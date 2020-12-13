import { lazy } from 'react';
import { RouteModel } from '../../../routing/routing';

export const DASHBOARD_ROUTES: RouteModel[] = [
  {
    path: 'posts',
    component: lazy(() => import('../pages/posts/posts.component')),
    title: 'Posts'
  },
  {
    path: 'new-post',
    component: lazy(() => import('../pages/create-post/create-post.component')),
    title: 'Posts'
  },
  {
    path: '',
    component: lazy(() => import('../pages/posts/posts.component')),
    exact: true,
    title: 'Posts'
  },
];
