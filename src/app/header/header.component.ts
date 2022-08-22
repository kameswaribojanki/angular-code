import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogIn=false;
  constructor(private authService:AuthService, private router:Router, private messagesService:MessageService) { }

  ngOnInit(): void {
    this.isLogIn=this.authService.userDetails?true:false;
    this.authService.logInEvent.subscribe(data=>{
      this.isLogIn=data;
    })
  }
  onLogOut(){
    this.authService.logOut();
    this.messagesService.setSuccessMessage("user logged out successfully");
    this.router.navigate(['/login']);
  }
}
