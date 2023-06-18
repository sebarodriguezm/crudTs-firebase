import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { LoginPageModule } from '../login/login.module';
import { GuardsGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'term',
    canActivate: [GuardsGuard],
    loadChildren: () => import('./term/term.module').then( m => m.TermPageModule)
  },
  {
    path: 'term-detail',
    loadChildren: () => import('./term-detail/term-detail.module').then( m => m.TermDetailPageModule)
  },
  {
    path: 'admin-register',
    loadChildren: () => import('./admin-register/admin-register.module').then( m => m.AdminRegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
