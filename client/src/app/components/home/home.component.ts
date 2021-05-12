import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Piani } from 'src/app/shared/piani.model';
import { PlanService } from 'src/app/shared/plan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  plans: Piani[];

  constructor(private planService: PlanService, public auth: AuthenticationService) { }

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

}
