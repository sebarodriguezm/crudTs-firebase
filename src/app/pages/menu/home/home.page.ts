import { Component, OnInit } from '@angular/core';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
user: UserAdmDto;

  constructor(
    private crud: CrudService<UserAdmDto>,
  ) {
    //iniicaliar la instancia crud
    this.crud = this.crud.newCrudInstance();
    //setear la tabla
    this.crud.setTable(DbTables.UsersAdm);
   }

  ngOnInit() {
    this.thisUser();
  }

  thisUser() {
     this.crud.getCurrentUser();
    console.log('user', this.user)
   
  }
}
