import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermDetailPage } from './term-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TermDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermDetailPageRoutingModule {}
