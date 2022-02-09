import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CasasService {

  readonly collectionName = 'casa'

  constructor(
    private firestore: Firestore,
  ) { }

  getAll(): Observable<any> {
    const casas = collection(this.firestore, this.collectionName)
    return collectionData(casas)
  }
}
