import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryNewsPage } from './entry-news.page';

const routes: Routes = [
  {
    path: '',
    component: EntryNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryNewsPageRoutingModule {}
