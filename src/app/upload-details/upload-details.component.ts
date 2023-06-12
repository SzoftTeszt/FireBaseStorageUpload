import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadFile } from '../upload-file';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent {
  @Input() file!:UploadFile;
  @Output() fileDelete: EventEmitter<any> = new EventEmitter();

  constructor(){}

  deleteFile(file:UploadFile){
    this.fileDelete.emit(file);
  }
}
