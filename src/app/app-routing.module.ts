import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { OrdermonitorComponent } from './pages/ordermonitor/ordermonitor.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodsComponent } from './pages/foods/foods.component';
import { PosComponent } from './pages/pos/pos.component';
import { KitchenmonitorComponent } from './pages/kitchenmonitor/kitchenmonitor.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { CashdrawerManagerComponent } from './pages/cashdrawer-manager/cashdrawer-manager.component';
import { KitchenReportsComponent } from './pages/kitchen-reports/kitchen-reports.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'food', component: FoodsComponent },
  { path: 'pos', component: PosComponent },
  { path: 'orders', component: OrdermonitorComponent },
  { path: 'kitchenmon', component: KitchenmonitorComponent },
  { path: 'adminreport', component: ReportsComponent },
  { path: 'cashmanager', component: CashdrawerManagerComponent },
  { path: 'report', component: KitchenReportsComponent },
  { path: 'ordermanagement', component: OrdersManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
