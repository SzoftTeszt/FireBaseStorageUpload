import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent {
  files:any;

  constructor(private base:BaseService){
    this.base.getAllFiles().snapshotChanges().pipe(
      map ( (ch)=> ch.map( c=> ({key:c.payload.key, ...c.payload.val()}) ))
    ).subscribe(
      (f)=>{this.files=f; console.log(this.files)}
    )
  }
}
