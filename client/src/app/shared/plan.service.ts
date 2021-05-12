import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Piani } from './piani.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  plans: Piani[];
  plan: Piani;

  // readonly baseURL = 'http://localhost:3000/api/';
  // readonly baseURL = 'https://4200-crimson-scorpion-659ac7lw.ws-eu03.gitpod.io/api/';


  constructor(private http: HttpClient) { }

  getPlans() {
    // return this.http.get(this.baseURL + 'plans');
    return this.http.get(`/api/plans`);
  }

  getPlan(id: string) {
    // return this.http.get(this.baseURL + 'plans/' + id);
    return this.http.get(`/api/plans/${id}`);
  }
  
}
