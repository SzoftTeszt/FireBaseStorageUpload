import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadListComponent } from './upload-list/upload-list.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
