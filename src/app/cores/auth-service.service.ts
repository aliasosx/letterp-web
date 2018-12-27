import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  url = environment.url;
  token: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + this.token
    })
  };

  login(username, password): Promise<any> {
    let logindetail = {
      "username": username,
      "password": password
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'auth', logindetail).subscribe(result => {
        if (result['token']) {
          localStorage.setItem('abcd', result['token']);
          resolve(result);
        } else {
          reject('Unauthorized');
        }
      });
    });
  }
  tokenVerify(token): Promise<any> {
    let tokenToVerify = {
      "token": token
    }
    return new Promise((resolve, reject) => {
      try {
        this.http.post(this.url + 'authverify', tokenToVerify).subscribe(res => {
          resolve(res);
        });
      } catch (err) {
        reject(err);
      }

    });

  }
}
