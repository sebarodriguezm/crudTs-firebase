import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { ProductDto } from 'src/app/core/dto/product.dto';
import { CrudService } from 'src/app/providers/crud.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showForm = false;
  efect = '';
  product: ProductDto = new ProductDto();
  products: ProductDto [] = [];
  action: string = '';
  content!: IonContent;
  
  constructor(
    private crud: CrudService<ProductDto>,
    
  ) {
    
   }

  ngOnInit() {
  }

  animation(){
    if(this.showForm){
      this.efect='efect-form';
    }else{
      this.efect='';
      
    }
  }

  showCreate(act:any) {
    this.showForm = !this.showForm;
    this.animation();
    this.product = new ProductDto();
    this.action = act;
    this.scrollToTop();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
