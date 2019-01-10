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
import { NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FoodtypeComponent } from './dialogs/foodtype/foodtype.component';
import { CommonDialogComponent } from './dialogs/common-dialog/common-dialog.component';
import { PaymentConfirmComponent } from './payments/payment-confirm/payment-confirm.component';
import { UploadComponent } from './dialogs/upload/upload.component';
import { OrdermonitorComponent } from './pages/ordermonitor/ordermonitor.component';
import { KitchenmonitorComponent } from './pages/kitchenmonitor/kitchenmonitor.component';
import { TransactionDetailsComponent } from './dialogs/transaction-details/transaction-details.component';
import { FirstLoginComponent } from './dialogs/first-login/first-login.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CashdrawerManagerComponent } from './pages/cashdrawer-manager/cashdrawer-manager.component';

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
    TransactionDetailsComponent,
    FirstLoginComponent,
    ReportsComponent,
    CashdrawerManagerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgbDatepickerModule,
    UiSwitchModule,

  ],
  entryComponents: [
    FoodtypeComponent,
    CommonDialogComponent,
    PaymentConfirmComponent,
    TransactionDetailsComponent,
    FirstLoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
