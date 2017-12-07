import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import * as  firebase from 'firebase';

@Injectable()
export class FileService {

  private basePath = '/images';

  constructor() { }

  deleteFile(id: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${id}`).delete().then( res => {
      console.log(`file delete: ${res}`)
    })
  }
  
  uploadFileToStorage(upload: File) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.name}`)
      .put(upload);

    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // three observers
      // 1.) state_changed observer
      (snapshot) => {
        // upload in progress
        var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('progress: ' + progress);
      },
      // 2.) error observer
      (error) => {
        // upload failed
        console.log(error);
      },
      // 3.) success observer
      (): any => {
        var url = uploadTask.snapshot.downloadURL;
        var name = upload.name;
      }
    );

    return uploadTask
  }
}
