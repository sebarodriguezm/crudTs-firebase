import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermPageRoutingModule } from './term-routing.module';

import { TermPage } from './term.page';
import { CrudService } from 'src/app/providers/crud.service';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermPageRoutingModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [TermPage],
  providers: [CrudService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TermPageModule {}
