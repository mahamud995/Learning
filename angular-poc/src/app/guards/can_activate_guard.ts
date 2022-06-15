import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({providedIn : "root"})
export class AccessGuardService implements CanActivate {

    constructor(private _router:Router ) {      
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log("canActivate");      //return true    
     //remove comments to return true              
     alert('You are not allowed to view this page. You are redirected to Home Page'); 
     this._router.navigate(["sibling1"]);             
     return false;     
    }
    
}