import { Component } from '@angular/core'
import { AlertController, LoadingController } from '@ionic/angular'
import { HttpClient } from '@angular/common/http'
import { Router, NavigationExtras } from '@angular/router'

// Variables
import { environment } from 'src/environments/environment'

// Models
import { Post } from '../models/post'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  posts: Post[]

  lastKeyword: string

  constructor(
    public router: Router,
    public httpClient: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.posts = []
    this.lastKeyword = undefined
  }

  ionViewDidEnter() {
    if (!!this.lastKeyword) this.handleSearch(this.lastKeyword)
  }

  handleSearch(keyword: string) {
    
    if (!keyword || !keyword.trim()) {
      this.posts = undefined
      this.lastKeyword = undefined
      return
    }

    this.lastKeyword = keyword
    
    const rul = `${environment.apiUrl}v1/posts/search?keyword=${keyword}`

    this.httpClient.get(rul).subscribe(
      (_posts: Post[]) => this.posts = _posts,
      (error: any) => this.alert(error.message))
  }

  handleAddNews() {
    this.router.navigate([ `/entry-news` ])
  }

  handleEdit(post: Post) {
    const extras: NavigationExtras = { queryParams: { postId: post.postId } }
    this.router.navigate(['edit-news'], extras)
  }

  async handleDelete(post: Post) {

    const loading = await this.loadingController.create({ message: 'Carregando...' })
    
    loading.present()
    
    const rul = `${environment.apiUrl}v1/posts/${post.postId}`

    this.httpClient.delete(rul).subscribe(() => {
      this.posts = this.posts.filter(p => p.postId !== post.postId)
      loading.dismiss()
    },(error: any) => {
      loading.dismiss()
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
