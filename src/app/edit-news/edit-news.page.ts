import { Component, OnInit } from '@angular/core'
import { AlertController, LoadingController } from '@ionic/angular'
import { HttpClient } from '@angular/common/http'

// Variables
import { environment } from 'src/environments/environment'

// Models
import { Post } from '../models/post'
import { Author } from '../models/author'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.page.html',
  styleUrls: ['./edit-news.page.scss'],
})
export class EditNewsPage implements OnInit {

  postId: number

  post: Post

  authors: Author[]

  timeoutId: any

  constructor(
    public route: ActivatedRoute,
    public httpClient: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.postId = undefined
    this.post = undefined
    this.authors = undefined
    this.timeoutId = undefined
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.postId = params.postId
      this.getPost()
      this.getAuthors()
    })
  }

  handleTitleChange() {

    clearTimeout(this.timeoutId)

    if (!this.post.title) return this.alert('Preencha o título da notícia')
    
    const payload = { EntityId: this.post.postId, field: 'Title', stringValue: this.post.title }

    this.timeoutId = setTimeout(async () => this.patchPost(payload), 1000)
  }

  handleTextChange() {

    clearTimeout(this.timeoutId)

    if (!this.post.text) return this.alert('Preencha o texto da notícia')
    
    const payload = { EntityId: this.post.postId, field: 'Text', stringValue: this.post.text }

    this.timeoutId = setTimeout(async () => this.patchPost(payload), 1000)
  }

  handleAuthorChange(ev: CustomEvent) {
    
    const payload = { EntityId: this.post.postId, field: 'AuthorId', IntValue: ev.detail.value }

    this.patchPost(payload)
  }

  async getAuthors() {
    
    const rul = `${environment.apiUrl}v1/authors`

    this.httpClient.get(rul).subscribe((_authors: Author[]) => {
      this.authors = _authors
    }, (error: any) => {
      this.alert(error.message)
    })
  }

  async getPost() {
    
    const loading = await this.loadingController.create({ message: 'Carregando...' })
    
    loading.present()

    const _postId = this.postId

    const rul = `${environment.apiUrl}v1/posts/${_postId}`

    this.httpClient.get(rul).subscribe((_post: Post) => {
      this.post = _post
      loading.dismiss()
    }, (error: any) => {
      loading.dismiss()
      this.alert(error.message)
    })
  }

  async patchPost(payload: any) {
    
    const rul = `${environment.apiUrl}v1/posts`
    
    this.httpClient.patch(rul, payload).subscribe((post: Post) => {
      this.post = post
    }, (error: any) => {
      this.alert(error.message)
    })
  }

  async alert(message: string) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: message,
      buttons: [ 'OK' ]
    })
    await alert.present()
  }

}
