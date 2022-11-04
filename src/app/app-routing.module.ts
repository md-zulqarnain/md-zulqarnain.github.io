import { FastingComponent } from './components/fasting/fasting.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateTimingComponent } from './components/update-timing/update-timing.component';
import { SuperGuard } from './shared/super.guard';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './shared/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'fasting',
    component: FastingComponent,
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
  },
  
  {
    path: 'update-timing',
    component: UpdateTimingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [SuperGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
