import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { EntryNewsPageRoutingModule } from './entry-news-routing.module'
import { EntryNewsPage } from './entry-news.page'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryNewsPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [EntryNewsPage]
})
export class EntryNewsPageModule {}
