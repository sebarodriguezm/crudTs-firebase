import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.page.html',
  styleUrls: ['./admin-register.page.scss'],
})
export class AdminRegisterPage implements OnInit {

  //inicializar el objeto dto
  admin: UserAdmDto = new UserAdmDto();
  //crear la lista para los dto en caso de querer listarlos para editar
  admins: UserAdmDto [] = []; 
user:any;
  constructor(
    private crud: CrudService<UserAdmDto>,
    private router: Router,
    private loading: LoadingController
  ) {

    //iniicaliar la instancia crud
    this.crud = this.crud.newCrudInstance();
    //setear la tabla
    this.crud.setTable(DbTables.UsersAdm);
   }

  ngOnInit() {
   
  }

  add() {
    console.log('admin', this.admin)
    this.crud
      .addToCollection(this.admin)
      .then((res) => {
        console.log('exito');
        this.admin = new UserAdmDto(); // Reiniciar el objeto "term" después de agregarlo
      })
      .catch((e) => {
        console.log(e);
      });
  }


  //este funciona bien en auth 

  addUser() {
    
    this.crud.RegisterAdmin(this.admin, this.admin.password).then(res => {
     
    }).catch(e => {
      console.log(e);
    })
    
  
}


  /*login(){
    console.log(this.admin)
    this.crud.Login(this.admin).then(res => {

      // this.getUserData(res.user.uid);
      this.router.navigate(['/menu/home']);
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
    });

  }

  logout(){
    this.crud.logout();
  }*/


  
}
