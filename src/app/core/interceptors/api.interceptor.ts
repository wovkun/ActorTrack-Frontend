import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `http://localhost:5000/api/${req.url}`,
  });
  return next(apiReq);
};
