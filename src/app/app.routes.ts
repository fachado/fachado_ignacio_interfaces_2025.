import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./page/login/login.component').then(m => m.LoginComponent),
  },

  {
    path: 'splash',
    loadComponent: () => import('./page/splash/splash.page').then( m => m.SplashPage)
  },



  {
    path: 'custom-theme',
    loadComponent: () => import('./page/custom-theme/custom-theme.page').then( m => m.CustomThemePage)
  },



]
