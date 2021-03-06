import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  readonly collectionName = 'casa'

  constructor(
    private firestore: Firestore
  ) { }

  // filterPersonalized(quadra: string, lote: string): Observable<any> {
  //   const casa = collection(this.firestore, this.collectionName, ref => ref.where('quada', '==', quadra).where('lote', '==', lote))
  //   return collectionData(casa) as Observable<any>
  // }
}
