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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin', component: AdmindashboardComponent, children: [
      { path: '', component: AdminhomeComponent},  // Placeholder for admin routes
      { path: 'add-job-post', component: AddJobsComponent, canActivate: [AuthGuard]},
    ]
  },
  {
    path: 'user', component: UserdashboardComponent, children: [
      { path: '', component: UserhomeComponent },  // Placeholder for user routes
      { path: 'view-profile', component: UserProfileComponent },  // Placeholder for admin routes
      { path: 'view-cv', component: UserCVComponent },
      { path: 'user-fill-cv-form', component: UpdateCVComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'job/:id', component: JobComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
