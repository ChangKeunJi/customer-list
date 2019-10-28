import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  // Send input value to Parent Component; lists.component

  @Output() termEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  termFilter(term) {
    this.termEvent.emit(term);
  }
}
