import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    { title: 'Productos', url: '/menu/home', icon: 'add-outline' },
 ];


  constructor() { }

  ngOnInit() {
  }

}
