import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadFile } from './upload-file';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  path="/upload"
  constructor(
    private db:AngularFireDatabase,
    private storage:AngularFireStorage
  ) { }

  pushFileToStorage(uploadFile:UploadFile){
    const hova = `${Date.now()}${uploadFile.file.name}`;
    const storageRef= this.storage.ref(hova);

    const uploadTask= this.storage.upload(hova, uploadFile.file);
    
    uploadTask.snapshotChanges().pipe(
        finalize(
          ()=>{
            storageRef.getDownloadURL().subscribe(
              (url)=>{
                uploadFile.url=url;
                uploadFile.name=hova;
                this.db.list(this.path).push(uploadFile);
              }
            )
          }
        )
    ).subscribe();  
    return uploadTask.percentageChanges(); 
  }
  getAllFiles():AngularFireList<UploadFile>{
    return this.db.list(this.path);
  }

  getFiles(numberItems:number):AngularFireList<UploadFile>{
    return this.db.list(this.path, ref=>ref.limitToLast(numberItems));
  }

  private deleteDatabase(key:string){
    return this.db.list(this.path).remove(key);
  }

  private deleteStorage(name:string){
    // return this.storage.ref(name).child(name).delete();
    return this.storage.ref(name).delete();
  }

  deleteFile(file:UploadFile){
    this.deleteDatabase(file.key).then(
      ()=>{
        console.log("Törlés belül")
        this.deleteStorage(file.name).subscribe(
          {
            next:()=>console.log("Sikeres Storage törlés"),
            error: (e)=> console.log("Storage hiba:",e)
          }
        );
      }
    ).catch(
      (e)=>console.log(e)
    )
  }
}
