import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";

export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router){}
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(req)).pipe(catchError((x) => this.handleAuthError(x)));
    }
    
    addAuthToken(req: HttpRequest<any>){
        const {stsTokenManager} = JSON.parse(
            localStorage.getItem('user') || '{}'
        );
    
        
        return req.clone({
            setHeaders: {Authorization: stsTokenManager?.accessToken},
        });   
    
    }


    private handleAuthError(err: HttpErrorResponse): Observable<any>{
        if (err.status === 401 || err.status === 403) {
            this.router.navigateByUrl('/');
            return of(err.message);
        }
        return throwError(err);
}
}