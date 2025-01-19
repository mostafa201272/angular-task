import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  /**
   * CONSTRUCTOR
   * @param http => HTTP CLIENT SERVICE
   * @param messageService => PRIME-NG MESSAGE SERVICE
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  /**
   * GET REQUEST WITH OPTIONAL PARAMS
   * @param url
   * @param params
   * @returns OBSERVABLE
   */
  getData<T>(
    url: string,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    return this.http.get<T>(url, { params }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * GET REQUEST WITH OPTIONAL PARAMS
   * @param url
   * @param params
   * @returns OBSERVABLE
   */
  getDataByGenericParams<T>(url: string, params: any): any {
    return this.http.get<T>(url, { params }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * GET REQUEST THAT REQUIRED ADDITIONAL HEADERS
   * @param url
   * @param headersObject
   * @returns
   */
  getDataWithHeaders<T>(url: string, headersObject: any = {}): Observable<T> {
    // CREATE HEADER INSTANCE
    let headers = new HttpHeaders();

    // LOOP OVER PASSED HEADERS
    for (const header in headersObject) {
      headers = headers.set(
        header.toString(),
        headersObject[header].toString()
      );
    }

    return this.http.get<T>(url, { headers }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * GET BLOB (DOCUMENT)
   * @param url ENDPOINT
   * @param contentType BLOB TYPE
   * @returns
   */
  getDocuments(url: string, fileType: string): Observable<any> {
    // SET THE REQUEST OPTIONS
    const options = {
      headers: new HttpHeaders({
        'Content-Type': `'application/${fileType}`
      }),
      responseType: 'blob' as 'json'
    };

    return this.http.get(url, options);
  }

  /**
   * POST REQUEST WITH OPTIONAL BODY
   * @param url
   * @param body
   * @returns
   */
  postData<T>(url: string, body: {} = {}): Observable<T> {
    return this.http.post<T>(url, body).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * POST REQUEST WITH PARAMS
   * @param url
   * @param params
   * @param body
   * @returns
   */
  postDataWithParams<T>(
    url: string,
    params: any,
    body: {} = {}
  ): Observable<T> {
    return this.http.post<T>(url, body, { params }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * UPDATE REQUEST
   * @param url
   * @param body
   * @returns
   */
  putData<T>(url: string, body: {}): Observable<T> {
    return this.http.put<T>(`${url}`, body).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * PATCH REQUEST
   * @param endPoint
   * @param body
   * @returns
   */
  patchData<T>(endPoint: string, body: {}): Observable<T> {
    return this.http.patch<T>(`${endPoint}`, body).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * DELETE REQUEST
   * @param url
   * @returns
   */
  deleteData<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${url}`).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * DELETE REQUEST WITH JSON BODY
   * @param url
   * @param body
   * @returns
   */
  deleteWithBody<T>(url: string, body: any): Observable<T> {
    // MODIFY REQUEST HEADERS TO ACCEPT JSON CONTENT
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // APPEND JSON BODY TO THE REQUEST HEADERS
    const options = { headers: headers, body: body };

    return this.http.delete<T>(`${url}`, options).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  /**
   * HANDEL ERRORS NOTIFICATION
   * @param error
   */
  handleHttpError(error: any): void {
    this.messageService.add({
      severity: 'error',
      summary: error,
      detail: error?.error?.message
    });
  }
}
