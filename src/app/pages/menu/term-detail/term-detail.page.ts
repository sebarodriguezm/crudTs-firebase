import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TermDto } from 'src/app/core/dto/terms.dto';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.page.html',
  styleUrls: ['./term-detail.page.scss'],
})
export class TermDetailPage implements OnInit {
  term: TermDto = new TermDto();
  


  constructor(
    private modalCtrl: ModalController,
    private crud: CrudService<TermDto>
  ) {
    this.crud = this.crud.newCrudInstance();
    this.crud.setTable('terms'); 
   }

  ngOnInit() {
    this.getTerm();
  }

  getTerm() {
    console.log(this.term)
    if (this.term && this.term.id) {
      this.crud.getDocument(this.term.id).subscribe(data => {
        this.term = data;
        
       
      });
    }else{
      console.log('no hay data')
    }
  }
  
  edit() {
    this.crud.updateDocument(this.term)
        .then(() => {
          console.log('Término actualizado exitosamente',this.term);
        })
        .catch((error) => {
          console.log('Error al actualizar el término:', error);
        });
    }
  
      
  

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
