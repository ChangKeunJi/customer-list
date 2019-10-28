import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../module/User";

@Injectable({
  providedIn: "root"
})
export class ListService {
  postsUrl: string = "https://randomuser.me/api/?results=15";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.postsUrl);
  }
}
