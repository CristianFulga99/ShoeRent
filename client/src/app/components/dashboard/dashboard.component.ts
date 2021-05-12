import { Shoe } from './../../shared/shoe.model';
import { Piani } from './../../shared/piani.model';
import { Component, OnChanges, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { AuthenticationService, UserDetails } from 'src/app/shared/authentication.service';
import { PlanService } from 'src/app/shared/plan.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {

  toDate = new String();
  //EASTER EGG: Hai trovato un biscotto!
  details: UserDetails;
  plan: Piani;
  shoe: Shoe;


  constructor(
    public auth: AuthenticationService,
    private planService: PlanService,
    private alertifyService: AlertifyService) { 
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 2).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();

     this.toDate = mm + '/' + dd + '/' + yyyy;
    }

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngOnChanges() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        this.getSelectedPlan(user.planId);
      },
      err => {
        console.error(err);
      }
    );
  }

  getSelectedPlan(id) {
    this.planService.getPlan(id).subscribe((res: Piani) => {
      console.log("fetching single plan");
      this.plan = res;
      console.log(this.details.shoeId);
      this.getSelectedShoe(this.details.shoeId);
    });
  }

  getSelectedShoe(id) {
    this.shoe = this.plan.shoes.find(x => x.idScarpa == id);
    console.log(id);
    console.log(this.shoe);
    console.log(this.plan.shoes);
  }

  eliminateAcc() {
    this.auth.deleteUser().subscribe(() => {
      this.alertifyService.success('User Deleted successfully');
      this.auth.logout();
    }, err => {
      console.log(err);
    });
  }

  logout() {
    this.auth.logout();
    this.alertifyService.success('Logged out successfully');
  }

}
