import { Router } from '@angular/router';
import { PlanIdAndShoeId } from './../../shared/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Piani } from 'src/app/shared/piani.model';
import { PlanService } from 'src/app/shared/plan.service';

@Component({
  selector: 'app-piani',
  templateUrl: './piani.component.html',
  styleUrls: ['./piani.component.scss']
})
export class PianiComponent implements OnInit {

  plans: Piani[];
  plan: Piani;
    //EASTER EGG: Cerca ancora :(


  updateData: PlanIdAndShoeId = {
    planId: " ",
    shoeId: 0
  };

  constructor(public auth: AuthenticationService, private planService: PlanService, private router: Router) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans() {
    this.planService.getPlans().subscribe((resp: Piani[]) => {
      console.log("Fetching plans");
      this.plans = resp;
    }, err => {
      console.log(err);
    });
  }

  // onClickPlan(item: Piani) {
  //   alert("You have selected " + item.nomePiano + ". Please select available shoe to proceed");
  // }

  onClickShoe(item, subitem) {
    alert("You have selected " + item.nomePiano + "Plan with " + subitem.shoeName );
  }

  getPlanIdAndShoeId(planId, shoeId)
  {
    this.updateData.planId = planId;
    this.updateData.shoeId = shoeId;
    this.auth.updateUser(this.updateData).subscribe(() => {
      console.log(this.updateData);
      // this.router.navigateByUrl('/dashboard'); 
    },err => {
      console.log(err);
    });
  }
}
