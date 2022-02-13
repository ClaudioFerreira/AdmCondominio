import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = getStorage();

  constructor() { }

  insertOrUpdateStorageFile(file: any): Promise<any> {
    const name = `${file.name}-${Date.now()}`
    const storageRef = ref(this.storage, name);

    return uploadBytes(storageRef, file)
  }

  getDownloadURL(snapshot: any): Promise<any> {
    return getDownloadURL(snapshot.ref)
  }
}
