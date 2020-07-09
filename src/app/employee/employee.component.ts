import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  user:string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = localStorage.getItem("currentUser")
    var emp:number = +this.user;
    this.getEmployee(this.user);
  }

  getEmployee(user:any){
    this.authenticationService.getProfile(user)
    .subscribe(
      data=>{
        this.employee = data;
      },
      error =>{
        console.log(error);
      } 
    );
  }


}
