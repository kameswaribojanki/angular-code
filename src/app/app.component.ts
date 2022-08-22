import { Component } from '@angular/core';
import { AuthService } from './Auth/services/auth.service';
import { PostService } from './Posts/services/post.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-http-crud';
  errorMessage="";
  successMessage="";
  addPost=false;
  editPost=false;
  constructor(private authService:AuthService, private messageService:MessageService, private postService:PostService){

  }
  ngOnInit(){
    this.authService.getDataFromLocalStorage();
    this.messageService.successMessageEvent.subscribe(data=>{
      this.successMessage=data;
    });
    this.messageService.errorMessageEvent.subscribe(data=>{
      this.errorMessage=data;
    })
    this.postService.addPostEvent.subscribe(data=>{
      this.addPost=data;
    })
    this.postService.editPostEvent.subscribe(data=>{
      this.editPost=data;
    })
  }
}
