import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { TermDto } from 'src/app/core/dto/terms.dto';
import { CrudService } from 'src/app/services/crud.service';
import { TermDetailPage } from '../term-detail/term-detail.page';

@Component({
  selector: 'app-term',
  templateUrl: './term.page.html',
  styleUrls: ['./term.page.scss'],
})
export class TermPage implements OnInit {
  //se inicializa el objeto dto para poder usar el ngfor
  term: TermDto = new TermDto();

  //se inicializa la lista de objetos ddto para poder mostrar en html y filtrar hacer cosas buenas
  terms: TermDto [] = [];
  

  constructor(
    private crud: CrudService<TermDto>,
    private modalCtrl: ModalController
  ) {

    //se inicializa instancia en crud y luege se setean las dbtables con los nombres de las tablas 
    this.crud = this.crud.newCrudInstance();
    this.crud.setTable(DbTables.Terms);
  }

  ngOnInit() {
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



  edit(id) {
    // Obtener el término por su ID
    const termToUpdate = this.terms.find((term) => term.id === id);

    if (termToUpdate) {
      console.log('encontrado', termToUpdate.id);
      // Actualizar las propiedades del término
      termToUpdate.terms = this.term.terms;
      termToUpdate.title = this.term.title;

      // Guardar los cambios en Firebase
      this.crud
        .updateDocument(termToUpdate)
        .then(() => {
          console.log('Término actualizado exitosamente');
        })
        .catch((error) => {
          console.log('Error al actualizar el término:', error);
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
