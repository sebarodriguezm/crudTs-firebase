import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRegisterPageRoutingModule } from './admin-register-routing.module';

import { AdminRegisterPage } from './admin-register.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CrudService } from 'src/app/providers/crud.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRegisterPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminRegisterPage],
  providers: [CrudService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminRegisterPageModule {}
