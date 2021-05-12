import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AlertifyService } from './alertify.service';

export interface UserDetails {
  _id: string;
  username: string;
  email: string;
  planId: string;
  shoeId: number;
  age: string;
  gender: string;
  country: string;
  exp: number;
  iat: number;
}

export interface PlanIdAndShoeId {
  planId: string;
  shoeId: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  username: string;
  email?: string;
  password: string;
  age?: string;
  gender?: string;
  country?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private token: string;

  // readonly baseURL = 'http://localhost:3000/api/';
  // readonly baseURL = 'https://4200-crimson-scorpion-659ac7lw.ws-eu03.gitpod.io/api/';

  constructor(private http: HttpClient, private router: Router, private alertifyService: AlertifyService) { }

  private saveToken(token: string): void {
    localStorage.setItem("shoe-rent-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("shoe-rent-token");
    }
    return this.token;
  }

  deleteUser() {
    // return this.http.delete(this.baseURL + 'profile/', {
    //   headers: { Authorization: `Bearer ${this.getToken()}` }
    // });
      return this.http.delete(`/api/profile`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
  }

  updateUser(planIdAndShoeId: PlanIdAndShoeId) {
    return this.http.put(`/api/profile`, planIdAndShoeId, {
      headers: { Authorization: `Bearer ${this.getToken()}`}
    });
  }

  private request(
    method: "post" | "get",
    type: "login" | "register" | "profile",
    user?: TokenPayload
  ): Observable<any> {
    let base$;
  
    if (method === "post") {
      base$ = this.http.post(`/api/${type}`, user);
    } else {
      base$ = this.http.get(`/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }
  
    const request = base$.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  
    return request;
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("shoe-rent-token");
    this.router.navigateByUrl("/");
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request("post", "register", user);
  }
  
  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "login", user);
  }
  
  public profile(): Observable<any> {
    return this.request("get", "profile");
  }

}
