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

    this.crud = this.crud.newCrudInstance();
    this.crud.setTable('terms'); 
   }

  ngOnInit() {
    this.thisUser();
  }

  getTerm() {
    console.log('temid', this.term.id)
    console.log(this.term)
    if (this.term && this.term.id) {
      this.crud.getDocument(this.term.id).subscribe(data => {
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
