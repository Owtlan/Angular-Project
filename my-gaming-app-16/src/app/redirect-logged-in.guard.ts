import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { authState } from 'rxfire/auth';
import { Observable } from 'rxjs';


export const redirectLoggedInToHome: CanActivateFn = (): Observable<boolean> => {
    const auth = inject(Auth)
    const router = inject(Router)

    return authState(auth).pipe(
        map(user => {
            if (user) {
                router.navigate(['/']); 
                return false;
            }
            return true; 
        })
    )
}