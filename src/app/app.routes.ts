import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { EmployeeListComponent } from './pages/employee-list/employee-list';
import { AddEmployeeComponent } from './pages/add-employee/add-employee';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'view-employee/:id', component: ViewEmployeeComponent },
];