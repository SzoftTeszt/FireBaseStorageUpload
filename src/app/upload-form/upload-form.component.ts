import { Component } from '@angular/core';
import { UploadFile } from '../upload-file';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {

  selectedFiles?:FileList;
  currentFile?: UploadFile;
  percentage:any;

  constructor(private base:BaseService){}


  selectFile(event:any){
      this.selectedFiles= event.target.files;
      console.log(this.selectedFiles);
  }

  upload(){
    const file= this.selectedFiles?.item(0);
    if (file)
    {
        this.currentFile= new UploadFile(file);
        this.base.pushFileToStorage(this.currentFile).subscribe(
          {
            next: (p)=>{console.log(p); this.percentage=p},
            error:(e)=>console.log(e)
          }
        )

    }
  }


}
