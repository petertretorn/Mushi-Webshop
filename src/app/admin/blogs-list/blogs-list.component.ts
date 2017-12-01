import { Blog } from '@app/models/blog';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/core/blog.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {

  blogs$: Observable<Blog[]>

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogs$ = this.blogService.getBlogs()
  }

  gotoBlog() {
    
  }
}
