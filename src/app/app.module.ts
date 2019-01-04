import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { UsersComponent } from './pages/users/users.component';
import { PosComponent } from './pages/pos/pos.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FoodtypeComponent } from './dialogs/foodtype/foodtype.component';
import { CommonDialogComponent } from './dialogs/common-dialog/common-dialog.component';
import { PaymentConfirmComponent } from './payments/payment-confirm/payment-confirm.component';
import { UploadComponent } from './dialogs/upload/upload.component';
import { OrdermonitorComponent } from './pages/ordermonitor/ordermonitor.component';
import { KitchenmonitorComponent } from './pages/kitchenmonitor/kitchenmonitor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    FoodsComponent,
    UsersComponent,
    PosComponent,
    FoodtypeComponent,
    CommonDialogComponent,
    PaymentConfirmComponent,
    UploadComponent,
    OrdermonitorComponent,
    KitchenmonitorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,

  ],
  entryComponents: [
    FoodtypeComponent,
    CommonDialogComponent,
    PaymentConfirmComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
