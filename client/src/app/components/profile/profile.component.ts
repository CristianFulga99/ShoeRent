import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { AuthenticationService, UserDetails } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;
  // userData: UpdateUserData = {
  //   planId: "test",
  //   shoeId: 1
  // }
  
  constructor(private auth: AuthenticationService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );
  }

  logout() 
  {
    this.auth.logout();
    this.alertifyService.success('Logged out successfully');
  }

  // updateUserData() {
  //   this.auth.updateUser(this.userData).subscribe(() => {
  //     console.log('data updated !');
  //   },err => {
  //     console.log(err);
  //   });
  // }

}
