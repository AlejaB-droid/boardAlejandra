import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;

  constructor(private auth: AuthService, private router: Router) { 
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  userRegistration(){
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      console.log('Incomplete data');
      this.errorMessage = 'Incomplete data';
      this.closeAlert();
      this.registerData = {};
    } else {
      this.auth.userRegistration(this.registerData).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.jwtTk);
          this.router.navigate(['/saveTask']);
          this.registerData={};
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      );
    }
  }
  closeAlert() {
    setTimeout(() => {
      this.successMessage = ''; 
      this.errorMessage = '';
    }, 3000);
  }
}
