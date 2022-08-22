import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { delay, Observable, tap } from "rxjs";
import { IUser } from "../models/IUser";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    // apiKey="AIzaSyD0CebMv5gFGte2N5CiOHfztcQrnbFewfs";
    apiKey="AIzaSyDEhdKMIZX9ltJUPQ6juq4CCQzcVRimlq8";
    userDetails:IUser | null = null;
    logInEvent=new EventEmitter<boolean>();
    constructor(private http:HttpClient){

    }
    get tocken(){
        return this.userDetails?.idToken;
    }
    login(email:string, password:string):Observable<IUser>{
        return this.http.post<IUser>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,{email,password,returnSecureToken:true}).pipe(tap(data=>{
            this.userDetails=data;
            this.saveDataInLocalStorage();
        }))
    }
    register(email:string, password:string):Observable<IUser>{
        return this.http.post<IUser>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,{email,password, returnSecureToken:true}).pipe(tap(data=>{
            this.userDetails=data;
            this.saveDataInLocalStorage();
        }))
    }
    saveDataInLocalStorage(){
        let userDetails=JSON.stringify(this.userDetails);
        localStorage.setItem('userDetails',userDetails);
    }
    getDataFromLocalStorage(){
        let userDetails=localStorage.getItem('userDetails');
        if(userDetails){
            this.userDetails=JSON.parse(userDetails);
            this.logInEvent.emit(true);
        }
    }
    logOut(){
        localStorage.removeItem('userDetails');
        this.userDetails=null;
        this.logInEvent.emit(false);
    }
}