import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRegisterPage } from './admin-register.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRegisterPageRoutingModule {}
