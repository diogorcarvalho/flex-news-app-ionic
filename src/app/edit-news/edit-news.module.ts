import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { EditNewsPageRoutingModule } from './edit-news-routing.module'
import { EditNewsPage } from './edit-news.page'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNewsPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [EditNewsPage]
})
export class EditNewsPageModule {}
