import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { AuthenticationService, TokenPayload } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    username: "",
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.alertifyService.success('Logged in successfully');
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
        this.alertifyService.error('Username or Password incorrect');
      }
    );
  }

}
