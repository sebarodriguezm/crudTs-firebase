import { Component, OnInit } from '@angular/core';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { ProductDto } from 'src/app/core/dto/product.dto';
import { CrudService } from 'src/app/providers/crud.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  product: ProductDto = new ProductDto();
  products: ProductDto [] = [];

  constructor(
    private crud: CrudService<ProductDto>,
    
  ) {
    
   }

  ngOnInit() {
  }
}
