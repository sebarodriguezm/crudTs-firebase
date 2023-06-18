import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    { title: 'Home', url: '/menu/home', icon: 'add-outline' },
    { title: 'Login', url: '/menu/login', icon: 'call-outline' },
    { title: 'Term', url: '/menu/term', icon: 'mail-outline' },
    { title: 'Admin-register', url: '/menu/admin-register', icon: 'person-outline' },
 ];
  constructor() { }

  ngOnInit() {
  }

}
