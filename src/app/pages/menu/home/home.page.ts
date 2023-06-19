import { Component, OnInit } from '@angular/core';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { TermDto } from 'src/app/core/dto/terms.dto';
import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';
import { CrudService } from 'src/app/services/crud.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //objetos dto 

term: TermDto = new TermDto();
usuario: any;
auth = getAuth();

  constructor(
    private crud: CrudService<UserAdmDto>,
    private crudTerm: CrudService<TermDto>,
    
  ) {
    //inicializar el crud
    this.crudTerm = this.crud.newCrudInstance();
    //setear la tabla
    this.crudTerm.setTable('terms'); 
   }

  ngOnInit() {
    
    this.auth.onAuthStateChanged((user) => {
      this.usuario = user;
      console.log(this.usuario)
    });
  }

  getTerm() {
    if (this.term.id) {
      this.crudTerm.getDocument(this.term.id).subscribe(data => {
        this.term = data;
      });
    }else{
      console.log('no hay data')
    }
  }

  thisUser() {
    console.log('hola')
this.crud.getCurrentUser().then(res => {
  let usuario = res 
  console.log(usuario)
  return usuario
});

    
   
  }
}
