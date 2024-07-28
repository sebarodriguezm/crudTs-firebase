import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/core/dto/product.dto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    { title: 'Productos', url: '/menu/home', icon: 'add-outline' },
 ];

  product: ProductDto = new ProductDto();
  products: ProductDto [] = [];

  constructor() { }

  ngOnInit() {
  }

}
