import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/storage';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAdmDto } from '../core/dto/user-adm.dto';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable()
export class CrudService<TMain, TSub = any, TSub2 = any, TSub3 = any> {

  private collection: AngularFirestoreCollection<TMain>;

  private downloadURL: Observable<string>;
  private snapshotChangesSubscription: any;

  private table = 'NoTable';
  private subTable = 'NoSubtable';
  private subTable2 = 'NoSubtable2';
  private subTable3 = 'NoSubtable3';



  constructor(public afs: AngularFirestore, private afStorage: AngularFireStorage,
    private auth: AngularFireAuth) {
  }

  newCrudInstance<T1, T2 = any, T3 = any>() {
    return new CrudService<T1, T2, T3>(this.afs, this.afStorage, this.auth);
  }

  setTable(name: string) {
    this.table = name;
    this.collection = this.afs.collection<TMain>(`/${this.table}`);
  }

  setSubtable(collection: string) {
    this.subTable = collection;
  }

  setSubtable2(collection: string) {
    this.subTable2 = collection;
  }

  setSubtable3(collection: string) {
    this.subTable3 = collection;
  }

  uploadBase64(file, country, name) {
    const randomId = Math.random().toString(36).substring(2);
    const storageRef = this.afs.firestore.app.storage().ref();
    const uploadTask = storageRef.child(`/${this.table}/${country}/${name}/${randomId}`).putString(file, 'base64', { contentType: 'image/png' });
    return new Promise<any>((resolve, reject) => {
      uploadTask.on(
        // firebase.storage.TaskEvent.STATE_CHANGED,
        'state_changed',
        (snapshot) => {
          //console.log('SNA::>')
          // console.log('SNA::>',snapshot)
        },
        (error) => {
          //console.log('Error')
          // console.log(error) 
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL:any) => {
            this.downloadURL = downloadURL;
            // console.log('File available at', downloadURL);
            resolve(this.downloadURL);
          });
        }
      );
    });
  }

  uploadAvt(file) {
    const randomId = Math.random().toString(36).substring(2);

    const storageRef = this.afs.firestore.app.storage().ref();
    const uploadTask = storageRef.child(`/${this.table}/` + randomId).put(file);

    return new Promise<any>((resolve, reject) => {
      uploadTask.on(
        // firebase.storage.TaskEvent.STATE_CHANGED,
        'state_changed',
        (snapshot) => { },
        (error) => { },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL:any) => {
            this.downloadURL = downloadURL;
            //console.log('File available at', downloadURL);
            resolve(this.downloadURL);
          });
        }
      );
    });
  }

  uploadPhoto(TMainDocId: string, fileName: string, file: string, storagePath?: string) {
    /* const fbStorage = this.fire.instance();
    // const fbStorage = firebase;
    const storageRef = fbStorage.storage().ref(); */

    let filePath = '';

    if (storagePath) {
      filePath = `${storagePath}/${fileName}`;
    } else {
      filePath = `/${this.table}` +
        `${(TMainDocId) ? '/' + TMainDocId : ''}` +
        `${(this.subTable) ? '/' + this.subTable : ''}` +
        `/${fileName}`;
    };

    /*     const imageRef = storageRef.child(filePath);

        return imageRef.putString('data:image/jpeg;base64,' + file, firebase.storage.StringFormat.DATA_URL); */

    return <Promise<string>>this.afStorage
      .ref(filePath)
      .putString('data:image/jpeg;base64,' + file, firebase.storage.StringFormat.RAW)
      .then(data => {
        return data.ref.getDownloadURL();
      });
  }

  getCollection() {
    return this.collection
      .snapshotChanges()
      .pipe<TMain[]>(
        map(changes => {
          return changes
            .map(a => {
              const data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;

              return data as TMain;
            });
        }
        ));
  }

  getCollectionPagination(last, order, number) {
    let collection = this.afs.collection<TMain>(`/${this.table}`, ref => ref
      .orderBy(order)
      .startAfter(last)
      .limit(number)
    );
    return collection
      .snapshotChanges()
      .pipe<TMain[]>(
        map(changes => {
          return changes
            .map(a => {
              const data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;

              return data as TMain;
            });
        }
        ));
  }

  queryCollection(field: string, comparer: any = 'array-contains', value: any) {
    return this.collection.ref
      .where(field, comparer, value)
      .get()
      .then(sShot => {
        let docs: TMain[];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
  }

  queryCollection2(field: any, comparer: any = 'array-contains', value: any) {
    let query: any = this.collection.ref;
    for (let i = 0; i < field.length; i++) {
      query = query.where(field[i], comparer[i], value[i])
    }
    return query
      .get()
      .then(sShot => {
        let docs: TMain[];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
  }

  queryCollectionPagination2(field: any, comparer: any = 'array-contains', value: any, last, order, number,
    direction: firebase.firestore.OrderByDirection = 'asc') {

    let query: any = this.collection.ref;
    for (let i = 0; i < field.length; i++) {
      query = query.where(field[i], comparer[i], value[i])
    }

    if(last){
      return query
      .orderBy(order, direction)
      .startAfter(last)
      .limit(number)
      //.where(field, comparer, value)
      .get()
      .then(sShot => {
        let docs: TMain[];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
    }else{
      return query
      .orderBy(order, direction)
      .limit(number)
      //.where(field, comparer, value)
      .get()
      .then(sShot => {
        let docs: TMain[];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
    }
  }

  getCollectionConditional(collectionName: string, condition: any){
    return this.afs.collection(collectionName, condition).valueChanges();
  }

  queryCollectionPagination(field: string, comparer: any = 'array-contains', value: any, last, order, number,
    direction: firebase.firestore.OrderByDirection = 'asc') {
    return this.collection.ref
      .orderBy(order, direction)
      .startAfter(last)
      .limit(number)
      .where(field, comparer, value)
      .get()
      .then(sShot => {
        let docs: TMain[];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
  }

  getSubcollectionPagination(docId: string, last: string, order: string, number: number) {

    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable, ref => ref
        .orderBy(order)
        .startAfter(last)
        .limit(number)
      )
      .snapshotChanges()
      .pipe<TSub[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as TSub;
              });
          }
        ));
  }

  querySubCollection(mainId: string, field: string, comparer: any = 'array-contains', value: any) {
    let ref = this.afs.collection<TSub>(`${this.table}/${mainId}/${this.subTable}`).ref;

    return ref
      .where(field, comparer, value)
      .get()
      .then(sShot => {
        let docs: TSub[];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TSub;
            });
        }

        return docs;
      });
  }

  querySubCollectionPagination(mainId: string, field: string, comparer: any = 'array-contains', value: any, order, last, number) {
    let ref = this.afs.collection<TSub>(`${this.table}/${mainId}/${this.subTable}`).ref;

    return ref
      .orderBy(order)
      .startAfter(last)
      .limit(number)
      .where(field, comparer, value)
      .get()

      .then(sShot => {
        let docs: TSub[];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TSub;
            });
        }

        return docs;
      });
  }

  addToCollection(data: TMain) {
    let d: any = data;
    return this.collection.add({ ...d });
  }

  copyTo(path: string, data: any) {
    let d: any = data;
    let ref = this.afs.doc(path);

    return ref.set({ ...d });
  }

  copyToCollection(data: TMain) {
    let path = `/${this.table}/${data['id']}`;

    return this.copyTo(path, data);
  }

  getDocument(id: string) {
    return this.collection.doc<TMain>(id)
      .valueChanges()
      .pipe<TMain>(
        map<TMain, TMain>(a => {
          if (a) {
            a['id'] = id;
          }

          return a;
        })
      );
  }

  updateDocument(doc: Partial<TMain>) {
    return this.collection.doc<TMain>(doc['id']).update(doc);
  }

  updateDocument2( data: TMain) {
    return this.collection.doc().update(data);
  }

  deleteDocument(id: string) {
    return this.collection.doc<TMain>(id)
      .delete();
  }

  getSubcollection(docId: string,) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .snapshotChanges()
      .pipe<TSub[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as TSub;
              });
          }
        ));
  }

  getSubcollectionByTable<T>(table: string, docId: string) {
    return this.collection.doc<TMain>(docId)
      .collection<T>(table)
      .snapshotChanges()
      .pipe<T[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as T;
              });
          }
        ));
  }

  getSubcollection2(docId: string, SubId: string) {

    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable).doc(SubId)
      .collection<TSub2>(this.subTable2)
      .snapshotChanges()
      .pipe<TSub2[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as TSub2;
              });
          }
        ));
  }

  getSubcollection3(docId: string, SubId: string, Sub2Id: string) {

    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable).doc(SubId)
      .collection<TSub2>(this.subTable2).doc(Sub2Id)
      .collection<TSub3>(this.subTable3)
      .snapshotChanges()
      .pipe<TSub3[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as TSub3;
              });
          }
        ));
  }

  getSubcollectionDoc(docId: string, subDocId: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc<TSub>(subDocId)
      .valueChanges()
      .pipe<TSub>(
        map<TSub, TSub>(a => {
          if (a) {
            a['id'] = subDocId;
          }

          return a;
        })
      );
  }

  getSubcollectionDoc2(docId: string, subDocId: string, _id: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(subDocId)
      .collection<TSub2>(this.subTable2)
      .doc<TSub2>(_id)
      .valueChanges()
      .pipe<TSub2>(
        map<TSub2, TSub2>(a => {
          if (a) {
            a['id'] = _id;
          }

          return a;
        })
      );
  }

  addToSubcollection(docId: string, data: TSub) {
    let d: any = data;
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .add({ ...d });
  }

  copyToSubcollection(docId: string, data: TSub) {
    let path = `/${this.table}/${docId}/${this.subTable}/${data['id']}`;

    return this.copyTo(path, data);
  }

  copyToSubcollectionWithTable(subTable: string, docId: string, data: TSub) {
    let path = `/${this.table}/${docId}/${subTable}/${data['id']}`;

    return this.copyTo(path, data);
  }

  addToSubcollection2(docId: string, SubId: string, data: TSub2) {
    let d: any = data;
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(SubId)
      .collection<TSub2>(this.subTable2)
      .add({ ...d });
  }

  copyToSubcollection2(docId: string, data: any) {
    let path = `/${this.table}/${docId}/${this.subTable2}/${data['id']}`;

    return this.copyTo(path, data);
  }

  updateSubcollectionDoc(docId: string, data: Partial<TSub>) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc<TSub>(data['id'])
      .update(data);
  }

  updateSubcollectionDoc2(docId: string, subId: string, data: Partial<TSub2>) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(subId)
      .collection<TSub2>(this.subTable2)
      .doc<TSub2>(data['id'])
      .update(data);
  }

  deleteSubcollectionDoc(docId: string, subDocId: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc<TSub>(subDocId)
      .delete();
  }

  deleteSubcollectionDoc2(docId: string, subDocId: string, _id: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(subDocId)
      .collection<TSub2>(this.subTable2)
      .doc(_id)
      .delete();
  }

  deleteSubcollectionDoc3(docId: string, subDocId: string, sub3DocId, _id: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(subDocId)
      .collection<TSub2>(this.subTable2)
      .doc(sub3DocId)
      .collection<TSub3>(this.subTable3)
      .doc(_id)
      .delete();
  }


  addToSubcollection3(docId: string, SubId: string, Sub2Id: string, data: TSub3) {
    let d: any = data;
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(SubId)
      .collection<TSub2>(this.subTable2)
      .doc(Sub2Id)
      .collection<TSub3>(this.subTable3)
      .add({ ...d });
  }

  querySearch(field: any, comparer: any, value: any,limit:number = 20) {
    let query: any = this.collection.ref;
    for (let i = 0; i < field.length; i++) {
      query = query.where(field[i], comparer[i], value[i])
    }
    return query
    // .orderBy('nombreCompleto').startAt(value[0]).endAt(value[0]+'\uf8ff')
      .limit(limit)
      .get()
      .then(sShot => {
        let docs: TMain[];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
  }

  deleteWord:any = ['a','e','y','o','u','la','de','el','mi','es','un','en','uno','una','por','las','los','del','con','por','que','nos','son','']
  getArraySearch(listString:string[]){
    let returnArray:any = [];
    listString.forEach(list => {
      // Convertir todo en minuscula y quitar acentos
      if(list){
        list = this.removeAccents(list.toLocaleLowerCase());
        // Convertir en array
        let arrayWord = list.split(' ');
        arrayWord = arrayWord.filter(word =>{
          return this.goDeleteWord(word);
        })      
        // console.log(arrayWord);
        arrayWord.forEach(aw =>{
          if(this.goSaveWord(aw,returnArray)){
            returnArray.push(aw);
          }
        }) 
      }
      
    });    
    return returnArray;   
  }

  getArraySearchDes(listString:string[]){
    let returnArray:any = [];
    listString.forEach(list => {
      // Convertir todo en minuscula y quitar acentos
      if(list){
        list = this.removeAccents(list.toLocaleLowerCase());
        // Convertir en array
        let arrayWord = list.split(' ');
        arrayWord = arrayWord.filter(word =>{
          return this.goDeleteWord(word);
        })      
        // console.log(arrayWord);
        arrayWord.forEach(aw =>{
          if(this.goSaveWord(aw,returnArray)){
            // returnArray.push(aw);
            // let p = aw.substring(0,aw.length-1);
            // while(p.length > 2){
            //   returnArray.push(p);
            //   p = aw.substring(0,p.length-1);
            // }
            let p0 = aw;
            while(p0.length > 2){              
              returnArray.push(p0);
              let p1 = p0;
              p1 = p1.substring(0,p1.length-1);
              while(p1.length > 2){
                returnArray.push(p1);
                p1 = p1.substring(0,p1.length-1);
              }
              let p2 = p0;
              p2 = p2.substring(1,p2.length);
              while(p2.length > 2){
                returnArray.push(p2);                
                p2 = p2.substring(1,p2.length);
              }
              p0 = p0.substring(1,p0.length - 1);
            }
          }
        }) 
      }
      
    });    
    return returnArray;   
  }

  goSaveWord(word,returnArray){
    let filter = true;
    returnArray.forEach(w =>{
      if(w == word){
        filter = false;
      }
    })
    return filter;
  }

  removeAccents(input) {
    var acentos = "ãàáäâèéëêìíïîòóöôùúüûÇç";
    var original= "aaaaaeeeeiiiioooouuuucc";
    for (var i = 0; i < acentos.length; i++) {
      input = input.replace(acentos.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
  }

  goDeleteWord(word){
    if(word.length<3){
      return false;
    }
    let filter = true;
    this.deleteWord.forEach(w =>{
      if(w == word){
        filter = false;
      }
    })
    return filter;
  }

  RegisterAdmin(user: UserAdmDto, password: string) {
    console.log(user);
    return new Promise<void>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(user.email, password)
        .then(() => {
          console.log('El usuario se creó correctamente');
          resolve();
        })
        .catch((error) => {
          console.log('Hubo un error al crear el usuario:', error);
          reject(error);
        });
    });
  }

  Login(user: UserAdmDto) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  getCurrentUser() {
      return this.auth.currentUser;
    }
}
