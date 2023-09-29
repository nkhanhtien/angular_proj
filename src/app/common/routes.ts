import { Routes } from '@angular/router';
import { LoginFormComponent } from '../auth/containers/login-form/login-form.component';
import { AuthGuardService } from '../auth/services';
import { DashboardViewerComponent } from '../dashboard/containers/dashboard-viewer/dashboard-viewer.component';
import { Demo1FormComponent } from '../demo/containers/demo-1-form/demo-1-form.component';
import { Demo2FormComponent } from '../demo/containers/demo-2-form/demo-2-form.component';
import { Demo3FormComponent } from '../demo/containers/demo-3-form/demo-3-form.component';
import { ActivityDetailComponent } from '../activity/container/activity-detail/activity-detail.component';
import { NotFoundPageComponent } from '../error/containers/not-found-page/not-found-page.component';
import { ActivitiesViewerComponent } from '../activity/container/activities-viewer/activities-viewer.component';
import { PermissionDeniedPageComponent } from '../error/containers/permission-denied/permission-denied-page.component';
import { ROLES } from './const';
import { DatasetViewerComponent } from '../dataset/container/dataset-viewer/dataset-viewer.component';
import { CreateDatasetComponent } from '../dataset/container/create-dataset/create-dataset.component';
import { TagViewerComponent } from '../user-group/container/tag-viewer/tag-viewer.component';
import { UserManagementComponent } from '../user/container/user-management/user-management.component';
import { CreateUserComponent } from '../user/container/create-user/create-user.component';

export const mainRoutes: Routes = [];

export const errorRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: 'permission-denied', component: PermissionDeniedPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    data: {
      title: 'auth.login-form.login',
    },
  },
  {
    path: 'admin',
    component: DashboardViewerComponent,
    data: {
      title: 'dashboard.dashboard-container.dashboard',
      roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    },
    canActivate: [AuthGuardService],
  },
  {
    path: 'logout',
    component: LoginFormComponent,
    data: {
      title: 'auth.login-form.login',
      roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    },
    canActivate: [AuthGuardService],
  },
];

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardViewerComponent,
    data: {
      title: 'dashboard.dashboard-container.dashboard',
      roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    },
    canActivate: [AuthGuardService],
  },
];

export const demoRoutes: Routes = [
  {
    path: 'demo1',
    component: Demo1FormComponent,
    data: {
      title: 'demo.demo1',
      roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    },
    canActivate: [AuthGuardService],
  },
  {
    path: 'demo2',
    component: Demo2FormComponent,
    data: {
      title: 'demo.demo2',
      roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    },
    canActivate: [AuthGuardService],
  },
  {
    path: 'demo3',
    component: Demo3FormComponent,
    data: {
      title: 'demo.demo3',
      roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    },
    canActivate: [AuthGuardService],
  }
];

export const activityRoutes: Routes = [
  {
    path: 'activities',
    data: {
      title: 'activity.list',
    },
    children: [
      {
        path: '',
        component: ActivitiesViewerComponent,
        data: {
          title: 'activity.list',
          roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        },
        canActivate: [AuthGuardService]
      },
      {
        path: 'create',
        component: ActivityDetailComponent,
        data: {
          title: 'dataset.detail',
          roles: [ROLES.ADMIN],
        },
        canActivate: [AuthGuardService],
      },
      {
        path: ':id',
        component: ActivityDetailComponent,
        data: {
          title: 'dataset.detail',
          roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        },
        canActivate: [AuthGuardService],
      },
    ]
  }
];

export const datasetRoutes: Routes = [
  {
    path: 'datasets',
    data: {
      title: 'dataset.list',
      roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    },
    children: [
      {
        path: '',
        component: DatasetViewerComponent,
        data: {
          title: 'dataset.list',
          roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        },
        canActivate: [AuthGuardService]
      },
      {
        path: 'create',
        component: CreateDatasetComponent,
        data: {
          title: 'dataset.create',
          roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        },
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        component: CreateDatasetComponent,
        data: {
          title: 'dataset.detail',
          roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        },
        canActivate: [AuthGuardService],
      },
    ],
  },
];

export const userGroupRoutes: Routes = [
  {
    path: 'tags',
    data: {
      title: 'tag.tag-list',
    },
    children: [
      {
        path: 'tag-list',
        component: TagViewerComponent,
        data: {
          title: 'tag.tag-list',
          roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        },
        canActivate: [AuthGuardService]
      },
    ]
  }
];

export const userRoutes: Routes = [
  {
    path: 'users',
    data: {
      title: 'User Management',
      roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: '/users/admin',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        data: {
          title: 'Admin List',
          roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
          roleName: ROLES.ADMIN
        },
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            data: {
              title: 'Admin List',
              roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
              roleName: ROLES.ADMIN
            },
            canActivate: [AuthGuardService],
            component: UserManagementComponent
          },
          {
            path: 'create',
            data: {
              title: 'Create Admin',
              roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
              roleName: ROLES.ADMIN
            },
            canActivate: [AuthGuardService],
            component: CreateUserComponent
          },
          {
            path: ':id',
            data: {
              title: 'Admin Details',
              roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
              roleName: ROLES.ADMIN
            },
            canActivate: [AuthGuardService],
            component: CreateUserComponent
          },
        ]
      },
      {
        path: 'user',
        data: {
          title: 'User List',
          roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
          roleName: ROLES.USER
        },
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            data: {
              title: 'User List',
              roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
              roleName: ROLES.USER
            },
            canActivate: [AuthGuardService],
            component: UserManagementComponent
          },
          {
            path: 'create',
            data: {
              title: 'Create User',
              roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
              roleName: ROLES.USER
            },
            canActivate: [AuthGuardService],
            component: CreateUserComponent
          },
          {
            path: ':id',
            data: {
              title: 'User details',
              roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
              roleName: ROLES.USER
            },
            canActivate: [AuthGuardService],
            component: CreateUserComponent
          },
        ]
      },
    ]
  }
]