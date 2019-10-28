import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  @Output() nameEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  nameFilter(term) {
    this.nameEvent.emit(term);
  }
}
