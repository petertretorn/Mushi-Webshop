import { Component, OnInit } from '@angular/core';
import { Blog } from '@app/models/blog';
import { BlogService } from '@app/core/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  blog: Blog = new Blog()

  categories = ['sundhed', 'kost', 'spiritualitet']

  constructor(private blogService: BlogService) { }

  ngOnInit() {
  }

  saveBlog() {
    this.blogService.saveBlog(this.blog)
  }
}
