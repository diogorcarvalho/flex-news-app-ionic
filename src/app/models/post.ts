import { Author } from './author'

export interface Post {
  postId: number
  title: string
  text: string
  dateCreate: Date
  authorId: number
  author: Author
}
