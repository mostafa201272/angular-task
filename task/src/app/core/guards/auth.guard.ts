import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, map, switchMap, Observable, of } from 'rxjs';
import { UserRole } from '../enums/roles.enum';
import { MODULES_ROUTES } from 'src/utilities/routers';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {

  // SERVICES
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // CHECK IF USER HAS TOKEN OR NOT
  if (authService.getToken() === null) {
    router.navigate([MODULES_ROUTES.visitors.route]);
    return of(false);
  }

  // AUTHENTICATION
  return authService.checkLoggedIn().pipe(
    switchMap((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return authService.getUser().pipe(
          map((user: any) => {
            if (user) {
              const requiredRoles = route.data['roles'] as UserRole[];
              const userRole = user.role as UserRole;
              if (!requiredRoles?.length || requiredRoles.includes(userRole)) {
                return true;
              }
              return false
            } else {
              router.navigate([MODULES_ROUTES.visitors.route]);
              return false;
            }
          })
        );
      } else {
        router.navigate([MODULES_ROUTES.visitors.route]);
        return of(false);
      }
    }),
    catchError(() => {
      router.navigate([MODULES_ROUTES.visitors.route]);
      return of(false);
    })
  );
};
