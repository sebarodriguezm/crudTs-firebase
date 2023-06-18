import { Component, OnInit } from '@angular/core';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { TermDto } from 'src/app/core/dto/terms.dto';
import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //objetos dto 
user: UserAdmDto;
term: TermDto = new TermDto();

  constructor(
    private crud: CrudService<UserAdmDto>,
    private crudTerm: CrudService<TermDto>
  ) {
    //iniicaliar la instancia crud
    this.crud = this.crud.newCrudInstance();
    //setear la tabla
    this.crud.setTable(DbTables.UsersAdm);

    this.crudTerm = this.crud.newCrudInstance();
    this.crudTerm.setTable('terms'); 
   }

  ngOnInit() {
    this.thisUser();
  }

  getTerm() {
    if (this.term && this.term.id) {
      this.crudTerm.getDocument(this.term.id).subscribe(data => {
        this.term = data;
      });
    }else{
      console.log('no hay data')
    }
  }

  thisUser() {
     this.crud.getCurrentUser();
    console.log('user', this.user)
   
  }
}
