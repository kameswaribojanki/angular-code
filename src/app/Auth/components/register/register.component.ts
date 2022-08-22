import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }
    registerForm:FormGroup=new FormGroup({
    email:new FormControl(""),
    password:new FormControl(""),
  });
  ngOnInit(): void {
  }
  onRegister(){
    const email=this.registerForm.value.email;
    const password=this.registerForm.value.password;
    if(email && password){
      this.authService.register(email,password).subscribe(data=>{
        this.authService.logInEvent.emit(true);
        this.router.navigate(['/']);
      })
    }
  }
}
