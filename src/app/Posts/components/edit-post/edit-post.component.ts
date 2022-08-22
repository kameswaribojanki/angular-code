import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Categories/models/ICategory';
import { CategoryService } from 'src/app/Categories/services/category.service';
import { MessageService } from 'src/app/services/message.service';
import { IPost } from '../../models/IPost';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  postId: string = '';
  title: string = '';
  category: string = '';
  body: string = '';
  postForm = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    body: new FormControl(''),
  });
  categories: ICategory[] = [];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.postId = this.route.snapshot.params['id'];
    console.log(this.postId);
    this.postService.getPostsById(this.postId).subscribe((data) => {
      console.log(data);
      this.title = data.title;
      this.category = data.category;
      this.body = data.body;
      this.postForm.setValue({
        title: data.title,
        category: data.category,
        body: data.body,
      });
    });
  }
  onEditPost() {
    this.postService
      .editPost(this.postForm.value as IPost, this.postId)
      .subscribe((data) => {
        // this.getPost();
        this.postService.setEditPost(true);
        this.messageService.setSuccessMessage('post updated successfully');
        this.router.navigate(['/posts']);
      });
  }
  // getPost(){
  //   this.categoryService.getCategories().subscribe(data=>{
  //     this.categories=data;
  //   });
  // }
  canExit() {
    if (
      this.postForm.value['title'] !== this.title ||
      this.postForm.value['category'] !== this.title ||
      this.postForm.value['body'] !== this.body
    ) {
      if (confirm('are you sure you want to leave this page')) {
        return true;
      }
      return false;
    }
    return true;
  }
}
