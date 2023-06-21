import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';
import { CrudService } from 'src/app/services/crud.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
admin: UserAdmDto = new UserAdmDto();

  constructor(
    private crud: CrudService<UserAdmDto>,
    private router: Router,
    private loading: LoadingController
  ) { }

  ngOnInit() {
  }

  login(){
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
  }

}
