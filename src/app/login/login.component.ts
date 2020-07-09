import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute,
    private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
  }

       // convenience getter for easy access to form fields
       get f() { return this.loginForm.controls; }

       onSubmit() {
           console.log("login data",this.loginForm);
           this.submitted = true;
   
           // stop here if form is invalid
           if (this.loginForm.invalid) {
               return;
           }
   
           this.loading = true;
           this.authenticationService.login(this.f.username.value, this.f.password.value)
               .pipe(first())
               .subscribe(
                   data => {
                     if(data){
                      this.router.navigate(['/detail',{}]);
                     }
                     this.error="Invalid username or password";
                   },
                   error => {
                       console.log(error);
                       this.error = error;
                       this.loading = false;
                   });
       }
}
