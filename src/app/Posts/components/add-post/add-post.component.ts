import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Categories/models/ICategory';
import { CategoryService } from 'src/app/Categories/services/category.service';
import { MessageService } from 'src/app/services/message.service';
import { IPost } from '../../models/IPost';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm:FormGroup=new FormGroup({
    title:new FormControl(''),
    category:new FormControl(''),
    body:new FormControl('')
  })
  categories:ICategory[]=[];
  constructor(private categoryService:CategoryService, private postService:PostService, private router:Router, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getPost();
  }
  onAddPost(){
    this.messageService.showLoading();
    let post=this.postForm.value;
    console.log(post);
    this.postService.addPost(post).subscribe(post=>{
      // this.getPost();
      this.postService.setAddPost(true);
      this.router.navigate(['/posts']);
    this.messageService.hideLoading();
    
    this.messageService.setSuccessMessage("post added successfully");
    
    })
    
  }
  getPost(){
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    });
  }
  canExit(){
    if(confirm('are you sure you want to leave this page')){
      return true;
    }
    return false;
  }
}
