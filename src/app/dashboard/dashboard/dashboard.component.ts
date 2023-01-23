import { Component, OnInit } from '@angular/core';
import { deleteUser } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any;
  constructor(private authService : AuthService) { 

  }

  ngOnInit(): void {
    this .getAllUsers();
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe((res) => (this.users = res));
  }

  logout(){
    this.authService.logout();
  }

  deleteUser(uid: number){
    this.authService.deleteUser(uid).subscribe((res) => {
      console.log(res);
      this.getAllUsers();
    });
  }

  setAdmin(uid: number){
    this.authService.setAdmin(uid).subscribe((res) => {
      console.log('Kullanıcı Admin yapıldı');
    });
  }

}
