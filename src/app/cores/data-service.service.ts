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
  getFoodByType(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'foodsbytype/' + id, this.httpOptions).subscribe(res => {
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
  getFoodForPOS(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'fooddetailmasteronly', this.httpOptions).subscribe(res => {
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
  getFoodById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'foods/' + id, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  updateFood(food): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'foods/' + food.id, food.data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getSubFood(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'childFood/' + id, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getCustomers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'customers', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getAliveTickets(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'tickets', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  createOrder(order): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'makeorders', order, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  uploadFoodImage(file): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'upload', file, this.httpOptions).subscribe(res => {
        console.log(res);
        resolve(res);
      });
    });
  }
  getFoodPhoto(file) {
    this.http.get(this.url + 'uploads/food/' + file, this.httpOptions).subscribe(photo => {
      return photo;
    });
  }
  getTicketsInQ(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'kitchenorders', this.httpOptions).subscribe(res => {
        console.log(res);
        resolve(res);
      });
    });
  }
}
