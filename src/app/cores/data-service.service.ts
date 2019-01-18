import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }
  url = environment.url;
  photoUrl = environment.photoPath;
  printUrl = environment.printerUrl;
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
  getFirstLogin(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'firstlogin/' + id, this.httpOptions).subscribe(res => {
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
      this.http.post(this.photoUrl + 'uploadfood', file).subscribe(res => {
        resolve(res);
      });
    });
  }
  getFoodPhoto(file) {
    this.http.get(this.url + 'uploads/foods/', file).subscribe(photo => {
      return photo;
    });
  }
  getTicketsInQ(kitchenId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'kitchenordersByKid/' + kitchenId, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getTransactionByTicketId(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'kitchenorders/' + id, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getOrderTrack(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'ordertrackings', this.httpOptions).subscribe(res => {

        resolve(res);
      });
    });
  }
  updateOrderStatus(id, opts): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'orders/' + id, opts, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  print_local(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.printUrl + 'print', data).subscribe(res => {
        resolve(res);
      });
    });
  }
  getTicketNumber(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'ticket/' + id, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  updateUserPassword(id, data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'changepassword/' + id, data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getKitchenIdByUser(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'kitchenIdByUser/' + id, this.httpOptions).subscribe(res => {
        console.log(res);
        resolve(res);
      });
    });
  }
  getAdminReportByKitchen(dt): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'adminreportbykitchens', dt, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getAdminReportByFoodType(dt): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'adminreportbyfoodType', dt, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }

  getAdminTopFood(dt): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'adminreporttopfood', dt, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }

  getAdminRevenueByUser(dt): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'adminreportbyuser', dt, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }

  getReportByKitchen(dt): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'reportbykitchens', dt, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getReportByFoodType(dt): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'reportbyfoodType', dt, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }

  getTopFood(dt): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'reporttopfood', dt, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }

  updateTransactionStatus(status): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'maketransactionfinish', status, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getCashCurrentStatus(info): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'getcashloadsByUser', info, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  loadCashDrawer(load): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'cashloads', load, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getUsersException(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'usersnotin/' + id, this.httpOptions).subscribe(res => {
        //console.log(res);
        resolve(res);
      });
    });
  }
  settlement(userId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'settle/' + userId, this.httpOptions).subscribe(res => {
        console.log(res);
        resolve(res);
      });
    });
  }
  eod(id, data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'eod/' + id, data, this.httpOptions).subscribe(res => {
        console.log(res);
        resolve(res);
      });
    });
  }
  noteSuggests(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'notesuggests', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getOrderAllForAdmin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'orderByday', this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  undoFinishedOrder(id, data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'reverseOrder/' + id, data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  // Chart
  getSaleVolumeAll(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'sale_volume', data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getSaleByFood(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'sale_by_food', data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getSaleByUsers(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'sale_by_users', data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  getSaleByDay(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'sale_by_day', data, this.httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
}
