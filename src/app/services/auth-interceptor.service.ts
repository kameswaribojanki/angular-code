import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../Auth/services/auth.service";

@Injectable({
    providedIn:'root'
})
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler){
        
        // if(!this.authService.tocken){
        //     return next.handle(req);
        // }
        // let modifiedRequest=req.clone({
        //     params:req.params.append('auth', this.authService.tocken)
        // })
        // return next.handle(modifiedRequest);

        let url=req.url;
        if(this.authService.tocken){
            
            url=url+'?auth='+this.authService.tocken
        }
        let modifiedRequest=req.clone({
            url:url
        })
        return next.handle(modifiedRequest);
    }
        //return next.handle(req);
    
}