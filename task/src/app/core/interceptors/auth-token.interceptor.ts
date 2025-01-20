import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const AuthTokenInterceptor: HttpInterceptorFn = (request, next) => {

  // SERVICES
  const storageService = inject(StorageService);
  
  // GET TOKEN FROM STORAGE
  const jsonToken = storageService.getStorage('token');

  const token = jsonToken;
  if (token != null) {
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });

    return next(authRequest);
  }

  return next(request);
};
