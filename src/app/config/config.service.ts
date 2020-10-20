import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  getProperties(lat: number, lon: number): Observable<any> {
    // now returns an Observable of Config
    return this.http.get<any>(`http://lime-task-project.herokuapp.com/properties?at=${lat},${lon}&page=1&limit=10`, {
      headers: new HttpHeaders('Access-Control-Allow-Origin:null')
    });
  }
}
