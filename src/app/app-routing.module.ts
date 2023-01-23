import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", redirectTo: 'home', pathMatch:'full'},
  {path: "home", component: HomeComponent},
  {
    path: "auth", 
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule)
  },
  {
    path: "dashboard", 
    loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule ),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
