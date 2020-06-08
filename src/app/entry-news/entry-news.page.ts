import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AlertController, LoadingController } from '@ionic/angular'

// Variables
import { environment } from 'src/environments/environment'

// Models
import { Post } from '../models/post'
import { Author } from '../models/author'

@Component({
  selector: 'app-entry-news',
  templateUrl: './entry-news.page.html',
  styleUrls: ['./entry-news.page.scss'],
})
export class EntryNewsPage implements OnInit {

  post: Post

  authors: Author[]

  constructor(
    public router: Router,
    public httpClient: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.post = <Post> {
      postId: undefined,
      title: undefined,
      text: undefined,
      dateCreate: undefined,
      authorId: undefined
    }
  }

  ngOnInit() {
    this.getAuthors()
  }

  async getAuthors() {
    
    const rul = `${environment.apiUrl}v1/authors`

    this.httpClient.get(rul).subscribe((_authors: Author[]) => {
      this.authors = _authors
    }, (error: any) => {
      this.alert('Atenção!', error.message)
    })
  }

  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [ 'OK' ]
    })
    await alert.present()
  }

  formValidation() {
    
    if (!this.post.title || this.post.title.length < 3) return false

    if (!this.post.text || this.post.text.length < 3) return false

    if (!this.post.authorId) return false

    return true
  }

  submit() {
    
    const rul = `${environment.apiUrl}v1/posts`
    
    this.httpClient.post(rul, this.post).subscribe((post: Post) => {
      this.router.navigate([ `/home` ])
      this.alert('Sucesso!', 'Notícia registrada com sucesso')
    }, (error: any) => {
      this.alert('Atenção!', error.message)
    })
  }

}

