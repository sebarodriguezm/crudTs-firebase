import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { TermDto } from 'src/app/core/dto/terms.dto';
import { CrudService } from 'src/app/services/crud.service';
import { TermDetailPage } from '../term-detail/term-detail.page';
import * as moment from 'moment';

@Component({
  selector: 'app-term',
  templateUrl: './term.page.html',
  styleUrls: ['./term.page.scss'],
})
export class TermPage implements OnInit {
  //se inicializa el objeto dto para poder usar el ngmodel
  term: TermDto = new TermDto();

  //se inicializa la lista de objetos ddto para poder mostrar en html y filtrar etc
  terms: TermDto [] = [];
  

  constructor(
    private crud: CrudService<TermDto>,
    private modalCtrl: ModalController
  ) {

    //se inicializa instancia en crud y luege se setean las dbtables con los nombres de las tablas 
    this.crud = this.crud.newCrudInstance();
    //setear la tabla
    this.crud.setTable(DbTables.Terms);
  }

  ngOnInit() {
    const currentDate = new Date();
    this.getQuestions();
  }

  getQuestions() {
    this.crud.getCollection().subscribe({
      next: (data: TermDto[]) => {
        this.terms = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  add() {
    if (this.term.date) {
      //valueof para crear en formato timestamp
      this.term.date = moment(this.term.date).valueOf();
      this.crud
      .addToCollection(this.term)
      .then((res) => {
        console.log('exito');
        this.term = new TermDto(); // Reiniciar el objeto "term" después de agregarlo
      })
      .catch((e) => {
        console.log(e);
      });
    
    }
  }

  async verTerm(term: any) {
    const modal = await this.modalCtrl.create({
      component: TermDetailPage,
      componentProps: { term },
    });
    await modal.present();
  }

  
}
