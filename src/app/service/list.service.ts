import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// Get the randome 100 users from "Random User API" with name, email, phone number etc ...

@Injectable({
  providedIn: "root"
})
export class ListService {
  postsUrl: string = "https://randomuser.me/api/?results=100";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.postsUrl);
  }
}
