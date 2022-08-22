import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
export interface IDeactivate{
    canExit:()=>boolean;
}
@Injectable({
    providedIn:'root'
})
export class DeactivateGuardService implements CanDeactivate<IDeactivate>{
    canDeactivate(component: IDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | Observable<boolean> | Promise<boolean> {
        return component.canExit();
    }
}