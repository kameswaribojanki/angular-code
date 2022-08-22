import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '../../models/IPost';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  posts:IPost[] = [];
  constructor(private postService:PostService, private router:Router) { }

  ngOnInit(): void {
    this.getPosts();
  }
  onDeletePost(id:any){
    this.postService.deletePost(id).subscribe(data=>{
      this.getPosts();
    });
    // this.router.navigate(['/posts']);
  }
  getPosts(){
    this.postService.getPosts().subscribe((posts:IPost[])=>{
      this.posts=posts;
    })
  }
}
