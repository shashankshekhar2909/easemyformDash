import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HttpClientXsrfModule, provideHttpClient, HTTP_INTERCEPTORS, HttpClientModule, withFetch } from '@angular/common/http';
import { HttpConfigInterceptor } from './_interceptors/http-config.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { AdminheaderComponent } from './components/admin/adminheader/adminheader.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { UserhomeComponent } from './components/user/userhome/userhome.component';
import { UserdashboardComponent } from './components/user/userdashboard/userdashboard.component';
import { UserheaderComponent } from './components/user/userheader/userheader.component';
import { AddJobsComponent } from './components/admin/add-jobs/add-jobs.component';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserCVComponent } from './components/user/user-cv/user-cv.component';
import { JobsComponent } from './components/user/jobs/jobs.component';
import { JobComponent } from './components/user/job/job.component';
import { UpdateCVComponent } from './components/user/update-cv/update-cv.component';
import { PostSliderComponent } from './components/partials/post-slider/post-slider.component';
import { AlertComponent } from './alert/alert.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { AdminUserViewComponent } from './components/admin/admin-user-view/admin-user-view.component';
import { FooterComponent } from './partials/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdmindashboardComponent,
    AdminheaderComponent,
    AdminhomeComponent,
    UserhomeComponent,
    UserdashboardComponent,
    UserheaderComponent,
    AddJobsComponent,
    UserProfileComponent,
    UserCVComponent,
    JobsComponent,
    JobComponent,
    UpdateCVComponent,
    PostSliderComponent,
    AlertComponent,
    UserListComponent,
    AdminUserViewComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName:'X-CSRFToken'
    }),
  ],
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
