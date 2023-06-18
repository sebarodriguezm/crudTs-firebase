import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermDetailPageRoutingModule } from './term-detail-routing.module';

import { TermDetailPage } from './term-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TermDetailPage]
})
export class TermDetailPageModule {}
