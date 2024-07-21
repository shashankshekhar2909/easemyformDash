import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { UserdashboardComponent } from './components/user/userdashboard/userdashboard.component';
import { UserhomeComponent } from './components/user/userhome/userhome.component';
import { AuthGuard } from './_guards/auth.guard';
import { AddJobsComponent } from './components/admin/add-jobs/add-jobs.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserCVComponent } from './components/user/user-cv/user-cv.component';
import { UpdateCVComponent } from './components/user/update-cv/update-cv.component';
import { JobsComponent } from './components/user/jobs/jobs.component';
import { JobComponent } from './components/user/job/job.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { UserGuard } from './_guards/user.guard';
import { AdminGuard } from './_guards/admin.guard';
import { AdminUserViewComponent } from './components/admin/admin-user-view/admin-user-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title:'Log In' },
  { path: 'signup', component: SignupComponent, title:'Sign Up' },
  {
    path: 'admin', component: AdmindashboardComponent, children: [
      { path: '', component: AdminhomeComponent, title:'Administrator Dashboard'},  // Placeholder for admin routes
      { path: 'add-job-post', component: AddJobsComponent, title:'Add Jobs'},
      { path: 'view-users', component: UserListComponent, title:'View Users'},
      { path: 'view-user-details', component: AdminUserViewComponent, title:'User Details'},
    ],
  },
  {
    path: 'user', component: UserdashboardComponent, children: [
      { path: '', component: UserhomeComponent,canActivate: [UserGuard], title:'User Dashboard' },  // Placeholder for user routes
      { path: 'view-profile', component: UserProfileComponent,canActivate: [UserGuard], title:'User Profile' },  // Placeholder for admin routes
      { path: 'view-cv', component: UserCVComponent,canActivate: [UserGuard], title:'User CV' },
      { path: 'user-fill-cv-form', component: UpdateCVComponent,canActivate: [UserGuard], title:'User CV Update' },
      { path: 'jobs', component: JobsComponent,canActivate: [UserGuard] , title:'View Jobs'},
      { path: 'job/:id', component: JobComponent,canActivate: [UserGuard], title:'Job Details' }
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
