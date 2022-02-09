import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private afs: AngularFirestore
  ) { }

  filterPersonalized(quadra: string, lote: string): Observable<any> {
    return this.afs
      .collection('casas', ref => ref.where('quada', '==', quadra).where('lote', '==', lote))
      .valueChanges()
  }
}
