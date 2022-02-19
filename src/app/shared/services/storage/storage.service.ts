import { Injectable } from '@angular/core';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

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

  deleteStorageFile(path: string): Promise<any> {
    const desertRef = ref(this.storage, path);

    return deleteObject(desertRef)
  }

}
