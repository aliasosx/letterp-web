import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
  url = environment.url;
  token: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('abcd')
    })
  };
  getCompanyInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'companyinfo', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getUserInfomation(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'users/' + id, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getFoodTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'foodtypes', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getFoodMasters(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'foodmaster', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getKitchen(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'kitchens', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  addFood(food): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'foods', food, this.httpOptions).subscribe(res => {
        if (res) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  getFoods(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'foods', this.httpOptions).subscribe(res => {
        console.log(res);
        resolve(res);
      });
    });
  }
  getFoodDetail(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'fooddetail', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  deleteFood(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + 'foods/' + id, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getMenuByUserId(id) {
    return this.http.get(this.url + 'menubyuserid/' + id, this.httpOptions);
  }
  createFoodType(foodType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'foodtypes', foodType, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  createKitchen(kitchen): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'foodtypes', kitchen, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getChefs(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'chefs', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
}
